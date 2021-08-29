<template>
  <a-form-item
    ref="formItem"
    v-bind="formItemProps"
  >
    <!-- ext.top -->
    <Render v-for="(render, index) in topRenders" :key="index" :render="render" />

    <template v-if="conf.type === 'RadioGroup'">
      <a-radio-group v-model:value="modelValue" class="ims-radio" v-bind="itemProps">
        <a-radio
          v-for="item in conf.data"
          :key="item.value"
          :value="item.value"
        >
          {{ item.label }}
        </a-radio>
      </a-radio-group>
    </template>
    <template v-else>
      <component
        :is="conf.type"
        v-model:value="modelValue"
        :style="style"
        v-bind="itemProps"
        @blur="onBlur"
        @change="onChange"
      />
    </template>

    <!-- ext.bottom -->
    <Render v-for="(render, index) in bottomRenders" :key="index" :render="render" />
  </a-form-item>
</template>

<script>
import { _ } from '@/utils'

// import FormItem from 'ant-design-vue/es/form/FormItem'
// import ImgUpload from '~/components/img-upload';
// import mixins from '~/mixins/emitter'
import Render from './render'
import VDatePicker from './DatePicker'

export default {
  name: 'VFormItem',
  components: { Render, VDatePicker },
  // mixins: [mixins],
  props: {
    value: {},
    conf: {
      type: Object,
      default () {
        return {
          type: '',
          field: '',
          title: '',
          validate: [],
          value: '',
          formItemProps: {},
          props: {
            data: []
          }
        }
      },
      validator: function (conf) {
        if (typeof conf !== 'object') return false
        if (!conf.field) {
          throw new Error('form-item: conf.field必须传值')
          // console.error('')
        }
        return true
      }
    }
  },
  mounted () {
  },
  computed: {
    modelValue: {
      get () {
        return this.value
      },
      set (v) {
        this.$emit('update:value', v)
      }
    },
    topRenders () {
      let renders = []
      const renderConf = this.conf.ext && this.conf.ext.top
      if (_.isArray(renderConf)) {
        renders = renderConf
      } else if (_.isFunction(renderConf)) {
        renders = [renderConf]
      }
      return renders
    },
    bottomRenders () {
      let renders = []
      const renderConf = this.conf.ext && this.conf.ext.bottom
      if (_.isArray(renderConf)) {
        renders = renderConf
      } else if (_.isFunction(renderConf)) {
        renders = [renderConf]
      }
      return renders
    }
  },
  data () {
    return {
      rules: [],
      // FormItem的props
      formItemProps: {
        label: '',
        // rules: [],
        name: ''
      },
      // 表单组件的属性
      itemProps: {
      },
      // 选项数据
      data: [],
      // 样式
      style: {}
    }
  },
  watch: {
    conf: {
      handler (v) {
        // console.log(['v-form-item: conf change', v])
        const itemProps = {}; const formItemProps = {}; let style = {}

        formItemProps.label = v.title
        formItemProps.name = v.field

        if (v.formItemProps) {
          Object.assign(formItemProps, v.formItemProps)
        }

        Object.keys(v.props || {}).forEach(key => {
          if (key === 'style') {
            style = v.props.style
          } else if (key !== 'data') {
            itemProps[key] = v.props[key]
          }
        })

        // 初始化value
        // this.modelValue = v.value
        this.itemProps = itemProps
        this.formItemProps = formItemProps
        this.style = style
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    onBlur (v) {
      // console.log('onBlur', v)
      this.$refs.formItem.onFieldBlur()
    },
    onChange (v) {
      // console.log('onChange', v)
      this.$refs.formItem.onFieldChange()
    }
  }
}
</script>

<style>

</style>
