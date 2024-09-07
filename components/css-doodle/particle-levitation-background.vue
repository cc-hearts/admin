<script setup lang="ts">
const htmlSnip = ref('')

onMounted(async () => {
  // @ts-ignore
  await import('css-doodle')
  if (typeof window !== 'undefined') {
    htmlSnip.value = `<css-doodle>
 		:doodle {
      @grid: 1x20 / 100vmin;
    }
		@place-cell: center;
    width: @rand(60vmin, 100vmin);
    height: @rand(60vmin, 100vmin);
    transform: translate(@rand(-120%, 120%), @rand(-80%, 80%)) scale(@rand(.8, 2.8)) skew(@rand(45deg));
    clip-path: polygon(
      @r(0, 30%) @r(0, 50%), 
      @r(30%, 60%) @r(0%, 30%), 
      @r(60%, 100%) @r(0%, 50%), 
      @r(60%, 100%) @r(50%, 100%), 
      @r(30%, 60%) @r(60%, 100%),
      @r(0, 30%) @r(60%, 100%)
    );
    background: @pick(#f44336, #e91e63, #9c27b0, #673ab7, #3f51b5, #60569e, #e6437d, #ebbf4d, #00bcd4, #03a9f4, #2196f3, #009688, #5ee463, #f8e645, #ffc107, #ff5722, #43f8bf, #e136eb, #f57c23, #32ed39);
    opacity: @rand(.5, .9);
    position: relative;
    top: @rand(-80%, 80%);
    left: @rand(-80%, 80%);
    animation: colorChange @rand(6.1s, 26.1s) infinite @rand(-.5s, -2.5s) linear alternate;
  @keyframes colorChange {
    100% {
      left: 0;
      top: 0;
      filter: hue-rotate(360deg);
    }
  }
</css-doodle>`
  }
})
</script>

<template>
  <div class="z-2 absolute h-full w-full">
    <ClientOnly fallback-tag="i" fallback="">
      <div v-html="htmlSnip"></div>
    </ClientOnly>
  </div>
</template>
