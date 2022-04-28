import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/assets/css/border.css";
import "@/assets/css/resets.css";
import "@/assets/js/common.js";

import {
  Cell,
  CellGroup,
  Col,
  Row,
  Lazyload,
  Grid,
  GridItem,
  Icon,
  Tag,
  Image as VanImage,
  Toast,
  Loading,
  Button,
  List,
} from "vant";
import BScroll from "@/components/common/Scroll/Scroll";
createApp(App)
  .use(Cell)
  .use(CellGroup)
  .use(Col)
  .use(Row)
  .use(Lazyload)
  .use(Grid)
  .use(GridItem)
  .use(Icon)
  .use(VanImage)
  .use(Tag)
  .use(Toast)
  .use(Loading)
  .use(Button)
  .use(List)
  .component("BScroll", BScroll)
  .use(store)
  .use(router)
  .mount("#app");
