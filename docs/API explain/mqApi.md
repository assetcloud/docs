## 消息SDK
## 一、	准备
登录云原生应用管理平台。注册用户，创建单位，购买应用。
## 二、	引入消息SDK依赖包
maven方式，在pom文件中添加如下配置：
```javascript
<dependency>
   <groupId>cn.com.zstars</groupId>
   <artifactId>cloud-message-spring-boot-starter</artifactId>
   <version>1.0.4</version>
</dependency>
```

## 三、	使用步骤
前提：已购买应用并获得应用key

\1.    实现CloudMessageListener<CloudMessage>接口；

\2.    实现类上添加注解@EnableCloudMessageListener；

\3.    设置注解参数中的topic和consumerGroup，格式如下：

topic：“topic_zstar-”+ 应用key

consumerGroup：“group_”+ 应用key

\4.    在实现类的onMessage方法中处理具体消息消费逻辑；

方法onMessage中参数CloudMessage描述：

| 属性名称       | 属性描述                     |
| -------------- | ---------------------------- |
| getMsgId       | 消息ID，用于唯一标识一条消息 |
| getTags        | 用户区分具体消息类型         |
| getMessageBody | 具体消息所发送的内容         |

 

消息tags类型表述：

| 属性名称           | 属性描述                 |
| ------------------ | ------------------------ |
| tag_app_add        | 购买应用时发送的消息     |
| tag_app_distribute | 集团分发应用时发送的消息 |

 

tag_app_add消息内容描述：

| 属性名称 | 属性描述     |
| -------- | ------------ |
| appId    | 购买的应用ID |
| tenantId | 租户code     |

 

tag_app_distribute消息内容描述：

| 属性名称  | 属性描述                           |
| --------- | ---------------------------------- |
| appIds    | 购买的应用ID字符串                 |
| tenantIds | 租户code字符串，多个值用“，”号分割 |
## 四、	示例代码

```java
package com.zstars.zams.jianguan.consumer;

import com.assetcloud.message.center.annotation.EnableCloudMessageListener;
import com.assetcloud.message.center.core.CloudMessageListener;
import com.assetcloud.message.center.entity.CloudMessage;
import com.platform.meta.core.orm.mapper.BaseDataMapper;
import com.zstars.common.util.LogUtils;
import com.zstars.common.util.RecidUtil;
import com.zstars.core.workfow.config.SpringContext;
import com.zstars.zams.jianguan.service.ConsumerListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.nio.charset.Charset;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @description: 消息监听
 * @author: lin
 * @create: 2020/04/08 11:33
 */
@Component
@EnableCloudMessageListener(topic = "topic_zstar-${cloudmessage.app-secret}",
        consumerGroup = "group_${cloudmessage.app-secret}")
public class BaseConsumerListener implements CloudMessageListener<CloudMessage> {
    @Autowired
    private BaseDataMapper baseDataMapper;

    @Override
    public void onMessage(CloudMessage messageExt) {      
        //幂等
        if (selectMessage(messageExt)) {
            return;
        }
        Long recId = RecidUtil.newRecid();
        //落地
        floorMessage(messageExt, recId);

        String tags = messageExt.getTags();
        ConsumerListener consumerListener = (ConsumerListener) SpringContext.getBean("topic_zstar_" + tags);
        try {
            consumerListener.onMessage(messageExt);
        } catch (Exception e) {
            e.printStackTrace();
            updMessage(recId, "0");
            return;
        }
        //更新1->2
        updMessage(recId, "2");
    }

    public void floorMessage(CloudMessage messageExt, Long recId) {
        Map<String, Object> item = new HashMap<>(7);
        item.put("tableName", table);
        item.put("recId", recId);
        item.put("createTime", new Date());
        item.put("mesId", messageExt.getMsgId());
        item.put("mesBody", messageExt.getMessageBody());
        item.put("status", "0");
        item.put("overTime", new Date());
        baseDataMapper.insert(item);
    }

    public boolean selectMessage(CloudMessage messageExt) {
        Map<String, Object> item = new HashMap<>(2);
        item.put("mesId", messageExt.getMsgId());
        List<Map<String, Object>> list = baseDataMapper.findAll(item);
        if (!list.isEmpty()) {
            return true;
        }
        return false;
    }

    public void updMessage(Long recId, String status) {
        Map<String, Object> item = new HashMap<>(2);
        item.put("recId", recId);
        item.put("status", status);
        baseDataMapper.updateByPrimaryKey(item);
    }

}
```

