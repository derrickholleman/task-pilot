import { Component, OnInit, inject } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { TodoInputComponent } from './components/todo-input/todo-input.component'
import { TodoListComponent } from './components/todo-list/todo-list.component'
import { TodoStorageService, Todo } from './services/todo-storage.service'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TodoInputComponent, TodoListComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'TaskPilot'
  todos: Todo[] = []
  private todoStorage = inject(TodoStorageService)

  ngOnInit(): void {
    this.todos = this.todoStorage.getTodos()
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
