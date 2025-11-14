import {
  Component,
  input,
  output,
  viewChild,
  ElementRef,
  signal,
  effect,
  ChangeDetectionStrategy,
} from '@angular/core'
import { Todo } from '@services/todo-storage.service'
import { CheckmarkIconComponent } from '@components/icons/checkmark-icon.component'
import { XIconComponent } from '@components/icons/x-icon.component'
import { PencilIconComponent } from '@components/icons/pencil-icon.component'
import { IconButtonComponent } from '@components/shared/icon-button/icon-button.component'
import { DragDropHelper } from './drag-drop.helper'
import { handleFormatDate } from '@utils/date.util'

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CheckmarkIconComponent, XIconComponent, PencilIconComponent, IconButtonComponent],
  templateUrl: './todo-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoListComponent {
  todos = input<Todo[]>([])
  emptyMessage = input<string | null>('No todos yet. Add one to get started!')
  deleteTodo = output<string>()
  toggleTodo = output<string>()
  updateTodo = output<{ id: string; text: string }>()
  reorderTodo = output<{ fromIndex: number; toIndex: number }>()
  editInput = viewChild<ElementRef<HTMLInputElement>>('editInput')

  editingTodoId = signal<string | null>(null)
  editingText = signal('')
  private shouldFocus = signal(false)
  dragDropHelper = new DragDropHelper()

  constructor() {
    effect(() => {
      if (this.shouldFocus() && this.editInput()) {
        this.editInput()!.nativeElement.focus()
        this.shouldFocus.set(false)
      }
    })
  }

  onDeleteTodo(id: string): void {
    this.deleteTodo.emit(id)
  }

  onToggleTodo(id: string): void {
    this.toggleTodo.emit(id)
  }

  onEditTodo(todo: Todo): void {
    this.editingTodoId.set(todo.id)
    this.editingText.set(todo.text)
    this.shouldFocus.set(true)
  }

  onEditInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value
    this.editingText.set(value)
  }

  onSaveTodo(): void {
    const todoId = this.editingTodoId()
    const text = this.editingText()
    if (todoId && text.trim()) {
      this.updateTodo.emit({ id: todoId, text: text.trim() })
      this.editingTodoId.set(null)
      this.editingText.set('')
    }
  }

  onCancelEdit(): void {
    this.editingTodoId.set(null)
    this.editingText.set('')
  }

  isEditing(id: string): boolean {
    return this.editingTodoId() === id
  }

  onDragStart(event: DragEvent, index: number): void {
    this.dragDropHelper.onDragStart(event, index)
  }

  onDragOver(event: DragEvent, index: number): void {
    this.dragDropHelper.onDragOver(event, index)
  }

  onDragLeave(): void {
    this.dragDropHelper.onDragLeave()
  }

  onDrop(event: DragEvent, dropIndex: number): void {
    const result = this.dragDropHelper.onDrop(event, dropIndex)
    if (result) {
      this.reorderTodo.emit(result)
    }
  }

  onDragEnd(): void {
    this.dragDropHelper.onDragEnd()
  }

  isDragging(index: number): boolean {
    return this.dragDropHelper.isDragging(index)
  }

  isDragOver(index: number): boolean {
    return this.dragDropHelper.isDragOver(index)
  }

  formatDate(timestamp: number): string {
    return handleFormatDate(timestamp)
  }
}
