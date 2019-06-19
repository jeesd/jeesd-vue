<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="角色名">
              <a-input v-model="queryParam.roleName" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="使用状态">
              <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                <a-select-option value="">全部</a-select-option>
                <a-select-option value="0">启用</a-select-option>
                <a-select-option value="1">禁用</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>          
          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons"">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>             
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="$refs.createRoleModal.add()">新建</a-button>
      <a-dropdown v-action:role-delete v-if="selectedRowKeys.length > 0">
        <a-menu slot="overlay">
          <a-menu-item key="1"><a-icon type="delete" />删除</a-menu-item>
          <!-- lock | unlock -->
          <a-menu-item key="2"><a-icon type="lock" />锁定</a-menu-item>
        </a-menu>
        <a-button style="margin-left: 8px">
          批量操作 <a-icon type="down" />
        </a-button>
      </a-dropdown>
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      :alert="options.alert"
      :rowSelection="options.rowSelection"
    >
      <span slot="id" slot-scope="text, record, index">
        {{ index + 1 }}
      </span>
      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>

      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="$refs.editRoleModal.edit(record)">修改</a>
          <a-divider type="vertical" />
		  <a @click="handleSub(record)" v-if="record.status==0">禁用</a>
		  <a @click="handleSub(record)" v-else>启用</a>
		  <a-divider type="vertical" />
          <a @click="$refs.authRoleModal.auth(record)">授权</a>
        </template>
      </span>
    </s-table>
	
	<edit-role-from ref="editRoleModal" @ok="handleOk" />
	<create-role-from ref="createRoleModal" @ok="handleOk" />
	<auth-role-from ref="authRoleModal" @ok="handleOk" />
  </a-card>
</template>

<script>
import { STable } from '@/components'
import CreateRoleFrom from './modules/CreateRoleFrom'	
import EditRoleFrom from './modules/EditRoleFrom'
import AuthRoleFrom from './modules/AuthRoleFrom'
import { getRoleList, editRole } from '@/api/manage'

const statusMap = {
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
  name: 'RoleList',
  components: {
    STable,
	CreateRoleFrom,
    EditRoleFrom,
	AuthRoleFrom
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
          dataIndex: 'id',
		  scopedSlots: { customRender: 'id' }
        },
        {
          title: '角色名称',
          dataIndex: 'roleName'
        },
		{
          title: '角色编码',
          dataIndex: 'roleCode'
        },
		{
          title: '角色描述',
          dataIndex: 'roleRemark'
        },
        {
          title: '状态',
          dataIndex: 'status',
		  scopedSlots: { customRender: 'status' }
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          sorter: true
        }, {
          title: '操作',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
	  // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getRoleList(Object.assign(parameter, this.queryParam))
          .then(res => {
            return res.data
          })
      },

      selectedRowKeys: [],
      selectedRows: [],
	  // custom table alert & rowSelection
      options: {
        alert: { show: true, clear: () => { this.selectedRowKeys = [] } },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      }
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  methods: {
    handleOk () {
      // 新增/修改 成功时，重载列表
      this.$refs.table.refresh()
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    },
	handleSub (record) {
	  if (record.status == 0) {
        record.status = 1
      } else {
        record.status = 0
      }
	  editRole(record)
		.then((res) => {
			this.$message.info(`操作成功！`)
			this.$refs.table.refresh()
		})
		.catch(err => {
			
		})
    },
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
