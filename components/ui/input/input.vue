<template>
  <FloatLabel>
    <InputText v-model="modelValue" :id="field" />
    <label :for="field">{{ placeholder }}</label>
  </FloatLabel>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'
import { generatorUniqueField } from './helper'
import { withDefaults } from 'vue'

interface Props {
  placeholder?: string
  modelValue: string
}

withDefaults(defineProps<Props>(), {
  placeholder: '',
})

const field = generatorUniqueField()
const modelValue = defineModel('modelValue', { default: '' })
</script>
