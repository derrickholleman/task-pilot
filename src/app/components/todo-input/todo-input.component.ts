import { Component, output, signal, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'app-todo-input',
  standalone: true,
  imports: [],
  templateUrl: './todo-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoInputComponent {
  addTodo = output<string>()
  todoText = signal('')

  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value
    this.todoText.set(value)
  }

  onSubmitTodo(): void {
    const text = this.todoText()
    if (text.trim()) {
      this.addTodo.emit(text.trim())
      this.todoText.set('')
    }
  }
}
