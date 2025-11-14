import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core'
import { TodoInputComponent } from '@components/todo-input/todo-input.component'
import { TodoListComponent } from '@components/todo-list/todo-list.component'
import { TabComponent } from '@components/shared/tab/tab.component'
import { TodoStorageService, Todo } from '@services/todo-storage.service'

export enum TodoFilter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

@Component({
  selector: 'app-root',
  imports: [TodoInputComponent, TodoListComponent, TabComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  readonly title = 'TaskPilot'
  TodoFilter = TodoFilter // Expose enum to template
  private todoStorage = inject(TodoStorageService)
  private readonly FILTER_STORAGE_KEY = 'taskpilot-selected-filter'

  todos = signal<Todo[]>([])
  selectedFilter = signal<TodoFilter>(this.loadSelectedFilter())

  filteredTodos = computed(() => {
    const filter = this.selectedFilter()
    const allTodos = this.todos()
    switch (filter) {
      case TodoFilter.Active:
        return allTodos.filter((todo) => !todo.isCompleted)
      case TodoFilter.Completed:
        return allTodos.filter((todo) => todo.isCompleted)
      default:
        return allTodos
    }
  })

  activeTodosCount = computed(() => {
    return this.todos().filter((todo) => !todo.isCompleted).length
  })

  constructor() {
    this.todos.set(this.todoStorage.getTodos())
  }

  private loadSelectedFilter(): TodoFilter {
    const savedFilter = localStorage.getItem(this.FILTER_STORAGE_KEY)
    if (savedFilter && Object.values(TodoFilter).includes(savedFilter as TodoFilter)) {
      return savedFilter as TodoFilter
    }
    return TodoFilter.All
  }

  setFilter(filter: TodoFilter): void {
    this.selectedFilter.set(filter)
    localStorage.setItem(this.FILTER_STORAGE_KEY, filter)
  }

  createTodo(text: string): void {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      isCompleted: false,
      createdAt: Date.now(),
    }
    const updatedTodos = [...this.todos(), newTodo]
    this.todos.set(updatedTodos)
    this.todoStorage.saveTodos(updatedTodos)
  }

  onDeleteTodo(id: string): void {
    const updatedTodos = this.todoStorage.deleteTodo(id)
    this.todos.set(updatedTodos)
  }

  onToggleTodo(id: string): void {
    const updatedTodos = this.todoStorage.toggleCompletion(id)
    this.todos.set(updatedTodos)
  }

  onUpdateTodo(event: { id: string; text: string }): void {
    const updatedTodos = this.todoStorage.updateTodo(event.id, event.text)
    this.todos.set(updatedTodos)
  }

  onDeleteAllCompleted(): void {
    const updatedTodos = this.todoStorage.deleteAllCompleted()
    this.todos.set(updatedTodos)
  }

  onReorderTodo(event: { fromIndex: number; toIndex: number }): void {
    const updatedTodos = this.todoStorage.reorderTodos(event.fromIndex, event.toIndex)
    this.todos.set(updatedTodos)
  }
}
