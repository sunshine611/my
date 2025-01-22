# 安装

## 命令行安装

```bash
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
sudo apt update
sudo apt install jenkins
```

## 通过 1Panel 管理平台安装

::: tip
让我们一起鄙视需要手机号的平台
:::

1. **应用商店** 里面搜索 **Jenkins** ,然后选择安装, 除了需要打开外部访问端口, 其它都默认
2. 访问 **Jenkins** 管理页面,首先你需要有个域名,然后解析指向服务器
   > 在 1Panel 管理面板, **面板设置 > 服务器地址** 里面设置你的域名,一般弄个二级域名就好了
3. 打开 **Jenkins** 管理界面
   > **应用商店 > 已安装应用**, 找到 **jenkins** ,点击服务端口即可跳转到管理界面
4. 第一次进入**Jenkins**管理界面需要密码,从 **jenkins** 日志里面可以看到安装时候自动生成的密码, 安装插件一般选择默认就好
