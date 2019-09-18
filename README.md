# smartweb

## 基础框架分支（Base Frame Branch）
---
本分支为其他分支的基础分支，使用vue-cli 3创建应用框架，在此基础上添加以下内容：

* 框架结构目录及部分功能组件
* 静态路由+动态路由结构设计
* vuex基础结构设计和少量框架状态
* apiMock系统，支持json格式文件读取/Mockjs动态数据生成
* 登录页面（登录接口需实现）
* 后台界面Layout+空白Index页面（菜单实现见mater分支）
* Restful接口请求模块封装，接口管理结构设计 
 

### 系统接口默认规范（可自定义）
---

#### 请求方式
Restful [GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS]
> 视浏览器支持情况可改为GET,POST

#### 数据传输方式
默认 纯数据->application/json, FormData->multipart/form-data(传文件)
> 可支持修改为application/x-www-form-urlencoded或text/plain

#### 接口返回
status: 根据http规范约定的状态值 

response.body: 格式为`{ code: 0, message: '', data: {} }`的json字符串

| 字段    | 类型   | 说明                                 |
| :------ | :----- | :----------------------------------- |
| code    | Int    | 发生错误时的错误码，正常时为0        |
| message | String | 接口错误返回消息内容，正常时为空     |
| data    | Any    | 接口正常时返回的数据，可以为任何格式 |

> 修改smartfetch的配置文件可自定义返回数据的格式和错误处理


### 实现本分支正常功能需实现Apis
---

#### 详细列表请查看 [APIS.md](APIS.md) 其他分支同
