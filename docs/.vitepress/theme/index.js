// https://vitepress.dev/guide/custom-theme
import { h, nextTick, onMounted, watch } from "vue";
import DefaultTheme from "vitepress/theme";
import ZoomImg from "../components/ZoomImg.vue";
import "./style.css";

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app, router, siteData }) {
    app.component("ZoomImg", ZoomImg);
  },
};
