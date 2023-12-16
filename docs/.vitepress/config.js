import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "六陽文档",
  titleTemplate: "我的开发文档",
  description: "开发文档",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig: {
    logo: "/images/logo.png",
    logoLink: "/",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      {
        text: "Backend",
        items: [
          {
            text: "golang",
            link: "/backend/golang/index",
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
        text: "Backend",
        link:"backend/index",
        items: [
          {
            text: "Golang",
            items: [
              {
                text: "Go语言介绍",
                link: "/backend/golang/index",
              },
              {
                text: "操作符和表达式",
                link: "/backend/golang/operator",
              },
            ],
          },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/vuejs/vitepress" }],
  },
  cleanUrls: true
});
