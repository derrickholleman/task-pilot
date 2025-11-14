export class DragDropHelper {
  private draggedIndex: number | null = null
  private dragOverIndex: number | null = null

  onDragStart(event: DragEvent, index: number): void {
    this.draggedIndex = index
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('text/html', '')
    }
  }

  onDragOver(event: DragEvent, index: number): void {
    event.preventDefault()
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move'
    }
    this.dragOverIndex = index
  }

  onDragLeave(): void {
    this.dragOverIndex = null
  }

  onDrop(event: DragEvent, dropIndex: number): { fromIndex: number; toIndex: number } | null {
    event.preventDefault()
    if (this.draggedIndex !== null && this.draggedIndex !== dropIndex) {
      const result = { fromIndex: this.draggedIndex, toIndex: dropIndex }
      this.reset()
      return result
    }
    this.reset()
    return null
  }

  onDragEnd(): void {
    this.reset()
  }

  isDragging(index: number): boolean {
    return this.draggedIndex === index
  }

  isDragOver(index: number): boolean {
    return this.dragOverIndex === index && this.draggedIndex !== index
  }

  private reset(): void {
    this.draggedIndex = null
    this.dragOverIndex = null
  }
}
