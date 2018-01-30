# 微信小程序－报名吧

### 说明：

实现了活动报名列表展示，活动详情，活动模板，创建活动等功能。

### 数据接口:

- https://api.getweapp.com/vendor/huizecdn/api/wxapp/get
- https://api.getweapp.com/vendor/huizecdn/api/wxapp/get-tpl
- https://api.getweapp.com/vendor/huizecdn/api/get-user-info
- https://api.getweapp.com/vendor/huizecdn/api/wxapp/activity-user
- https://api.getweapp.com/vendor/huizecdn/api/wxapp/baomin
- https://api.getweapp.com/vendor/huizecdn/api/wxapp/add
- https://api.getweapp.com/vendor/huizecdn/api/wxapp/update-tpl-num
- https://api.getweapp.com/vendor/huizecdn/api/wxapp/my

### 目录结构：

初始的目录结构如下：

~~~
www  WEB部署目录（或者子目录）
├─assets                应用资源文件目录
│  ├─images                 公共图片资源文件
│  ├─plugins                应用插件目录
│  │  ├─wxParse                 wxParse富文本解析
│  │  └─ ...                    更多插件类库目录
│  │
│  └─styles                 外部UI组件
│     ├─weui                    weui组件
│     └─ ...                    更多外部UI组件
│
├─pages                 tabBar部分 + 公用组件等（主包）
│  ├─activity               个人中心模块
│  ├─index                  首页(活动列表)
│  ├─my                     个人中心模块
│  └─ ....            
│
├─admin                 管理员模块（分包）
│  ├─equip                  装备核销
│  ├─sign                   代签到
│  └─statistics             活动统计
│
├─public                存放项目数据接口配置文件
│  └─config.js              照片评选活动
│
├─utils                 公共函数文件
│  ├─base64.min.js          Base64代码转换器
│  ├─https.js               请求函数文件
│  ├─md5.min.js             md5加密
│  └─util.js                公共函数
│
├─app.js                描述小程序整体程序逻辑
├─app.json              小程序公共设置（公共样式）
├─app.wxss              小程序小程序公共样式表
├─project.config.json   工具配置
└─README.md             README 文件
~~~

- image — 存放项目图片文件
- public — 存放项目数据接口配置文件
- pages — 存放项目页面渲染相关文件
- template — 存放日期格式化处理文件

### 开发环境：

微信web开发者工具 webStorm

### 项目截图：

https://www.getweapp.com/project?projectId=5836706de8ff074c22472f13

### 感谢：

本项目原始版本由lengjh提供：https://github.com/lengjh/wxapp