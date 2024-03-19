<!-- ZoomImg.vue -->
<script setup>
import { withBase } from "vitepress";
import { onMounted, ref } from "vue";
import mediumZoom from "medium-zoom";

defineProps({ src: String,title:String });

const imgRef = ref();

onMounted(() => {
  mediumZoom(imgRef.value, { background: "rgba(0,0,0,0.8)" });
});
</script>

<template>
  <img ref="imgRef" :src="withBase(src)" :title="title"/>
</template>

<style>
.medium-zoom-overlay {
  z-index: 9998;
}

.medium-zoom-image {
  z-index: 9999;
}
</style>
