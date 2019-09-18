# smartweb

### 实现本分支正常功能需实现Apis
---


参数：

| 字段     | 类型   | 说明                  |
| :------- | :----- | :-------------------- |
| account  | String | 账号                  |
| password | String | 密码明文md5后的字符串 |

返回值数据层：

| 字段    | 类型   | 说明                                             |
| :------ | :----- | :----------------------------------------------- |
| data    | Object | 登录成功后返回的数据对象                         |
| └ token | String | 登录产生的token，建议使用jwt                     |
| └ ...   | any    | 其他用户基本信息字段，id, nick, avatar之类的数据 |

#### 登出接口（Logout）

> 定义文件路径：src/api/auth.js

参数：无

返回值数据层：

| 字段 | 类型    | 说明         |
| :--- | :------ | :----------- |
| data | Boolean | 是否登出成功 |

#### 获取aliyun-oss临时STSToken（getOssAccessToken）

> 接口路径及请求方式可在src/api/common.js文件中修改

说明：`src/common/template/OssUpload`组件用于oss签名直传，服务端设置回调。上传成功后返回图片地址。

参数：无

返回值数据层：

| 字段                   | 类型   | 说明                                                  |
| :--------------------- | :----- | :---------------------------------------------------- |
| data                   | Object | 登录成功后返回的数据对象                              |
| └ host                 | String | 文件直传时的请求地址（bucket公网域名地址）            |
| └ policy               | String | 上传策略Policy的json对象经过base64编码后的字符串      |
| └ signature            | String | 签名后的字符串                                        |
| └ expire               | Number | 当前Policy的失效时间，单位s。例如：900为15分钟        |
| └ OSSAccessKeyId       | String | 用户请求的accessid。建议使用临时token，格式为STS.xxxx |
| └ x-oss-security-token | String | STS.token值，使用临时token时需要                      |
| └ callback             | String | 回调地址base64后的字符串                              |
| └ dir                  | String | 前缀路径，如果配置在Policy中可以限制文件上传位置。    |