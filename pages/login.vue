<template>
  <div class="flex flex-col">
    <Input
      v-model:modelValue="loginFormData.username"
      placeholder="username"
      class="m-b-8"
    />
    <Input
      v-model:modelValue="loginFormData.password"
      placeholder="password"
      class="m-b-6"
    />
    <Button label="login" @click="handleLogin" />
  </div>
</template>

<script setup lang="ts">
import { Input, Button } from '@/components/ui/index'
definePageMeta({
  layout: 'login-layout',
})

const loginFormData = reactive({
  username: '',
  password: '',
})

const handleLogin = () => {
  console.log(loginFormData)
}
</script>

<style></style>
