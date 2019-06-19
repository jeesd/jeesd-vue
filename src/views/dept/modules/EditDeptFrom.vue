<template>
  <a-modal
    title="修改部门"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
	@ok="handleOk"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
		<a-form-item
          label="部门名"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['name', {rules: [{required: true, message: '请输入部门名！'}]}]" />
        </a-form-item>
		<a-form-item
          label="排序"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input-number v-decorator="['sort']" />
        </a-form-item>	
      </a-form>      
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { editDept } from '@/api/manage'

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

      form: this.$form.createForm(this)
    }
  },
  methods: {
    edit (record) {
      this.visible = true
	  this.mdl = Object.assign({}, record)
	  record.children = [];
      const { form: { setFieldsValue } } = this
      this.$nextTick(() => {
        setFieldsValue(pick(record, ['id','name','sort']))
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
		newFormVals.children = [];
        if (!errors) {
		  editDept(newFormVals)
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
