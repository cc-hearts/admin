<script setup lang="ts">
import type { AnimationConfig } from 'lottie-web'
import LottieAnimation from './LottieAnimation.vue'
import animationData from './decorative-background.json'

type LottieLayer = {
  nm?: string
  ty?: number
  tt?: number
  shapes?: LottieShape[]
}

type LottieShape = {
  ty?: string
  c?: {
    a: number
    k: number[]
    ix?: number
  }
  it?: LottieShape[]
}

type LottieData = {
  layers?: LottieLayer[]
}

const rendererSettings: AnimationConfig['rendererSettings'] = {
  preserveAspectRatio: 'xMidYMid slice',
}

const particleColors: Record<string, number[]> = {
  'Union 2': [0.26, 0.52, 1, 1],
  'Ellipse 6': [0.55, 0.38, 1, 1],
  'Rectangle 40214': [0.12, 0.76, 0.92, 1],
  Union: [0.98, 0.42, 0.66, 1],
  'Vector 725': [1, 0.65, 0.2, 1],
  'Ellipse 509': [0.28, 0.86, 0.56, 1],
  'Ellipse 508': [0.68, 0.45, 1, 1],
}

function applyLayerColor(shapes: LottieShape[] | undefined, color: number[]) {
  shapes?.forEach((shape) => {
    if ((shape.ty === 'fl' || shape.ty === 'st') && shape.c) {
      shape.c = { ...shape.c, k: color }
    }

    applyLayerColor(shape.it, color)
  })
}

function createDecorativeLayer(layer: LottieLayer) {
  const nextLayer = JSON.parse(JSON.stringify(layer)) as LottieLayer

  const color = particleColors[nextLayer.nm ?? '']
  if (color) {
    applyLayerColor(nextLayer.shapes, color)
  }

  return nextLayer
}

const decorativeAnimationData = {
  ...animationData,
  layers: (animationData as LottieData).layers
    ?.filter((layer) => layer.nm !== 'background')
    .map(createDecorativeLayer),
}
</script>

<template>
  <div class="decorative-background">
    <div class="decorative-dot-grid" aria-hidden="true" />
    <LottieAnimation
      class="decorative-particles"
      :animation-data="decorativeAnimationData"
      :renderer-settings="rendererSettings"
      aria-hidden="true"
    />
  </div>
</template>

<style scoped>
.decorative-background {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.decorative-dot-grid {
  position: absolute;
  inset: 0;
  opacity: 0.34;
  background-image: radial-gradient(
    circle,
    rgb(20 24 32 / 0.16) 0 1px,
    transparent 1.4px
  );
  background-size: 9px 9px;
  mask-image: radial-gradient(
    ellipse at 62% 54%,
    black 0%,
    rgb(0 0 0 / 0.72) 34%,
    transparent 72%
  );
}

.decorative-particles {
  position: absolute;
  inset: -32.5%;
  width: 200%;
  height: 200%;
  opacity: 0.92;
  transition: opacity 200ms ease;
}

:global(.dark .decorative-dot-grid) {
  opacity: 0.62;
  background-image: radial-gradient(
    circle,
    rgb(255 255 255 / 0.1) 0 1px,
    transparent 1.4px
  );
}

:global(.dark .decorative-particles) {
  opacity: 0.72;
}
</style>
