<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { getCurrentTimeISOString } from '@/utils/date'
function formatCurrentTime() {
  const [date, _time] = getCurrentTimeISOString().split('T')
  const time = _time.split('.')[0]
  return [date, time].join(' ')
}
const current = ref(formatCurrentTime())

let timer: number | null = null
let currentTime,
  lastExecutionTime = 0
const updateTime = () => {
  currentTime = Date.now()
  if (currentTime - lastExecutionTime >= 1000) {
    current.value = formatCurrentTime()
    lastExecutionTime = currentTime
  }

  timer = requestAnimationFrame(updateTime)
}
onMounted(() => {
  timer = requestAnimationFrame(updateTime)
})

onBeforeUnmount(() => {
  if (timer) {
    cancelAnimationFrame(timer)
    timer = null
  }
})
</script>
<template>
  <div>
    {{ current }}
  </div>
</template>
