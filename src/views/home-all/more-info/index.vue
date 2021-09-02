<template>
  <a-popover title="Title" trigger="click" placement="rightBottom">
    <template #content>
      <div class="home-more-info-pop">
        <VForm v-model:value="form" :rules="rules" :label-width="100" />
      </div>
    </template>
    <slot />
  </a-popover>
</template>

<script>
import { VForm } from 'components/cc/v-form'
import { formRulesMore } from '../config'

export default {
  components: { VForm },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    form: {
      get () {
        return this.data
      },
      set (v) {
        this.$emit('update:value', v)
      }
    }
  },
  data () {
    return {
      rules: formRulesMore
    }
  },
  created () {

  },
  methods: {

  }
}
</script>

<style>
.home-more-info-pop{
  min-width: 600px;
  max-height: 600px;
  overflow-y: auto;
}
</style>
