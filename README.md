# TWT Taro

和涂涂一起的小程序项目 - 小程序端

## install & run

1. 首先你需要安装[NodeJS](http://nodejs.cn)(`NPM`是`NodeJS`的一个依赖管理工具, 装`NodeJS`的同时会自动安装, 之后你就可以在命令行使用`npm`命令安装包依赖)
2. 打开命令行, 使用`npm`命令安装Taro包(用于将Taro代码编译为小程序代码): `npm install -g @tarojs/cli`
3. 使用`git`将项目拷贝至本地(git@github.com:Lionad-Morotar/divertingness-fe.git), 并进入目录
4. 在项目目录下使用命令行安装项目依赖: `npm install`
5. 将Taro代码编译为微信小程序: `npm run dev:weapp`
6. 使用[微信开发工具(推荐使用稳定版本)](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)导入项目目录下的`dist`目录, 就可以开到效果了
