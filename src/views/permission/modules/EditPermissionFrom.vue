<template>
  <a-modal
    title="修改权限"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
	@ok="handleOk"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
		<a-form-item
          label="权限名"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['name', {rules: [{required: true, message: '请输入权限名！'}]}]" />
        </a-form-item>
		<a-form-item
          label="权限标识"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['permission', {rules: [
		  {required: true, message: '请输入权限标识'}]}]"/>
        </a-form-item>
        <a-form-item
          label="权限路径"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['path', {rules: [{min: 3, message: '请输入3个以上字符！'}]}]" />
        </a-form-item>
		<a-form-item
          label="权限类型"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
		  <a-radio-group v-decorator="['type', {rules: [{required: true}]}]" >
			<a-radio-button :value="0" >
			  菜单
			</a-radio-button>
			<a-radio-button :value="1" >
			  按钮
			</a-radio-button>
		  </a-radio-group>
        </a-form-item>
		<a-form-item
          label="排序"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input-number v-decorator="['sort']" />
        </a-form-item>	
		<a-form-item
          label="组件名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['component', {rules: [{min: 3, message: '请输入3个以上字符！'}]}]" />
        </a-form-item>
		<a-form-item
          label="图标"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
		  <a-input v-decorator="['icon']" />
        </a-form-item>				
      </a-form>      
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { editPermission } from '@/api/manage'

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
        setFieldsValue(pick(record, ['id','name','permission','path','type','sort','component']))
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
		  editPermission(newFormVals)
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
	handleIconChange(icon) {
		console.info(icon);
	}
  }
}
</script>
