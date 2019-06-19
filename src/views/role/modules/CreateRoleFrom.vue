<template>
  <a-modal
    title="新建角色"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
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
import { addRole } from '@/api/manage'

export default {
  components: {
  },
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

      form: this.$form.createForm(this)
    }
  },
  methods: {
    add () {
      this.visible = true
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
		  addRole(values)
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
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>
