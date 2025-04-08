<template>
  <div class="button-container mt-3">
    <div class="btn-group">
      <button
        type="button"
        class="btn"
        :class="active === 0 ? 'btn-primary' : 'btn-secondary'"
        @click="onBtnClick(0)"
      >
        全部
      </button>
      <button
        type="button"
        class="btn"
        :class="active === 1 ? 'btn-primary' : 'btn-secondary'"
        @click="onBtnClick(1)"
      >
        已完成
      </button>
      <button
        type="button"
        class="btn"
        :class="active === 2 ? 'btn-primary' : 'btn-secondary'"
        @click="onBtnClick(2)"
      >
        未完成
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TodoButton',
  // 声明和 v-model 相关的自定义事件
  emits: ['update:active'],
  props: {
    // 激活项的索引值
    active: {
      type: Number,
      required: true,
      // 默认激活索引值为 0 的按钮（全部：0，已完成：1，未完成：2）
      default: 0,
    },
  },
  methods: {
    // 按钮的点击事件处理函数
    onBtnClick(index) {
      // 1. 如果当前点击的按钮的索引值，等于 props 传递过来的索引值，则没必要触发update:active 自定义事件
      if (index === this.active) return
      // 2. 通过 this.$emit() 方法触发自定义事件
      this.$emit('update:active', index)
    },
  },
}
</script>
<style lang="less" scoped>
.button-container {
  // 添加固定宽度
  width: 400px;
  // 文本居中效果
  text-align: center;
}
</style>
