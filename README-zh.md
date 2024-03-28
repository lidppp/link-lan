## LinkLAN

[English](./README.md)

你有不方便登录微信或者QQ但急需文字或者文件传输功能的尴尬吗?

那不妨来试试我写的这款基于浏览器和局域网的"文件传输助手"吧.

软件基于web和nodejs, 你只需要一款装有[Node.js](https://nodejs.org/)的电脑在局域网中就可以开一个属于自己的文件传输助手. 此外不需要下载任何软件即可在浏览器中体验全部功能.

> 本软件可以完全在没有公网的环境下运行
>
> 注意使用前先使用ping命令测试主机与目标机网络是否通畅

### 快速开始

1. 克隆项目

   ```bash
   git clone https://github.com/lidppp/link-lan.git
   ```

2. 进入项目目录

   ```bash
   cd link-lan
   ```

3. 安装依赖

   ```bash
   npm install
   # 或者使用yarn(推荐)
   yarn install
   ```

4. 启动服务

   ```bash
   npm run start
   ```

   当看到以下输出代表服务启动完毕

   ```text
   sever run in http://192.168.50.178:3000
   socket.io run in ws://192.168.50.178:3000
   peer.js run in http://192.168.50.178:3001
   ```

### 页面展示

#### 文本传输

点击行复制文本

![image-20240327181125615](/Users/lixin/study/LANInfoTranport/assets/image-20240327181125615.png)

#### 文件传输

点击头像查看对方/自己分享的文件, 点击`↓↑`按钮上传文件

![image-20240327181240359](/Users/lixin/study/LANInfoTranport/assets/image-20240327181240359.png)

点击文件所在行下载文件

![image-20240327181306599](/Users/lixin/study/LANInfoTranport/assets/image-20240327181306599.png)

### 技术栈

- [Express.js](https://expressjs.com/)
- [Vue.js](https://vuejs.org/)
- [peer.js(WebRTC)](https://peerjs.com/)
- [socket.io](https://socket.io/)
- [multiavatar](https://multiavatar.com/)

- [sqlite3](https://github.com/TryGhost/node-sqlite3)

