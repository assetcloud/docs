## 新增资产编码接口

**简要描述：**

+ 通过资产信息，生成统一资产编码（gs1Code），长度为22位
+ 请求参数中包含gs1Code则为更新资产内容

**请求地址**

https://www.690699.com/giai/generateCode

**请求方式**

post+json

**请求参数**

|参数名    |类型     |说明               |是否必填  |
|-----    |-----    |-------            |------   |
|token    |String   |令牌 联系叶伟荣获取  |是       |
|barCode|String|条形码 有校验规则|是|
|vendorCode|String|厂商唯一识别码|否|
|unifiedSocialCreditCode|String|组织机构代码 对应orgCode|是|
|assetName|String|资产名称|是|
|assetCode|String|单位资产id|是|
|assetValue|String|资产原值|是|
|gbFirstTypeCode|String|国标大类编码|是|
|gbFirstTypeName|String|国标大类名称|是|
|assetNum|String|资产数量|是|
|assetTypeCode|String|资产类型编码|是|
|assetTypeName|String|资产类型名称|是|
|supplierCode|String|区划编码 对应的rgCode|是|
|gbTypeCode|String|国标资产分类编码|是|
|gbTypeName|String|国标资产分类名称|是|


**请求体**
```
{
	"token": "xxxxxxxxxxxxx",
    "barCode": "6970000000000",
    "vendorCode":"xxxxxxxxxxxxx",
    "unifiedSocialCreditCode":"zxxxxxxxxx",
	"assetName": "工业建设",	
    "assetCode”:"xxxxxxxx",
    "assetValue": 233,
	"gbFirstTypeCode": "D",
	"gbFirstTypeName": "在建工程",
    "assetNum": "1",
	"assetTypeCode": "12",
	"assetTypeName": "在建工程",	
	"supplierCode": "000000",
    "gbTypeCode":"",
    "gbTypeName":""
}

```


**返回体**
```
{
    "success": true,
    "code": 200,
    "data": {
        "gs1Code": "6970000000000000000019"
    },
    "msg": "新增执行成功"
}

```
---
## 存量资产编码批量生成接口（1000条以内一次）

**简要描述：**

+ 资产的assetId作为某个资产的唯一标识如果非第一次请求，那么会自动更新资产信息，GS1码和二维码不变。

**请求地址**

https://www.690699.com/giai/batchGenerationExistCode

**请求方式**

post+json

**请求参数**

|参数名|类型|说明|是否必填|
|-----  |-----|-------|------|
|token |String   |令牌 联系叶伟荣获取 |是|
|vendorCode|String|代指orgCode 厂商编码 |是|
|assetName|String|资产名称|是|
|assetId|String|用友资产id|是|



**请求体**
```
{
 "assetInfos": [{
  "assetId": "xxx1",
  "assetName": "测试名称1111111",
  "vendorCode": "001999999"
 }, {
  "assetId": "xxx2",
  "assetName": "测试名称2222222",
  "vendorCode": "001999999"
 }, {
  "assetId": "xxx3",
  "assetName": "测试名称33333333",
  "vendorCode": "001999999"
 }]
 
}


```


**返回体**
```
    "data": [
        {
            "gs1Code": "0019999990000000000016",
            "assetId": "测试名称1111111"
        },
        {
            "gs1Code": "0019999990000000000023",
            "assetId": "测试名称2222222"
        },
        {
            "gs1Code": "0019999990000000000030",
            "assetId": "测试名称33333333"
        }
    ],
    "msg": "执行成功"
}


```

---
## 查询编码的资产详情

**简要描述：**

+ 用户的assetId作为某个资产的唯一标识如果非第一次请求，那么会自动更新资产信息，GS1码和二维码不变。

**备注**

返回体字段解释见新增资产编码接口时字段解释

**请求地址**

https://www.690699.com/giai/asset/detail

**请求方式**

post+json

**请求参数**

|参数名  |类型  |说明                |是否必填|
|-----  |----- |-------             |------ |
|token  |String|令牌 联系叶伟荣获取   |是|
|gs1Code|String|代指orgCode 厂商编码 |是|




**请求体**
```
{
 "token":"xxxxxxx",
 "gs1Code":"xxxxxxxxxxxx"
 
}


```


**返回体**
```
{
    "success": true,
    "code": 200,
    "data": {
        "assetName": "中融大厦11-13层",
        "assetId": "888330001001042001000000175",
        "assetCode": "2f0d41d785f363c6a313",
        "assetValue": "42292958.40",
        "assetNum": 1,
        "manufacturer": "无",
        "assetTypeCode": "2",
        "assetTypeName": "房屋及构筑物",
        "gmtCreate": 1565805291000,
        "gmtModify": 1565805291000,
        "supplierCode": "",
        "useOrgCode": "001999998",
        "assetUnit": "无",
        "gbFirstTypeCode": "",
        "gbFirstTypeName": "",
        "gbTypeCode": "1020401",
        "gbTypeName": "办公用房",
        "originvalue": "42292958.40",
        "assetBrand": "无",
        "gs1Code": "0019999980000000287212",
        "isDelete": 0,
        "isRegister": false,
        "image": null,
        "orgName": "测试基层单位",
        "barCode": null
    },
    "msg": ""
}
```


