<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import useScroll from "./useScroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 1,
    },
    click: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const rootRef = ref(null);
    useScroll(rootRef, props);
    return {
      rootRef,
    };
  },
};
</script>

<style lang="less" scoped></style>
