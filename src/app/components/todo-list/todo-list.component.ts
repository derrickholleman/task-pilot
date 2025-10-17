import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Todo } from '../../services/todo-storage.service'

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent {
  @Input() todos: Todo[] = []
  @Output() deleteTodo = new EventEmitter<string>()

  onDeleteTodo(id: string): void {
    this.deleteTodo.emit(id)
  }
}
