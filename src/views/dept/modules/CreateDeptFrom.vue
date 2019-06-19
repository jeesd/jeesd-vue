<template>
  <a-modal
    title="新建部门"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
	  	<a-form-item
          label="父菜单"		 
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
		  <a-select
			@change="handleChange"
			placeholder="Select a dept"
		  >
			<a-select-option v-for="d in selectData" :key="d.id">{{d.name}}</a-select-option>
		  </a-select>
        </a-form-item>
		<a-form-item
          label="部门名"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['name', {rules: [{required: true, min: 3, message: '请输入部门名！'}]}]" />
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
import { addDept, selectDepts } from '@/api/manage'

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
	  selectData: [],
	  parentId: null,
      form: this.$form.createForm(this)
    }
  },
  created () {
    selectDepts()
	  .then((res) => {
		this.selectData = res.data
	  })
  },
  methods: {
    add () {
      this.visible = true
    },
	onSelect (selectedKeys, info) {
      console.log('selected', selectedKeys, info)
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
		  if(this.parentId == null) {
			return;
		  }
		  values.parentId = this.parentId
		  addDept(values)
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
	handleChange(value) {
	   this.parentId = value
	}
  }
}
</script>
