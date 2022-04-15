import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home/Home.vue";

const routes = [
  {
    path: "/",
    redirect: "/home/recommend",
  },
  {
    path: "/home",
    redirect: "/home/recommend",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/home/recommend",
        component: () => import("@/views/Home/Recommend"),
        meta: {
          title: "每日推荐",
        },
      },
      {
        path: "/home/rank",
        component: () => import("@/views/Home/Rank"),
        meta: {
          title: "排行榜",
        },
      },
      {
        path: "/home/playlist",
        component: () => import("@/views/Home/Playlist"),
        meta: {
          title: "推荐歌单",
        },
      },
      {
        path: "/home/singers",
        component: () => import("@/views/Home/Singers"),
        meta: {
          title: "歌手",
        },
      },
      {
        path: "/home/music",
        component: () => import("@/views/Home/Music"),
        meta: {
          title: "音乐",
        },
      },
      {
        path: "/home/dj",
        component: () => import("@/views/Home/DJ"),
        meta: {
          title: "电台",
        },
      },
    ],
    meta: {
      title: "首页",
    },
  },
  {
    path: "/user",
    name: "User",
    component: () => import("@/views/User/User.vue"),
    meta: {
      title: "用户",
    },
  },
  {
    path: "/user/detail",
    name: "UserDetail",
    component: () => import("@/views/User/UserDetail.vue"),
    meta: {
      title: "",
    },
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("@/views/Search/Search.vue"),
    meta: {
      title: "搜索",
    },
  },
  {
    path: "/community",
    name: "Community",
    component: () => import("@/views/Community/Community.vue"),
    meta: {
      title: "社区",
    },
  },
  {
    path: "/playlist",
    name: "PlaylistDetail",
    component:  ()=> import("@/views/Detail/PlaylistDetail.vue"),
    meta:{
      title: "歌单详情"
    }
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
