<template>
  <a-modal
    title="新建用户"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
		<a-form-item
          label="用户名"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['username', {rules: [{required: true, message: '请输入用户名！'}]}]" />
        </a-form-item>
		<a-form-item
          label="密码"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['password', {rules: [
		  {required: true, min: 6, message: '请输入6位以上密码！'}]}]"  type="password" />
        </a-form-item>
        <a-form-item
          label="昵称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['nickName', {rules: [{required: true, message: '请输入昵称！'}]}]" />
        </a-form-item>
		<a-form-item
          label="手机号"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['phone', {rules: [{required: true, min: 11, message: '请输入11位手机号！'}]}]" />
        </a-form-item>
		<a-form-item
          label="邮箱"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['email', {rules: [
		  {type:'email', message: 'The input is not valid E-mail!'},
		  {required: true, message: '请输入邮箱！'}]}]"/>
        </a-form-item>
		<a-form-item
          label="选择部门"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
		  <a-select
		    @change="handleDeptChange"
		    placeholder="Select Dept"
		  >
		    <a-select-option v-for="d in deptData" :key="d.id">{{d.name}}</a-select-option>
		  </a-select>
        </a-form-item>
		<!-- <a-form-item
		  :labelCol="labelCol"
		  :wrapperCol="wrapperCol"
		  label="头像"
		  extra=""
		>
		  <a-upload
			v-decorator="['headPicture', {
			  valuePropName: 'fileList',
			  getValueFromEvent: normFile,
			}]"
			name="logo"
			action="/upload.do"
			list-type="picture"
		  >
			<a-button>
			  <a-icon type="upload" /> Click to upload
			</a-button>
		  </a-upload> 
		</a-form-item>	-->	
		<a-form-item
          label="性别"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
        <a-radio-group v-decorator="['sex']">
          <a-radio :value="0">男</a-radio>
          <a-radio :value="1">女</a-radio>
        </a-radio-group>
      </a-form-item>		

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { addUser, selectDepts } from '@/api/manage'
import md5 from 'md5'

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
    add () {
      this.visible = true
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
		  values.password = md5(values.password)
		  values.deptId = this.deptId
		  addUser(values)
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
    },
	normFile (e) {
      console.log('Upload event:', e)
      if (Array.isArray(e)) {
        return e
      }
      return e && e.fileList
    },
	handleDeptChange(value){
		this.deptId = value
	}
  }
}
</script>
