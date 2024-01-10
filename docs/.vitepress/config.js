import { defineConfig } from "vitepress";

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
