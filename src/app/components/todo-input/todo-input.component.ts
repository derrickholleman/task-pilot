import { Component, EventEmitter, Output } from '@angular/core'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-todo-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-input.component.html',
})
export class TodoInputComponent {
  @Output() addTodo = new EventEmitter<string>()
  todoText = ''

  onAddTodo(): void {
    if (this.todoText.trim()) {
      this.addTodo.emit(this.todoText.trim())
      this.todoText = ''
    }
  }
}
