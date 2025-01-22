# 使用指南

### 前端使用 Jenkins 自动部署

#### 一、安装插件

1. **NodeJS:** 管理 NodeJS 版本的安装及使用
2. **Generic Webhook Trigger:** 可以接收任何 HTTP 请求，从 JSON 或 XML 中提取任何值，并使用这些值作为变量来触发作业。可与 GitHub、GitLab、Bitbucket、Jira 等配合使用。

#### 二、安装 Node 版本

1. 进入 _Dashboard_ > _系统管理_ > _全局工具配置_, 找到 **NodeJS 安装**,然后点击**新增 NodeJS**,在这里对 Node 版本的安装和控制.

#### 三、配置 Webhooks

1. 打开 github,点击一个项目,在 setting 里面找到 Webhooks, 然后点击 Add webhook.
2. 在 Payload URL 里面填写 Jenkins 的 Url,一般格式是 **http://xxx.com:8080/github-webhook/** , xxx.com 这个是指向服务器的域名
3. 在 Content type 选择 application/json
4. 填写 Secret,这需要在 Jenkins 获取,然后填写到 Secret 里面.
   - 回到 Jenkins 操作台,进入 _Dashboard_ > _系统管理_ > _全局安全配置_,找到 _Git plugin notifyCommit access tokens_
   - 点击 **Add new access token**, 再点击 **Generate**,就会生成一串 Token,先把生成的 Token 复制到 github 的 Secret 文本框里面(因为那个 Token 只会显示一次),然后在 Jenkins 的全局安全配置点击保存.
5. 回到 Webhooks 配置界面,SSL verification 可以随便选择
6. _Which events would you like to trigger this webhook?_ 一般选择 Just the push event 就可以了,最后点击 **Add webhook** ,添加成功.

::: tip
测试 Webhooks 是否连通,可以点击刚刚新增的那个 webhooks 链接,然后点击 **Recent Deliveries**,显示打勾表示连接成功了.
:::

<ZoomImg src="/images/jenkins/webhook1.png" title="配置webhook"/>
<div class="text-center mt-2">配置webhook</div>

---

<ZoomImg src="/images/jenkins/webhook2.png" title="查看webhook配置是否成功"/>
<div class="text-center mt-2">查看webhook配置是否成功</div>

---

#### 四、新增凭据 (让 Jenkins 有权限访问 github 仓库)

1. _Dashboard_ > _系统管理_ > _凭据_ > _系统_ > _全局凭据_,在该页面点击 **Add Credentials**.
2. 用户名就填写 github 的登录邮箱
3. 密码不能直接填写 github 的登录密码,首先进入 github 账户的**setting**里面,_Developer settings_ > _Personal access tokens_ > _Fine-grained tokens_ > _Generate new token_
4. 填写完一系列选项和权限后,把生成后的 Token 填写到密码文本框,保存即可

<ZoomImg src="/images/jenkins/add_credential.png" title="创建凭证"/>
<div class="text-center mt-2">创建凭证</div>

#### 五、映射目录

1. 在 1Panel 控制台,点击容器,找到 jenkins 的容器,在编辑之前需要先暂停服务.
2. 停止 jenkins 服务后,点击编辑,在挂载卷添加映射,这样 jenkins 自动部署的任务构建完成后才能访问到本地磁盘目录,弄完后保存即会自动重启 jenkins 服务

<ZoomImg src="/images/jenkins/directory.png" title="映射目录"/>
<div class="text-center mt-2">映射目录</div>

#### 六、自动部署命令

1. 在项目的根目录新建一个文件,命名为 **Jenkinsfile**,每次 git 代码有更新后都会执行如下代码

```Jenkinsfile [Jenkinsfile]
pipeline {
    agent any
    tools {
        nodejs 'NodeJS 20.11.1'
    }
    environment{
        DEPLOY_DIR = '/var/sites/lydoc.me/index' // 部署目录,前端打包后的文件要放的地方
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                // 这里执行打包命令，举例：npm、maven、gradle 等
                sh 'node -v'
                sh 'npm i'
                sh 'rm -rf dist || true'
                sh 'npm run build'
                sh 'rm -rf ${DEPLOY_DIR}/* || true'
                sh 'cp -r dist/* ${DEPLOY_DIR}'
            }
        }
    }
}
```

#### 七、新建任务-多分支流水线

1. 新建任务,任务名字就按 github 仓库名字填写好了,新建一个多分支流水线
2. 分支源选择 github,然后凭据就选择刚刚添加好的凭据,把仓库地址复制上去,其它一般默认即可,点击保存,就会自动扫描仓库了.
3. 如果配置都没问题的话,后面每次 push 代码到 github,就会自动部署.

<ZoomImg src="/images/jenkins/add_task.png" title="新增多分支流水任务"/>
<div class="text-center mt-2">新增多分支流水任务</div>

---

<ZoomImg src="/images/jenkins/auto_deploy.png" title="自动部署成功"/>
<div class="text-center mt-2">自动部署成功</div>
