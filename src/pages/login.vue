<template>
  <Headers>
    <template #left>
      <i></i>
    </template>
  </Headers>
  <div :class="ns.cls" class="h-full w-full flex bg-[var(--global-bg-color)]">
    <div
      :class="ns.e('modal')"
      class="w-200 h-500px m-auto border border-solid border-#fff bg-#ffffff4f rounded-4 flex"
    >
      <div class="flex-[1.2] box-border p-10 flex items-center">
        <img :src="LoginBgImg" />
      </div>
      <div class="flex-1 flex items-center p-r-2">
        <div
          class="flex flex-col items-center p-x-10 p-y-6 border border-#fff border-solid rounded-2 gap-5 bg-[rgba(255,255,255,.3)]"
          :style="{ 'backdrop-filter': 'blur(8px)' }"
        >
          <Input
            size="large"
            v-model:value="userInfo.username"
            :placeholder="$t('login.usernamePlaceholder')"
          />
          <InputPassword
            size="large"
            v-model:value="userInfo.password"
            :placeholder="$t('login.passwordPlaceholder')"
          />
          <div
            class="self-end cursor-pointer hover:color-[var(--btn-primary-color)] transition-300 text-3.5"
          >
            <div>{{ $t('login.forgetPassword') }}</div>
          </div>
          <Button size="large" class="w-full" @click="handleSubmit">{{
            $t('login.submitButton')
          }}</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { loginApi } from '@/features/user/api'
import { setRefreshToken, setToken } from '@/storage'
import { Button, Input, InputPassword } from 'ant-design-vue'
import { onMounted, onUnmounted, reactive } from 'vue'
import LoginBgImg from '@/assets/imgs/login-bg.png'
import md5 from 'md5'
import { useRouter } from 'vue-router'
import { __IS_DEV__ } from '@/configs'
import { defineCssNamespace } from '@/utils/define-css-namespace'
import Headers from '@/layouts/header/headers.vue'

const userInfo = reactive({
  username: '',
  password: '',
})

const ns = defineCssNamespace('login')

if (__IS_DEV__) {
  userInfo.username = 'admin'
  userInfo.password = '123456'
}

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

<style lang="scss">
@use '@/assets/scss/lib.scss' as *;

@include b('login') {
  @include e('modal') {
    background: linear-gradient(
        to bottom,
        var(--global-bg-color) 30%,
        transparent
      ),
      linear-gradient(120deg, #bbf2f9 20%, #ddd8f8 50%, #ede0da);
  }
}
</style>

<route>
  {
    name: 'Login',
    meta:{
      hidden: true,
      isolated: true
    }
  }
</route>
