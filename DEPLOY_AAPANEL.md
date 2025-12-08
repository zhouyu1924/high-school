# 如何通过 aaPanel (宝塔面板) 部署 IceAlan High School

本项目是一个基于 React 的单页应用 (SPA)。由于 React 在浏览器中运行，对于这个纯前端版本，你不需要一直在后台运行 NodeJS 服务（除非你后续添加了真正的后端 API）。你可以将其作为**静态网站**托管。

## 第一步：本地构建项目 (Build)

1. 在项目文件夹中打开终端 (Terminal)。
2. 运行构建命令：
   ```bash
   npm run build
   ```
3. 这将在项目目录下生成一个 `dist` (或 `build`) 文件夹，里面包含了 `index.html` 以及 `assets` 文件夹（js 和 css）。

## 第二步：aaPanel (宝塔) 设置

1. 登录你的 **aaPanel / 宝塔面板**。
2. 点击 **网站 (Website)** -> **添加站点 (Add Site)**。
3. **域名 (Domain)**: 输入你的域名 (例如 `icealan.com`) 或服务器 IP。
4. **数据库 (Database)**: 本演示版数据存储在浏览器本地 (LocalStorage)，因此不需要数据库，选择“不创建”即可。
5. **PHP 版本**: 选择 **纯静态 (Static)** (或者任意 PHP 版本均可，因为我们只托管静态文件)。
6. 点击 **提交 (Submit)**。

## 第三步：上传文件

1. 在 aaPanel 中点击 **文件 (Files)**。
2. 进入刚才创建的网站根目录 (通常是 `/www/wwwroot/你的域名`).
3. 删除目录下默认生成的 `index.html` 和 `404.html`。
4. 将本地 **`dist` 文件夹内的所有内容** 上传到这个目录。
   - 上传后，你应该在 `/www/wwwroot/你的域名/` 下直接看到 `index.html` 和 `assets` 文件夹。

## 第四步：配置 Nginx (伪静态/SPA配置) - **非常重要**

因为这是一个 React SPA 应用，使用前端路由。如果用户直接访问 `/about` 或刷新非首页页面，Nginx 默认会找不到该文件而报 404 错误。你需要配置 Nginx 将所有请求指向 `index.html`。

1. 回到 **网站 (Website)** 菜单。
2. 点击你网站右侧的 **设置 (Conf)** (或点击网站名)。
3. 找到 **伪静态 (URL Rewrite)** 选项卡。
4. 粘贴以下 Nginx 规则并保存：

   ```nginx
   location / {
     try_files $uri $uri/ /index.html;
   }
   ```

5. **或者**，如果你习惯直接编辑 **配置文件 (Config)**，请找到 `server` 块，确保 `location /` 部分如下所示：

   ```nginx
   server {
       # ... 其他配置 ...
       
       root /www/wwwroot/你的域名;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
       
       # ... 其他配置 ...
   }
   ```

6. 保存配置。

## 第五步：访问网站与后台

现在打开浏览器访问你的域名，应该就能看到 IceAlan High School 的网站了。

### 登录信息 (后台与教职工)

网站顶部导航栏有登录入口：

*   **后台管理 (Admin Login)**:
    *   默认密码: `admin`
    *   功能：修改菜单栏、生成校徽、修改校训等。
    *   *注意：要使用 AI 生成功能，需要在后台设置中填入 Google Gemini API Key。*

*   **教职工入口 (Staff Login)**:
    *   默认密码: `staff`
    *   功能：查看课表、通知等。
