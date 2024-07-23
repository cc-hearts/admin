<template>
  {{ res.data }}
  {{ res.error }}
  {{ res.isFetching }}
  {{ res.isFinished }}
</template>

<script setup lang="ts">
import { useRequest } from '~/utils/request'
import { requestUrl } from '~/configs/request'

const res = useRequest('/user/auth', { method: 'post' })
console.log(res.error)
watch(res.isFinished, () => {
  if (res.isFinished) {
    console.log(res.data.value)
  }
})
</script>

<style></style>
