import { defineConfig } from "vitepress";
import mediumZoom from "medium-zoom";
import tailwindcss from "@tailwindcss/postcss";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "六陽笔记",
  titleTemplate: "学习笔记",
  description: "六陽学习笔记",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig: {
    logo: "/images/logo.png",
    logoLink: "/",
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: "local",
    },
    outline: [2, 4],
    nav: [
      { text: "Home", link: "/" },
      { text: "Network", link: "/network/" },
      {
        text: "Frontend",
        items: [
          {
            text: "dart",
            link: "/frontend/dart/index",
          },
        ],
      },
      {
        text: "Backend",
        items: [
          {
            text: "golang",
            link: "/backend/golang/index",
          },
        ],
      },
      {
        text: "Server",
        items: [
          {
            text: "PostgreSQL",
            link: "/server/postgresql/index",
          },
          {
            text: "Jenkins",
            link: "/server/jenkins/index",
          },
        ],
      },
    ],
    sidebar: [
      {
        text: "Home",
        link: "/",
      },
      {
        text: "Network",
        link: "/network/",
        items: [
          {
            text: "在浏览器输入URL会发生什么",
            link: "/network/browser-url",
          },
        ],
      },
      {
        text: "Frontend",
        collapsed: false,
        items: [
          {
            text: "Dart",
            link: "/frontend/dart/index",
            collapsed: true,
            items: [
              { text: "基础", link: "/frontend/dart/basic" },
              { text: "函数", link: "/frontend/dart/function" },
              { text: "类与对象", link: "/frontend/dart/class" },
              { text: "库与生态", link: "/frontend/dart/library" },
              { text: "异步编程", link: "/frontend/dart/async" },
            ],
          },
          {
            text: "Flutter",
            link: "/frontend/flutter/index",
            collapsed: true,
            items: [
              { text: "Flutter基础", link: "/frontend/flutter/base" },
              { text: "部件 (Widget)", link: "/frontend/flutter/widget" },
            ],
          },
        ],
      },
      {
        text: "Backend",
        collapsed: false,
        items: [
          {
            text: "Golang",
            link: "/backend/golang/index",
            collapsed: true,
            items: [
              {
                text: "入门",
                link: "/backend/golang/introduction",
              },
              {
                text: "数据类型",
                link: "/backend/golang/data-type",
              },
              {
                text: "语法结构",
                link: "/backend/golang/syntax",
              },
              {
                text: "函数",
                link: "/backend/golang/function",
              },
              {
                text: "接口",
                link: "/backend/golang/interface",
              },
              {
                text: "序列化",
                link: "/backend/golang/serialization",
              },
              {
                text: "常用标准库",
                link: "/backend/golang/library",
              },
              {
                text: "包管理",
                link: "/backend/golang/package",
              },
              {
                text: "Go常用命令",
                link: "/backend/golang/command",
              },
              {
                text: "数据库交互",
                link: "/backend/golang/sql",
              },
            ],
          },
        ],
      },
      {
        text: "Server",
        collapsed: false,
        items: [
          {
            text: "PostgreSQL",
            link: "/server/postgresql/index",
            collapsed: true,
            items: [{ text: "介绍", link: "/server/postgresql/index" }],
          },
          {
            text: "Jenkins",
            link: "/server/jenkins/index",
            collapsed: true,
            items: [
              {
                text: "安装",
                link: "/server/jenkins/install",
              },
              {
                text: "使用",
                link: "/server/jenkins/use",
              },
            ],
          },
        ],
      },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/sunshine611/my" }],
  },
  cleanUrls: false,
  vite: {
    server: {
      port: 3000,
      open: true,
    },
    css: {
      postcss: {
        plugins: [tailwindcss()],
      },
    },
  },
});
