<script setup lang="ts">
import { ref } from 'vue'
import formProps from './form'
const formState = ref({})

const props = defineProps(formProps)

const getFieldsValue = () => {
  return formState.value
}

defineExpose({
  getFieldsValue,
})
</script>
<template>
  <a-form :model="formState" :name="props.name">
    <template v-for="item in props.columns">
      <a-form-item :label="item.label" :name="item.name">
        <template v-if="item.slot">
          <slot :name="item.slot.name" />
        </template>
        <template v-else-if="item.type === 'input'">
          <a-input
            v-model:value="formState[item.name as keyof typeof formState]"
            :placeholder="'请输入' + item.label"
            v-bind="item.extra"
          />
        </template>
        <template v-else-if="item.type === 'input-number'">
          <a-input-number
            class="w-full"
            v-model:value="formState[item.name as keyof typeof formState]"
            :placeholder="'请输入' + item.label"
            v-bind="item.extra"
          />
        </template>
        <template v-else-if="item.type === 'select'">
          <a-select
            v-model:value="formState[item.name as keyof typeof formState]"
            :placeholder="'请选择' + item.label"
            v-bind="item.extra"
          >
          </a-select>
        </template>
      </a-form-item>
    </template>
  </a-form>
</template>
<style lang="scss"></style>
