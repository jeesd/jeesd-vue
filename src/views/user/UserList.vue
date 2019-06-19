<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="用户名">
              <a-input v-model="queryParam.username" placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="使用状态">
              <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                <a-select-option value="">全部</a-select-option>
                <a-select-option value="-1">冻结</a-select-option>
                <a-select-option value="0">注册</a-select-option>
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
      <a-button type="primary" icon="plus" @click="$refs.createUserModal.add()">新建</a-button>
      <a-dropdown v-action:user-delete v-if="selectedRowKeys.length > 0">
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
          <a @click="handleEdit(record)">修改</a>
          <a-divider type="vertical" />
		  <a @click="handleSubRole(record)">分配角色</a>
		  <a-divider type="vertical" />
          <a @click="handleSub(record)" v-if="record.status==0">冻结</a>
		  <a @click="handleSub(record)" v-else>解冻</a>
        </template>
      </span>
    </s-table>
	<create-user-from ref="createUserModal" @ok="handleOk" />
	<edit-user-from ref="editModal" @ok="handleOk" />
	<distribute-role-from ref="rolesModal" @ok="handleOk" />
  </a-card>
</template>

<script>
import moment from 'moment'
import { STable } from '@/components'
import EditUserFrom from './modules/EditUserFrom'
import CreateUserFrom from './modules/CreateUserFrom'
import DistributeRoleFrom from './modules/DistributeRoleFrom'
import { getUserList, editUser } from '@/api/manage'

const statusMap = {
  0: {
    status: 'processing',
    text: '注册'
  },
  2: {
    status: 'default',
    text: '冻结'
  }
}

export default {
  name: 'TableList',
  components: {
    STable,
	CreateUserFrom,
	EditUserFrom,
	DistributeRoleFrom
  },
  data () {
    return {
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'id' }
        },
        {
          title: '用户名',
          dataIndex: 'username'
        },		
		{
          title: '昵称',
          dataIndex: 'nickName'
        },
        {
          title: '手机号',
          dataIndex: 'phone'
        },
        {
          title: '邮箱',
          dataIndex: 'email'
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
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '200px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        return getUserList(Object.assign(parameter, this.queryParam))
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
  created () {
   
  },
  methods: {    
    handleEdit (record) {

      this.$refs.editModal.edit(record)
    },
    handleSub (record) {
	  if (record.status == 0) {
        record.status = 2
      } else {
        record.status = 0
      }
	  editUser(record)
		.then((res) => {
			this.$message.info(`操作成功！`)
			this.$refs.table.refresh()
		})
		.catch(err => {
			
		})
    },
	handleSubRole(record) {
	  this.$refs.rolesModal.distribute(record)
	},
    handleOk () {
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
    }
  }
}
</script>
