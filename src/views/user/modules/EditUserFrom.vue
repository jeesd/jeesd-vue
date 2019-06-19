<template>
  <a-modal
    title="修改用户"
    :width="640"
    :visible="visible"
	:destroyOnClose=true
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
	@ok="handleSubmit"
  >
    <a-spin :spinning="confirmLoading">
      <a-form  :form="form">
	   	<a-form-item
          label="选择部门"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
		  <a-select
		    @change="handleDeptChange"
			:value="deptId"
		    placeholder="Select Dept"
		  >
		    <a-select-option v-for="d in deptData" :key="d.id">{{d.name}}</a-select-option>
		  </a-select>
        </a-form-item>
        <a-form-item
          label="别名"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['nickName', {rules: [{required: true, min: 5, message: '请输入别名！'}]}]" />
        </a-form-item>
		<a-form-item
          label="手机号"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['phone', {rules: [{required: true, min: 11, message: '请输入手机号！'}]}]" />
        </a-form-item>
		<a-form-item
          label="邮箱"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['email', {rules: [
		  {type:'email', message: 'The input is not valid E-mail!'},
		  {required: true, min: 11, message: '请输入邮箱！'}]}]"/>
        </a-form-item>
      </a-form>      
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { editUser, selectDepts } from '@/api/manage'

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
	  deptData: [],
	  deptId: null,
      form: this.$form.createForm(this)
    }
  },
  created () {
    selectDepts()
	  .then((res) => {
		this.deptData = res.data
	  })
  },
  methods: {
    edit (record) {
      this.visible = true
	  this.deptId = record.deptId
	  this.mdl = Object.assign({}, record)
      const { form: { setFieldsValue } } = this
      this.$nextTick(() => {
        setFieldsValue(pick(record, ['id','nickName','phone','email']))
      })
    },
    handleCancel () {
      this.visible = false
    },
	handleSubmit(){
	  const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
	    values.deptId = this.deptId
		const newFormVals = { ...this.mdl, ...values };
        if (!errors) {
		  editUser(newFormVals)
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
	handleDeptChange(value){
		this.deptId = value
	}
  }
}
</script>
