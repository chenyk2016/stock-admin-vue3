<template>
  <div>
    <a-button @click="addClick">增加</a-button>
    <a-modal
      v-model:visible="visible"
      title="新建"
      @ok="handleOk"
      >
      <VForm v-model:value="form" :rules="rules" :label-width="100" />
    </a-modal>
  </div>
</template>

<script>
import { VForm } from 'components/cc/v-form'
import { formRules } from '../config'

export default {
  components: { VForm },
  data () {
    return {
      visible: false,
      form: {},
      rules: formRules
    }
  },
  methods: {
    addClick () {
      this.visible = true
    },
    handleOk () {
      const data = this.form
      window.$request.post('/self/add', data).then(res => {
        this.$message.success('提交成功')
        this.visible = false
        this.form = {}
        this.$emit('on-success')
      })
    }
  }
}
</script>

<style>

</style>
