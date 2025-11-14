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
import { IconButtonComponent } from '../shared/icon-button/icon-button.component'
import { DragDropHelper } from './drag-drop.helper'
import { handleFormatDate } from '../../utils/date.util'

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
  @Input() emptyMessage: string | null = 'No todos yet. Add one to get started!'
  @Output() deleteTodo = new EventEmitter<string>()
  @Output() toggleTodo = new EventEmitter<string>()
  @Output() updateTodo = new EventEmitter<{ id: string; text: string }>()
  @Output() reorderTodo = new EventEmitter<{ fromIndex: number; toIndex: number }>()
  @ViewChildren('editInput') editInputs!: QueryList<ElementRef<HTMLInputElement>>

  editingTodoId: string | null = null
  editingText = ''
  private shouldFocus = false
  dragDropHelper = new DragDropHelper()

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
