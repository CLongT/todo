// 定义 Todo 类型接口
interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt?: string;
}

const API_BASE_URL = 'http://localhost:8080/api/todos';

// 统一的错误处理
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

// 获取所有待办事项
async function fetchTodosAPI(): Promise<Todo[]> {
  try {
    const response = await fetch(API_BASE_URL);
    return await handleResponse<Todo[]>(response);
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
}

// 添加新待办事项
async function addTodoAPI(title: string): Promise<Todo> {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, completed: false }),
    });
    return await handleResponse<Todo>(response);
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
}

// 切换待办事项状态
async function toggleTodoAPI(id: number): Promise<Todo> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}/toggle`, {
      method: 'PATCH',
    });
    return await handleResponse<Todo>(response);
  } catch (error) {
    console.error('Error toggling todo:', error);
    throw error;
  }
}

// 删除待办事项
async function deleteTodoAPI(id: number): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to delete todo');
    }

    // DELETE 请求可能不返回内容
    return;
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
}

// 更新待办事项标题
async function updateTodoTitleAPI(id: number, title: string): Promise<Todo> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });
    return await handleResponse<Todo>(response);
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
}

export {
  fetchTodosAPI,
  addTodoAPI,
  toggleTodoAPI,
  deleteTodoAPI,
  updateTodoTitleAPI
};
export type { Todo };
