<script setup lang="ts">
import { defineTableProps } from '@/components/table/define-table-props'
import Table from '@/components/table/table.vue'
import AddButton from '@/features/components/button/AddModule.vue'
import BatchDeleteButton from '@/features/components/button/BatchDelete.vue'
import { MODEL_TYPE } from '@/features/constant/index'
import AddTemplateModal from '@/features/pages/template/add-template-modal.vue'
import { ref } from 'vue'

const addTemplateModalRef = ref()
const tableProps = defineTableProps({
  columns: [],
})

const handleOpenModal = (modalType: MODEL_TYPE) => {
  addTemplateModalRef.value?.onOpen(modalType)
}
</script>
<template>
  <Table v-bind="tableProps">
    <template #action>
      <AddButton @click="handleOpenModal(MODEL_TYPE.ADD)" />
      <BatchDeleteButton />
    </template>
  </Table>
  <AddTemplateModal ref="addTemplateModalRef" />
</template>
<style lang="scss"></style>
