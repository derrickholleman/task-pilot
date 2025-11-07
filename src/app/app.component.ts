import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TodoInputComponent } from './components/todo-input/todo-input.component'
import { TodoListComponent } from './components/todo-list/todo-list.component'
import { TabComponent } from './components/shared/tab/tab.component'
import { TodoStorageService, Todo } from './services/todo-storage.service'

export enum TodoFilter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

@Component({
  selector: 'app-root',
  imports: [CommonModule, TodoInputComponent, TodoListComponent, TabComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'TaskPilot'
  todos: Todo[] = []
  selectedFilter: TodoFilter = TodoFilter.All
  TodoFilter = TodoFilter // Expose enum to template
  private todoStorage = inject(TodoStorageService)

  ngOnInit(): void {
    this.todos = this.todoStorage.getTodos()
  }

  get filteredTodos(): Todo[] {
    switch (this.selectedFilter) {
      case TodoFilter.Active:
        return this.todos.filter((todo) => !todo.isCompleted)
      case TodoFilter.Completed:
        return this.todos.filter((todo) => todo.isCompleted)
      default:
        return this.todos
    }
  }

  setFilter(filter: TodoFilter): void {
    this.selectedFilter = filter
  }

  onAddTodo(text: string): void {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      isCompleted: false,
    }
    this.todos.push(newTodo)
    this.todoStorage.saveTodos(this.todos)
  }

  onDeleteTodo(id: string): void {
    this.todos = this.todoStorage.deleteTodo(id)
  }

  onToggleTodo(id: string): void {
    this.todos = this.todoStorage.toggleCompletion(id)
  }

  onUpdateTodo(event: { id: string; text: string }): void {
    this.todos = this.todoStorage.updateTodo(event.id, event.text)
  }
}
