<script setup lang="ts">
import { defineTableProps } from '@/components/table-pro/define-table-props'
import { TablePro } from '@/components/table-pro'
import {
  BatchDeleteButton,
  AddButton,
} from '@/features/components/button/index'
import { MODEL_TYPE } from '@/features/constant/index'
import AddTemplateModal from '@/features/pages/template/add-template-modal.vue'
import { ref } from 'vue'
import { CcCard } from '@/components/index'

const addTemplateModalRef = ref()
const tableProps = defineTableProps({
  columns: [],
})

const handleOpenModal = (modalType: MODEL_TYPE) => {
  addTemplateModalRef.value?.onOpen(modalType)
}
</script>

<template>
  <CcCard>
    <TablePro v-bind="tableProps">
      <template #action>
        <AddButton @click="handleOpenModal(MODEL_TYPE.ADD)" />
        <BatchDeleteButton />
      </template>
    </TablePro>
  </CcCard>

  <AddTemplateModal ref="addTemplateModalRef" />
</template>
