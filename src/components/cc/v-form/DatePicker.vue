<!--
 * @Author: 鹿鸣
 * @Date: 2020-12-19 20:26:48
 * @LastEditTime: 2021-08-28 22:59:02
 * @LastEditors: 鹿鸣
 * @Description: date-picker的扩展
 * @功能点:
 ** 1. v-model自动格式化日期
 ** 2. props: 'show-long-time' 展示长期按钮，长期日期为‘9999-00-00’
 **
-->

<template>
  <div class="v-date-picker">
    <!-- 不能绑定 v-on="$listeners" 会把emit事件透传给父组件 -->
    <DatePicker
      :value="dateValue"
      v-bind="$attrs"
      :disabled="isCheckedLongTime"
      @on-change="onChange"
    />
    <Checkbox
      v-if="showLongTime"
      class="v-date-picker-checkbox"
      :value="isCheckedLongTime"
      :true-value="true"
      :false-value="false"
      @on-change="longDate"
    >
      长期
    </Checkbox>
  </div>
</template>

<script>
const longTime = '9999-00-00'

export default {
  name: 'VDatePicker',
  props: {
    // 是否显示长期按钮
    showLongTime: Boolean,
    value: {
      type: [String, Date],
      default: undefined
    }
  },
  computed: {
    isCheckedLongTime () {
      return this.value === longTime
    },
    dateValue () {
      if (this.isCheckedLongTime) {
        return ''
      }
      return this.value
    }
  },
  methods: {
    onChange (v) {
      this.$emit('input', v)
    },
    longDate (v) {
      if (v) {
        this.$emit('input', longTime)
      } else {
        this.$emit('input', '')
      }
    }
  }
}
</script>

<style>
.v-date-picker-checkbox{
  margin-left: 10px;
}
</style>
