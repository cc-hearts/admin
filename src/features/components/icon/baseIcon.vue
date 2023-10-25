<script setup lang="ts">
import * as Outline from './Outlined'
import * as Filled from './Filled'
import * as TwoTone from './TwoTone'
const buttonOptions = [
  { label: '线框风格', value: 'outLine' },
  { label: '实底风格', value: 'filled' },
  { label: '双色风格', value: 'twoTone' },
]
const activeButton = ref(buttonOptions[0]['value'])
const OutlineKey = Object.keys(Outline)
const FilledKey = Object.keys(Filled)
const TwoToneKey = Object.keys(TwoTone)
const activeKeys = computed(() => {
  switch (activeButton.value) {
    case 'outLine':
      return OutlineKey
    case 'filled':
      return FilledKey
    case 'twoTone':
      return TwoToneKey
  }
})
const emits = defineEmits<{
  (event: 'update:modalValue', iconName: string): void
}>()
const emitSelectIcon = (iconName: string) => {
  emits('update:modalValue', iconName)
}
</script>
<template>
  <a-radio-group
    class="sticky top-0"
    option-type="button"
    v-model:value="activeButton"
  >
    <a-radio
      v-for="item in buttonOptions"
      :key="item.value"
      :value="item.value"
    >
      {{ item.label }}
    </a-radio>
  </a-radio-group>
  <div class="absolute top-0 m-t-8 overflow-auto h-90%">
    <template v-for="item in activeKeys" :key="item">
      <a-button class="m-2" @click="emitSelectIcon(item)">
        <component :is="item" />
      </a-button>
    </template>
  </div>
</template>
<style lang="scss"></style>
