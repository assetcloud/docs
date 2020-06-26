# 使用加签SDK的用法说明

新建一个对象```AssetCloudRequest()```

- ```url```：完整的请求路径 http://platform.assetcloud.org.cn/dev-api/+请求路径；

- ```key```、```secret```:平台获取的key和secret

Get调用方法：

```java
AssetCloudRequest request = new AssetCloudRequest();
request.setUrl("");
request.setKey("");
request.setSecret("");
request.setHttpMethods(HttpMethods.GET);
HttpRequestUtil.send(request);
```

Post调用方法：
```java
AssetCloudRequest request = new AssetCloudRequest();
request.setUrl("");
request.setKey("");
request.setSecret("");
request.setBody("");
request.setHttpMethods(HttpMethods.POST);
HttpRequestUtil.send(request);
```

Delete调用方法：

```java
AssetCloudRequest request = new AssetCloudRequest();
request.setUrl("");
request.setKey("");
request.setSecret("");
request.setHttpMethods(HttpMethods.DELETE);
HttpRequestUtil.send(request);
```

Put调用方法：
```java
AssetCloudRequest request = new AssetCloudRequest();
request.setUrl("");
request.setKey("");
request.setSecret("");
request.setBody("");
request.setHttpMethods(HttpMethods.Put);
HttpRequestUtil.send(request);
```
返回结果为：```AssetCloudResponse<T>```

| 字段    | 类型    | 说明     |
| ------- | ------- | -------- |
| code    | int     | 状态码   |
| success | Boolean | 是否成功 |
| data    | T       | 承载数据 |
| msg     | String  | 返回消息 |


## 资源下载
### 基础组件下载
### 图标下载
### sdk下载
### 文档打包下载
## 附录

