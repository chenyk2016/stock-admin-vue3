<template>
  <FormItem
    v-bind="formItemProps"
    @on-form-change="onFormChange"
  >
    <!-- ext.top -->
    <Render v-for="(render, index) in topRenders" :key="index" :render="render" />

    <template v-if="conf.type === 'RadioGroup'">
      <RadioGroup v-model="modelValue" class="ims-radio" v-bind="itemProps">
        <Radio
          v-for="item in conf.data"
          :key="item.value"
          :label="item.value"
        >
          {{ item.label }}
        </Radio>
      </RadioGroup>
    </template>
    <!-- <template v-if="conf.type === 'ImgUpload'">
      <div class="img-upload-mult">
        <ImgUpload
          v-model="modelValue"
          v-bind="itemProps"
          @on-preview="imgPreview"
        />
      </div>
    </template> -->
    <template v-else>
      <component
        :is="conf.type"
        v-model="modelValue"
        :style="style"
        v-bind="itemProps"
      />
    </template>

    <!-- ext.bottom -->
    <Render v-for="(render, index) in bottomRenders" :key="index" :render="render" />
  </FormItem>
</template>

<script>
import { _ } from '@/utils'
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
  computed: {
    modelValue: {
      get () {
        // console.log('v-form-item get', this.value);
        return this.value
      },
      set (v) {
        // console.log('v-form-item set', this.value);
        this.$emit('input', v)
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
        prop: ''
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
        formItemProps.prop = v.field

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
    imgPreview (src) {
      this.$mainStore.commit('imgPreview/showImgPreview', { src })
    },
    onFormChange (v) {
      this.$emit('on-form-change', this.conf.field, v)
    }
  }
}
</script>

<style>

</style>
