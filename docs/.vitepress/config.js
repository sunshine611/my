import { defineConfig } from "vitepress";
import mediumZoom from "medium-zoom";


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "六陽",
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
    outline: [2, 3],
    nav: [
      { text: "Home", link: "/" },
      { text: "Network", link: "/network/" },
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
        text: "Interview",
        items: [
          {
            text: "Frontend",
            items: [
              {
                text: "HTML",
                link: "/interview/frontend/html",
              },
            ],
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
        text: "Backend",
        collapsed: false,
        items: [
          {
            text: "Golang",
            link: "/backend/golang/index",
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
                text: "Go常用命令",
                link: "/backend/golang/command",
              },
            ],
          },
        ],
      },
      {
        text: "Interview",
        collapsed: false,
        items: [
          {
            text: "Frontend",
            items: [
              {
                text: "HTML",
                link: "/interview/frontend/html",
              },
            ],
          },
        ],
      },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/sunshine611/my" }],
  },
  cleanUrls: false,
});
