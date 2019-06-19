<template>
  <a-modal
    title="修改"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
		<a-form-item
          label="角色名"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['roleName', {rules: [{required: true, message: '请输入角色名！'}]}]" />
        </a-form-item>
		<a-form-item
          label="角色编码"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['roleCode', {rules: [
		  {required: true, message: '角色编码！'}]}]"/>
        </a-form-item>
        <a-form-item
          label="角色备注"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-textarea v-decorator="['roleRemark', {rules: [{required: true, message: '请输入角色备注！'}]}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { editRole } from '@/api/manage'

export default {
  name: 'RoleModal',
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      visible: false,
      confirmLoading: false,
      mdl: {},

      form: this.$form.createForm(this)
    }
  },
  created () {
   
  },
  methods: {
    edit (record) {
      this.visible = true
	  this.mdl = Object.assign({}, record)
      const { form: { setFieldsValue } } = this
      this.$nextTick(() => {
        setFieldsValue(pick(record, ['id','roleName','roleCode','roleRemark']))
      })
    },  
	handleCancel () {
      this.visible = false
    },	
    handleOk () {
	  const { form: { validateFields } } = this
	  this.confirmLoading = true
	  validateFields((errors, values) => {
		const newFormVals = { ...this.mdl, ...values };
        if (!errors) {
		  editRole(newFormVals)
            .then((res) => {
				this.visible = false
				this.confirmLoading = false
				this.$emit('ok', values)
			})
            .catch(err => {
				
			})
            .finally(() => {
				this.confirmLoading = false
            })
        } else {
          this.confirmLoading = false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
