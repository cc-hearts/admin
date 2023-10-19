<template>
  <div class="h-full w-full flex justify-center items-center">
    <div class="w-80 text-center">
      <Input
        class="m-b-6"
        v-model:value="userInfo.username"
        :placeholder="$t('login.usernamePlaceholder')"
      />
      <InputPassword
        v-model:value="userInfo.password"
        :placeholder="$t('login.passwordPlaceholder')"
      />
      <Button class="m-t-6" @click="handleSubmit">{{
        $t('login.submitButton')
      }}</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { InputPassword, Button, Input } from 'ant-design-vue'
import { reactive } from 'vue'
import { loginApi } from '@/features/user/api'
import { setToken, setRefreshToken } from '@/storage'
import { onMounted } from 'vue'
import { onUnmounted } from 'vue'
// @ts-ignore
import md5 from 'md5'
import { useRouter } from 'vue-router'
const userInfo = reactive({
  username: '',
  password: '',
})

const router = useRouter()
const handleSubmit = async () => {
  const { username, password } = userInfo

  const { data } = await loginApi({ username, password: md5(password) })
  if (data) {
    const { accessToken, refreshToken } = data
    setToken(accessToken)
    setRefreshToken(refreshToken)

    router.push({ path: '/deploy' })
  }
}

function listenerEnterToLogin(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    handleSubmit()
  }
}
onMounted(() => {
  window.addEventListener('keypress', listenerEnterToLogin)
})

onUnmounted(() => {
  window.removeEventListener('keypress', listenerEnterToLogin)
})
</script>
