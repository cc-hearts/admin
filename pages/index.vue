<template>
  {{ res.data }}
  {{ res.error }}
  {{ res.isFetching }}
  {{ res.isFinished }}
</template>

<script setup lang="ts">
import { useFetch } from '~/utils/request'

const res = useFetch('/user/auth', { method: 'post' })
console.log(res)
</script>

<style></style>
