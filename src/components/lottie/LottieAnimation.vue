<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import lottie, {
  type AnimationConfig,
  type AnimationItem,
  type RendererType,
} from 'lottie-web'

type Props = {
  animationData: unknown
  renderer?: RendererType
  loop?: boolean | number
  autoplay?: boolean
  rendererSettings?: AnimationConfig['rendererSettings']
  ariaHidden?: boolean | 'true' | 'false'
}

const props = withDefaults(defineProps<Props>(), {
  renderer: 'svg',
  loop: true,
  autoplay: true,
  ariaHidden: true,
})

const containerRef = ref<HTMLDivElement | null>(null)
let animation: AnimationItem | null = null

function destroyAnimation() {
  animation?.destroy()
  animation = null
}

function createAnimation() {
  if (!containerRef.value) return

  destroyAnimation()

  animation = lottie.loadAnimation({
    container: containerRef.value,
    renderer: props.renderer,
    loop: props.loop,
    autoplay: props.autoplay,
    animationData: props.animationData,
    rendererSettings: props.rendererSettings,
  })
}

onMounted(createAnimation)

watch(
  () => [
    props.animationData,
    props.renderer,
    props.loop,
    props.autoplay,
    props.rendererSettings,
  ],
  createAnimation,
)

onBeforeUnmount(destroyAnimation)
</script>

<template>
  <div ref="containerRef" class="lottie-animation" :aria-hidden="ariaHidden" />
</template>

<style scoped>
.lottie-animation {
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.lottie-animation :deep(svg),
.lottie-animation :deep(canvas) {
  display: block;
  width: 100% !important;
  height: 100% !important;
  transform: translate3d(0, 0, 0);
  content-visibility: visible;
}
</style>
