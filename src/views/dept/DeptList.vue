<template>
  <a-card :bordered="false">

	<div class="table-operator">
      <a-button type="primary" icon="plus" @click="$refs.createDeptModal.add()">新建</a-button>
    </div>

    <s-table 
	  ref="table"
	  size="default"
	  rowKey="id"
	  :pagination=false
	  :columns="columns" 
	  :defaultExpandAllRows=true
	  :data="loadData">

	  <span slot="deptType" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>

      <span slot="action" slot-scope="text, record">
        <a @click="handleEdit(record)">修改</a>
        <a-divider type="vertical" />
        <a-dropdown>
          <a class="ant-dropdown-link">
            更多 <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a href="javascript:;">禁用</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">删除</a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
    </s-table>	
	<create-dept-from ref="createDeptModal" @ok="handleOk" />
	<edit-dept-from ref="editModal" @ok="handleOk" />
  </a-card>
</template>

<script>
import { STable } from '@/components'
import CreateDeptFrom from './modules/CreateDeptFrom'
import EditDeptFrom from './modules/EditDeptFrom'
import { getDepts } from '@/api/manage'

const deptTypeMap = {
  0: {
    status: 'success',
    text: '启用'
  },
  1: {
    status: 'error',
    text: '禁用'
  }
}

export default {
  name: 'deptList',
  components: {
    STable,
	CreateDeptFrom,
	EditDeptFrom
  },
  data () {
    return {
      visible: false,      
      form: null,
      mdl: {},

      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '序号',
          dataIndex: 'id'
        },
        {
          title: '部门名称',
          dataIndex: 'name'
        },
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'deptType' }
        },
        {
          title: '操作',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
	  loadData: parameter => {
        return getDepts(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.data
          })
      },

      selectedRowKeys: [],
      selectedRows: []
    }
  },
  filters: {
    statusFilter (type) {
      return deptTypeMap[type].text
    },
    statusTypeFilter (type) {
      return deptTypeMap[type].status
    }
  },
  created () {
    
  },
  methods: {
    handleEdit (record) {

      this.$refs.editModal.edit(record)
    },
    handleOk () {
	  // 新增/修改 成功时，重载列表
      this.$refs.table.refresh()
    }
  },
  watch: {
    /*
      'selectedRows': function (selectedRows) {
        this.needTotalList = this.needTotalList.map(item => {
          return {
            ...item,
            total: selectedRows.reduce( (sum, val) => {
              return sum + val[item.dataIndex]
            }, 0)
          }
        })
      }
      */
  }
}
</script>
