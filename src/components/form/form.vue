<script setup lang="ts">
import { ref, isRef } from 'vue'
import formProps from './form'

const props = defineProps(formProps)
const formState = ref({ ...props.defaultValue })

const getFieldsValue = () => {
  return formState.value
}

defineExpose({
  getFieldsValue,
})
</script>
<template>
  <a-form :label-col="props.labelCol" :model="formState" :name="props.name">
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
            :options="
              isRef(item.extra?.options)
                ? item.extra?.options.value
                : item.extra?.options || []
            "
          >
          </a-select>
        </template>
        <template v-else-if="item.type === 'radio'">
          <a-radio-group
            v-model:value="formState[item.name as keyof typeof formState]"
            v-bind="item.extra"
          >
            <template v-for="l in item.options" :key="l.value">
              <a-radio :value="l.value">{{ l.label }}</a-radio>
            </template>
          </a-radio-group>
        </template>
      </a-form-item>
    </template>
  </a-form>
</template>
<style lang="scss"></style>
