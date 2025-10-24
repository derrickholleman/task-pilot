import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList,
  ElementRef,
  AfterViewChecked,
} from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { Todo } from '../../services/todo-storage.service'
import { CheckmarkIconComponent } from '../icons/checkmark-icon.component'
import { XIconComponent } from '../icons/x-icon.component'
import { PencilIconComponent } from '../icons/pencil-icon.component'
import { IconButtonComponent } from '../shared/icon-button.component'

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CheckmarkIconComponent,
    XIconComponent,
    PencilIconComponent,
    IconButtonComponent,
  ],
  templateUrl: './todo-list.component.html',
})
export class TodoListComponent implements AfterViewChecked {
  @Input() todos: Todo[] = []
  @Output() deleteTodo = new EventEmitter<string>()
  @Output() toggleTodo = new EventEmitter<string>()
  @Output() updateTodo = new EventEmitter<{ id: string; text: string }>()
  @ViewChildren('editInput') editInputs!: QueryList<ElementRef<HTMLInputElement>>

  editingTodoId: string | null = null
  editingText = ''
  private shouldFocus = false

  ngAfterViewChecked(): void {
    if (this.shouldFocus && this.editInputs.length > 0) {
      this.editInputs.first.nativeElement.focus()
      this.shouldFocus = false
    }
  }

  onDeleteTodo(id: string): void {
    this.deleteTodo.emit(id)
  }

  onToggleTodo(id: string): void {
    this.toggleTodo.emit(id)
  }

  onEditTodo(todo: Todo): void {
    this.editingTodoId = todo.id
    this.editingText = todo.text
    this.shouldFocus = true
  }

  onSaveTodo(): void {
    if (this.editingTodoId && this.editingText.trim()) {
      this.updateTodo.emit({ id: this.editingTodoId, text: this.editingText.trim() })
      this.editingTodoId = null
      this.editingText = ''
    }
  }

  onCancelEdit(): void {
    this.editingTodoId = null
    this.editingText = ''
  }

  isEditing(id: string): boolean {
    return this.editingTodoId === id
  }
}
