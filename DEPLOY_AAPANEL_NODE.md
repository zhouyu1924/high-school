# 部署 IceAlan High School (Node.js 版) 到 aaPanel

本教程将指导你如何在 aaPanel (宝塔) 上使用 **Website -> Node Project** 功能部署该网站。

此版本包含一个 Express 后端服务器，用于处理数据保存和页面托管，比纯静态部署更强大。

## 1. 准备代码 (本地电脑)

1. **安装依赖**:
   在项目根目录打开终端，运行：
   ```bash
   npm install
   ```
2. **构建前端**:
   运行以下命令，将 React 代码编译为静态文件 (生成 `dist` 文件夹)：
   ```bash
   npm run build
   ```
   *注意：每次修改前端 React 代码后，都需要重新运行 `npm run build`。*

3. **打包文件**:
   将除了 `node_modules` 和 `.git` 以外的所有文件压缩成一个 `project.zip` 压缩包。
   重点包含：
   - `dist` 文件夹 (必须有)
   - `server.js`
   - `package.json`
   - `school_data.json` (如果有)

## 2. aaPanel (宝塔) 环境准备

1. 进入 **App Store (软件商店)**。
2. 搜索并安装 **Node.js version manager (Node.js版本管理器)**。
3. 打开 Node.js 管理器，安装一个稳定版本 (推荐 **Node v18** 或 **v20**)。

## 3. 上传文件到服务器

1. 点击 **Files (文件)**，进入 `/www/wwwroot/` 目录。
2. 创建一个文件夹，例如 `/www/wwwroot/icealan`。
3. 进入该文件夹，上传并解压你的 `project.zip`。
   *确保 `server.js` 和 `dist` 文件夹在同一层级。*

## 4. 创建 Node.js 项目

1. 点击左侧菜单 **Website (网站)** -> **Node Project (Node项目)**。
2. 点击 **Add Node Project (添加Node项目)**。

3. **填写配置**:
   - **Path (项目目录)**: 选择刚才解压的目录 (`/www/wwwroot/icealan`)。
   - **Start File (启动文件)**: 选择 `server.js`。
   - **Run Opts (运行参数)**: 留空。
   - **Port (端口)**: 输入 `3000` (如果被占用，在 `server.js` 里修改端口，或者这里填其他端口)。
   - **Node Version**: 选择 v18 或 v20。
   - **Domain (域名)**: 绑定你的域名 (如 `icealan.com`)。

4. 点击 **Submit (提交)**。

## 5. 安装依赖 (服务器端)

1. 在 Node Project 列表中，找到刚才创建的项目。
2. 状态通常会显示 "Running" 或 "Stopped"。
3. **重要**: 我们需要在服务器上安装 `express` 等依赖。
   - 点击项目右侧的 **Project Config (项目名称)** 进入详情。
   - 点击 **Modules (模块)** 或 **Package** 选项卡。
   - 点击 **Install Dependencies (一键安装依赖)**。
   - 或者，你可以点击 **Terminal (终端)** 进入项目目录，手动运行 `npm install`。

4. 依赖安装完成后，如果项目没启动，点击 **Restart (重启)**。

## 6. 验证部署

1. 打开浏览器访问你的域名。
2. 网站应该正常加载。
3. 尝试登录后台 (`/admin`，密码 `admin`) 并修改一些数据。
4. 刷新页面，如果数据依然存在，说明 Node.js 后端读写 `school_data.json` 成功。

## 常见问题

**Q: 访问域名显示 502 Bad Gateway?**
A: 这意味着 Node.js 服务没有启动成功。
1. 检查 Node Project 日志 (Log)。
2. 确保依赖 (`npm install`) 已经成功执行。
3. 确保端口 (3000) 没有被其他程序占用。
4. 确保防火墙放行了 3000 端口（虽然 Nginx 反代通常不需要放行 3000，但检查一下无妨）。

**Q: 数据无法保存?**
A: 检查文件权限。确保 `/www/wwwroot/icealan` 目录的所有者是 `www` 或 `root` (取决于 Node 进程以谁的身份运行)，并且有写入权限。

**Q: api.php 是空的?**
A: 正常。Node.js 部署不需要 PHP 文件。