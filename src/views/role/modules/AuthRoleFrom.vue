<template>
  <a-modal
    title="角色授权"
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
		  <a-tree
			checkable
			@expand="onExpand"
			:expandedKeys="expandedKeys"
			:autoExpandParent=true
			:checkStrictly=true
			v-model="checkedKeys"
			@select="onSelect"
			:selectedKeys="selectedKeys"
			:treeData="treeData"
		  />
		</a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>

import { getPermissionTree, getRoleCheckedPermissions, rolePermissions } from '@/api/manage'

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
	  treeData: [],
	  expandedKeys: [],
      checkedKeys: [],
      selectedKeys: [],
      form: this.$form.createForm(this)
    }
  },
  watch: {
    checkedKeys(val) {
      //console.log('onCheck', val)
    }
  },
  created () {
    getPermissionTree()
	  .then((res) => {
		this.treeData = res.data
	  })
  },
  methods: {
	onExpand (expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onCheck (checkedKeys) {
      console.log('onCheck', checkedKeys)
      this.checkedKeys = checkedKeys
    },
    onSelect (selectedKeys, info) {
      console.log('onSelect', info)
      this.selectedKeys = selectedKeys
    },
    auth (record) {
	  this.mdl = record
	  getRoleCheckedPermissions(record)
		.then((res) => {
			this.checkedKeys = res.data
		})
      this.visible = true
    },
    handleCancel () {
      this.visible = false
    },
	handleSubmit() {
	  this.confirmLoading = true
	  rolePermissions(this.mdl.id, this.checkedKeys.checked)
	    .then((res) => {
		   this.confirmLoading = false
		   this.visible = false
		   this.$emit('ok', this.mdl)
		})
	}
  }
}
</script>
