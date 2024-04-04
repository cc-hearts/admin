<template>
  <a-form
    ref="formInstance"
    :model="formValue"
    :name="name"
    :label-col="layout.labelCol"
    :wrapper-col="layout.wrapperCol"
  >
    <a-row :gutter="props.gutter">
      <a-col
        v-for="item in schema"
        :key="item.name"
        :span="item.span || calcDefaultSpan"
      >
        <a-form-item :label="item.label" :name="item.name">
          <template v-if="item.slot?.name">
            <slot
              :name="item.slot.name"
              v-bind="{
                __property__: item.componentProperty || {},
                value: formValue,
                __slot__: item.slot,
              }"
            />
          </template>

          <component
            v-else
            :is="mapComponentBySchemaComponentName(item.type)"
            v-model:value="formValue[item.name]"
            v-bind="item.componentProperty"
          />
          <!-- <template v-else-if="item.type === 'input'">
              <a-input v-model:value="formValue[item.name]" :placeholder="'请输入' + item.label" v-bind="item.extra" />
            </template>
            <template v-else-if="item.type === 'input-number'">
              <a-input-number class="w-full" v-model:value="formValue[item.name]" :placeholder="'请输入' + item.label"
                v-bind="item.extra" />
            </template>
            <template v-else-if="item.type === 'select'">
              <a-select v-model:value="formValue[item.name]" :placeholder="'请选择' + item.label" v-bind="item.extra"
                :options="unref(item.extra?.options || [])">
              </a-select>
            </template>
            <template v-else-if="item.type === 'radio'">
              <a-radio-group v-model:value="formValue[item.name]" v-bind="item.extra">
                <template v-for="l in item.options" :key="l.value">
                  <a-radio :value="l.value">{{ l.label }}</a-radio>
                </template>
              </a-radio-group>
            </template> -->
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup lang="ts">
import { computed, ref, unref } from 'vue'
import { FormProps, mapComponentBySchemaComponentName } from './helper'
import { isFn } from '@cc-heart/utils'

defineOptions({
  name: 'FormSchema',
})

const props = withDefaults(defineProps<FormProps>(), {
  name: 'basic',
  layout: () => ({
    span: 3,
    gutter: 12,
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  }),
  schema: () => [],
  defaultValue: () => ({}),
})

// ================ initial values =================
const formInstance = ref()

const formValue = ref<Record<PropertyKey, any>>({
  ...(isFn(props.defaultValue) ? props.defaultValue() : props.defaultValue),
})
const calcDefaultSpan = computed(() => Math.floor(24 / props.layout.span))

// =========== expose ============
const getFieldsValue = () => unref(formValue)

const setFieldValue = (key: PropertyKey, val: unknown) => {
  Reflect.set(formValue.value, key, val)
}

const setFieldsValue = (target: Record<PropertyKey, any>) => {
  Object.assign(formValue.value, target)
}

const validate = async () => {
  try {
    await formInstance.value.validate()
  } catch (e) {
    return [false, null]
  }
  return [true, unref(formValue)]
}

const resetFields = () => {
  formInstance.value.resetFields()
}

defineExpose({
  validate,
  resetFields,
  setFieldValue,
  getFieldsValue,
  setFieldsValue,
})
</script>
