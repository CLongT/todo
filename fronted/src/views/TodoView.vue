<template>
  <div class="todo-container">
    <h1 class="todo-title">Todo List</h1>

    <div class="todo-input-group">
      <input
        v-model="newTodo"
        type="text"
        class="todo-input"
        placeholder="Add a new todo..."
        @keyup.enter="addTodo"
      />
      <button class="todo-add-button" @click="addTodo">
        <PlusIcon class="icon" />
      </button>
    </div>

    <div class="todo-filter-group">
      <button
        v-for="btn in filters"
        :key="btn.value"
        class="todo-filter-button"
        :class="{ active: filter === btn.value }"
        @click="filter = btn.value"
      >
        {{ btn.label }}
      </button>
    </div>

    <div class="todo-list">
      <div
        v-for="todo in filteredTodos"
        :key="todo.id"
        class="todo-item"
      >
        <button
          class="todo-check-button"
          :class="{ completed: todo.completed }"
          @click="toggleTodo(todo.id)"
        >
          <CheckIcon class="icon" />
        </button>

        <div class="todo-content">
          <input
            v-if="editingId === todo.id"
            v-model="editText"
            class="todo-edit-input"
            @keyup.enter="saveEdit(todo.id)"
            @blur="saveEdit(todo.id)"
            v-focus
          />
          <span
            v-else
            class="todo-text"
            :class="{ completed: todo.completed }"
          >
            {{ todo.title }}
          </span>
        </div>

        <div class="todo-actions">
          <button
            class="todo-action-button"
            @click="startEditing(todo)"
          >
            <PencilIcon class="icon" />
          </button>
          <button
            class="todo-action-button danger"
            @click="deleteTodo(todo.id)"
          >
            <TrashIcon class="icon" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  CheckIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/vue/24/outline'
import {
  fetchTodosAPI,
  addTodoAPI,
  toggleTodoAPI,
  deleteTodoAPI,
  updateTodoTitleAPI
} from '@/api/todo'

// 类型定义
interface Todo {
  id: number
  title: string
  completed: boolean
}

type Filter = 'all' | 'active' | 'completed'

const filters = [
  { value: 'all' as Filter, label: 'All' },
  { value: 'active' as Filter, label: 'Active' },
  { value: 'completed' as Filter, label: 'Completed' }
]

const todos = ref<Todo[]>([])
const newTodo = ref('')
const filter = ref<Filter>('all')
const editingId = ref<number | null>(null)
const editText = ref('')

const filteredTodos = computed<Todo[]>(() => {
  switch (filter.value) {
    case 'active':
      return todos.value.filter(t => !t.completed)
    case 'completed':
      return todos.value.filter(t => t.completed)
    default:
      return todos.value
  }
})

onMounted(fetchTodos)
async function fetchTodos() {
    const data = await fetchTodosAPI()
    todos.value = Array.isArray(data) ? (data as Todo[]) : []
}

async function addTodo() {
  if (!newTodo.value.trim()) return
    await addTodoAPI(newTodo.value)
    newTodo.value = ''
    await fetchTodos()
    toast.success('Todo added successfully')
}

async function toggleTodo(id: number) {
    await toggleTodoAPI(id)
    await fetchTodos()
}

async function deleteTodo(id: number) {
    await deleteTodoAPI(id)
    await fetchTodos()
    toast.success('Todo deleted successfully')
}

function startEditing(todo: Todo) {
  editingId.value = todo.id
  editText.value = todo.title
}

async function saveEdit(id: number) {
  if (!editText.value.trim()) return
    await updateTodoTitleAPI(id, editText.value)
    editingId.value = null
    await fetchTodos()
    toast.success('Todo updated successfully')
}

// 自定义指令类型
const vFocus = {
  mounted: (el: HTMLElement) => el.focus()
}

// Toast 类型声明
interface Toast {
  error: (msg: string) => void
  success: (msg: string) => void
}

const toast: Toast = {
  error: (msg) => alert(`Error: ${msg}`),
  success: (msg) => alert(`Success: ${msg}`)
}
</script>

<style scoped>
.todo-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.todo-title {
  font-size: 2rem;
  text-align: center;
  color: #2563eb;
  margin-bottom: 2rem;
}

.todo-input-group {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.todo-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
}

.todo-input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
}

.todo-add-button {
  padding: 0.5rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.todo-add-button:hover {
  background-color: #1d4ed8;
}

.todo-filter-group {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.todo-filter-button {
  padding: 0.5rem 1rem;
  background-color: #e5e7eb;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.todo-filter-button.active {
  background-color: #2563eb;
  color: white;
}

.todo-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s;
}

.todo-item:hover {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.todo-check-button {
  display: flex;
  padding: 0.5rem;
  background-color: #e5e7eb;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.2s;
}

.todo-check-button.completed {
  background-color: #22c55e;
  color: white;
}

.todo-content {
  flex: 1;
}

.todo-text {
  &.completed {
    text-decoration: line-through;
    color: #6b7280;
  }
}

.todo-edit-input {
  width: 100%;
  padding: 0.25rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  font-size: 1rem;
}

.todo-actions {
  display: flex;
  gap: 0.5rem;
}

.todo-action-button {
  padding: 0.25rem;
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  transition: color 0.2s;
}

.todo-action-button:hover {
  color: #2563eb;
}

.todo-action-button.danger:hover {
  color: #dc2626;
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
}
</style>
