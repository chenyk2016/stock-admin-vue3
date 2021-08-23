/*
 * @Author: 鹿鸣
 * @Date: 2020-12-21 17:06:08
 * @LastEditTime: 2020-12-22 20:29:58
 * @LastEditors: 鹿鸣
 * @Description: vue render函数
 *
 * props.render(h, { vm, ...attrs })
 * * h: render函数
 * * vm: 当前vue实例
 * * attrs: 组件的其他props参数
 * *
 */

export default {
  name: 'RenderCell',
  props: {
    render: Function
  },
  render(h) {
    return this.render(h, { vm: this, ...this.$attrs })
  }
};
