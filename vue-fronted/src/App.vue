<template>
  <div>
    <h1>App根组件</h1>
    <hr />
    <!-- 使用 TodoInput 组件 -->
    <!-- 监听 TodoInput 的 add 自定义事件 -->
    <todo-input @add="onAddNewTask"></todo-input>
    <!-- 使用 todo-list 组件 -->
    <todo-list :list="tasklist" class="mt-2"></todo-list>
    <!-- 使用 TodoButton 组件 -->
    <todo-button v-model:active="activeBtnIndex"></todo-button>
  </div>
</template>

<script>
// 导入 TodoList 组件
import TodoList from './components/TodoList.vue'
// 导入 TodoInput 组件
import TodoInput from './components/TodoInput.vue'
// 导入 TodoButton 组件
import TodoButton from './components/TodoButton.vue'
export default {
  name: 'MyApp',
  data() {
    return {
      // 任务列表的数据
      todolist: [
        { id: 1, task: '周一早晨9点开会', done: false },
        { id: 2, task: '周一晚上8点聚餐', done: false },
        { id: 3, task: '准备周三上午的演讲稿', done: true },
      ],
      // 下一个可用的 Id 值
      nextId: 4,
      // 激活的按钮的索引
      activeBtnIndex: 0,
    }
  },
  methods: {
    // TodoInput 组件 add 事件的处理函数
    onAddNewTask(taskname) {
      // TodoInput 组件 add 事件的处理函数
      this.todolist.push({
        id: this.nextId,
        task: taskname,
        done: false, // 完成状态默认为 false
      })
      // 2. 让 nextId 自增+1
      this.nextId++
    },
  },
  // 注册私有组件
  components: {
    TodoList,
    TodoInput,
    TodoButton,
  },
  computed: {
    // 根据激活按钮的索引值，动态计算要展示的列表数据
    tasklist() {
      // 对“源数据”进行 switch...case 的匹配，并返回“计算之后的结果”
      switch (this.activeBtnIndex) {
        case 0: // 全部
          return this.todolist
        case 1: // 已完成
          return this.todolist.filter((x) => x.done)
        case 2: // 未完成
          return this.todolist.filter((x) => !x.done)
      }
    },
  },
}
</script>

<style lang="less" scoped></style>
