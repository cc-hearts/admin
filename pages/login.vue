<template>
  <Card class="w-full max-w-sm">
    <div class="w-full flex items-center justify-center p-t-6 p-b-2">
      <img src="/logo.svg" class="w-8 h-8" />
    </div>
    <div class="p-6">
      <FormSchema
        ref="formSchemaRef"
        :schema="formSchema"
        :layout="{ span: 1, labelPosition: 'vertical' }"
      />

      <Button
        type="primary"
        class="w-full m-t-2"
        size="large"
        @click="handleLogin"
        >Sign in</Button
      >

      <Divider>other</Divider>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { FormSchema, Card, Button, Divider } from '~/components'

definePageMeta({
  layout: 'login-layout',
})

const formSchema = [
  {
    label: 'Username',
    type: 'input',
    name: 'username',
    componentProperty: {
      size: 'large',
      placeholder: 'carl',
    },
  },
  {
    label: 'Password',
    type: 'input',
    name: 'password',
    componentProperty: {
      type: 'password',
      size: 'large',
    },
  },
]

const formSchemaRef = ref()
const handleLogin = async () => {
  const bool = await formSchemaRef.value.validate()
  if (!bool) return

  console.log(formSchemaRef.value.getFieldsValue())
}
</script>

<style></style>
