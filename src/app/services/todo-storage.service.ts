import { Injectable } from '@angular/core'

export interface Todo {
  id: string
  text: string
  isCompleted: boolean
}

@Injectable({
  providedIn: 'root',
})
export class TodoStorageService {
  private readonly STORAGE_KEY = 'taskpilot-todos'

  getTodos(): Todo[] {
    const todosJson = localStorage.getItem(this.STORAGE_KEY)
    if (!todosJson) {
      return []
    }
    try {
      return JSON.parse(todosJson)
    } catch {
      return []
    }
  }

  saveTodos(todos: Todo[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos))
  }

  deleteTodo(id: string): Todo[] {
    const todos = this.getTodos()
    const updatedTodos = todos.filter((todo) => todo.id !== id)
    this.saveTodos(updatedTodos)
    return updatedTodos
  }

  toggleCompletion(id: string): Todo[] {
    const todos = this.getTodos()
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
    )
    this.saveTodos(updatedTodos)
    return updatedTodos
  }

  updateTodo(id: string, text: string): Todo[] {
    const todos = this.getTodos()
    const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    this.saveTodos(updatedTodos)
    return updatedTodos
  }
}
