<template>
  <a-modal
    title="分配角色"
    :width="640"
    :visible="visible"
	:destroyOnClose=true
    :confirmLoading="confirmLoading"
	@ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
		<a-form-item>
		  <a-select
		    mode="multiple"
			@change="handleChange"
			:value="roleIds"
			placeholder="Select a Roles"
		  >
			<a-select-option v-for="d in roleData" :key="d.id">{{d.roleName}}</a-select-option>
		  </a-select>		  
		</a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

import { getRoleAll, getRoleByUser, userRoles } from '@/api/manage'

export default {
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: false,
      confirmLoading: false,
	  mdl: {},
	  roleIds: [],
	  roleData: [],
      form: this.$form.createForm(this)
    }
  },
  created () {
    getRoleAll()
	  .then((res) => {
		this.roleData = res.data
	  })
  },
  methods: {
	distribute (record) {
	  this.mdl = record
	  this.visible = true
	  getRoleByUser(record.id)
	    .then((res) => {
			this.roleIds = res.data
	    })
	},
    handleCancel () {
      this.visible = false
    },
	handleSubmit() {
	  this.confirmLoading = true
	  userRoles(this.mdl.id, this.roleIds)
	    .then((res) => {
		  this.confirmLoading = false
		  this.visible = false
		  this.roleIds = []
		  this.$emit('ok', this.mdl)
	    })	  
	},
	handleChange(value) {
	  this.roleIds = value	
	}
  }
}
</script>
