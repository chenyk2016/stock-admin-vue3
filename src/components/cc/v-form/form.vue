<!--
 * @Author: 鹿鸣
 * @Date: 2020-12-16 21:09:00
 * @LastEditTime: 2020-12-23 11:37:44
 * @LastEditors: 鹿鸣
 * @Description: 配置化表格

-->

<!--
使用示例:

<VForm v-model="data" rules="rules" :label-width="100" />

rules配置说明:
[
  {
    type: 'Input', // 类型， 必填
    title: '哈德', // 名称， 必填
    field: 'name', // 字段id，必填
    value: '12', // 初始值，删除不可用
    validate: [ // 验证规则
      {
        required: true,
        type: 'string',
        message: "2222",
        trigger: 'blur',
      }
    ],
    props: { // 传递给表单组件的属性
      placeholder: '请输入',
      style: {
        width: '100px',
      },
    }
  }
]
-->
<template>
  <Form
    v-if="initOk"
    ref="form"
    class="v-form"
    :model="data"
    :rules="validateRules"
    v-bind="$attrs"
  >
    <div v-for="rule in rules" :key="rule.filed">
      <Render v-if="rule.ext && rule.ext.formItemTop" :render="rule.ext.formItemTop" />
      <VFormItem
        v-model="data[rule.field]"
        :conf="rule"
        @on-form-change="onFormChange"
      />
      <Render v-if="rule.ext && rule.ext.formItemBottom" :render="rule.ext.formItemBottom" />
    </div>
  </Form>
</template>

<script>
import { _ } from '@/utils'
import VFormItem from './form-item'
import Render from './render'

export default {
  name: 'VForm',
  components: { VFormItem, Render },
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    rules: {
      type: Array,
      default: () => [
      ],
    }
  },
  computed: {
    data: {
      get() {
        return this.value
      },
      set(v) {
        this.$emit('input', v)
      }
    }
  },
  data() {
    return {
      initOk: false,
      validateRules: {
        name: [
          {
            required: true,
            trigger: 'blur',
          }
        ]
      }
    }
  },
  watch: {
    rules: {
      handler() {
        console.log(['v-form-finally-rules:', this.rules]);

        this.initOk = false
        let validateRules = {}, data = {};

        this.rules.forEach(rule => {
          // 复制value数据
          data[rule.field] = _.deepCopy(rule.value)
          if (rule.validate && rule.validate.length) {
            validateRules[rule.field] = rule.validate
          }
        })

        // 合并当前值和默认值
        // 保留已经修改的值
        // 同时给 data 赋默认值, 默认值从rules中获取
        // this.data = Object.assign({}, data, this.data)

        this.validateRules = validateRules
        // todo 清除表单校验
        this.$nextTick(() => {
          this.initOk = true
        })
      },
      deep: true,
      immediate: true,
    }
  },
  methods: {
    // child调用
    onFormChange(...rest) {
      this.$emit('on-form-change', ...rest)
    },
    resetFields(defData = {}) {
      this.$refs.form.resetFields()
      this.data = Object.assign(this.data, defData)
    },
    validate(callback) {
      this.$refs.form.validate(callback && callback)
    },
    setValue(field, value) {
      let data = field
      if (typeof field !== 'object') {
        data = { [field]: value }
      }
      Object.assign(this.data, data)
    }
  }
}
</script>

<style>

</style>