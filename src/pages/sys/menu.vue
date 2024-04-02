<script setup lang="ts">
import { CcCard } from '@/components'
import { Pagination } from '@/components/table-pro/helper'
import { defineTableProps } from '@/components/table-pro/define-table-props'
import BatchDeleteButton from '@/features/components/button/batch-delete-button.vue'
import AddMenu from '@/features/sys/add-menu.vue'
import menuApi, { type IAddMenu } from '@/features/sys/apis'
import MenuType from '@/features/sys/menu-type.vue'
import { getApiType } from '@/types/helper'
import { Modal, TableColumnType } from 'ant-design-vue'
import { ref } from 'vue'
import { CcDivider } from '@/components/index'
import AddButton from '@/features/components/button/add-button.vue'

const addMenuRef = ref()
const tableRef = ref()
type menuStatus = 'add' | 'edit'
const addMenuStatus = reactive({
  status: 'add' as menuStatus,
  id: null as number | null,
})

const tableProps = defineTableProps({
  dataSource: [] as getApiType<(typeof menuApi)['list']>,
  bordered: true,
  columns: markRaw([
    {
      title: '菜单名称',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '图标',
      dataIndex: 'icon',
      align: 'center',
    },
    {
      title: '类型',
      dataIndex: 'type',
      align: 'center',
    },
    {
      title: '路由地址',
      dataIndex: 'path',
      align: 'center',
    },
    {
      title: '组件路径',
      dataIndex: 'components',
      align: 'center',
    },
    {
      title: '排序',
      dataIndex: 'sort',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'action',
      align: 'center',
    },
  ] as TableColumnType[]),
  rowKey: 'id',
})

const handleOpenModal = (status: menuStatus = 'add') => {
  addMenuStatus.status = status
  addMenuRef.value.onOpen()
}

type EditModal = IAddMenu & { id: number }
const handleOpenEditModal = (record: EditModal) => {
  addMenuStatus.id = record.id
  addMenuRef.value.setFieldsValue({ ...record })
  handleOpenModal('edit')
}

const loadData = <T extends Pick<Pagination, 'current' | 'pageSize'>>(
  params: T,
) => {
  const { current, ...otherParams } = params
  return menuApi.list({ ...otherParams, pageNum: current }).then((res) => {
    const { data } = res
    if (data) tableProps.dataSource = data
  })
}

const handleSuccessRefresh = () => {
  tableRef.value.reload()
}

const handleDeleteMenus = async (ids: (string | number)[]) => {
  const params = {
    id: ids.map((target) => String(target)),
  }

  Modal.confirm({
    title: '提示',
    content: '确认删除吗？',
    onOk: async () => {
      await menuApi.deleteMenus(params)
      handleSuccessRefresh()
    },
  })
}
</script>
<template>
  <CcCard>
    <TablePro ref="tableRef" v-bind="tableProps" :loadData="loadData">
      <template #action>
        <AddButton @click="handleOpenModal('add')" />
        <BatchDeleteButton />
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'path'">
          {{ record.path || '-' }}
        </template>
        <template v-if="column.dataIndex === 'components'">
          {{ record.components || '-' }}
        </template>
        <template v-if="column.dataIndex === 'type'">
          <MenuType :type="record.type" />
        </template>
        <template v-if="column.dataIndex === 'action'">
          <LinkButton
            type="link"
            @click="handleOpenEditModal(record as EditModal)"
            >编辑</LinkButton
          >
          <CcDivider type="vertical" />
          <LinkButton type="link" danger @click="handleDeleteMenus([record.id])"
            >删除</LinkButton
          >
        </template>
      </template>
    </TablePro>
  </CcCard>
  <AddMenu
    ref="addMenuRef"
    @refresh="handleSuccessRefresh"
    v-bind="addMenuStatus"
  />
</template>
