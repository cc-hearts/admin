<script setup lang="ts">
import { PropType } from 'vue'
import { MENU_TYPE, MenuTypeMapName } from './constant'

const props = defineProps({
  type: {
    type: [Number, String] as PropType<MENU_TYPE>,
    default: 0,
  },
})

const MenuTypeMapColorStr = {
  [MENU_TYPE.DIRECTORY]: 'blue',
  [MENU_TYPE.MENU]: 'green',
}
</script>

<template>
  <a-tag :color="MenuTypeMapColorStr[props.type]">
    {{ MenuTypeMapName[props.type] }}
  </a-tag>
</template>
