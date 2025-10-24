import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'

type ColorVariant = 'blue' | 'red' | 'green' | 'gray'

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button (click)="clicked.emit()" [class]="getButtonClasses()" [attr.aria-label]="ariaLabel">
      <ng-content></ng-content>
    </button>
  `,
})
export class IconButtonComponent {
  @Input() variant: ColorVariant = 'gray'
  @Input() ariaLabel = ''
  @Output() clicked = new EventEmitter<void>()

  private readonly baseClasses = 'p-2 rounded-lg cursor-pointer transition-colors'

  private readonly variantClasses: Record<ColorVariant, string> = {
    blue: 'text-blue-500 hover:text-blue-700 hover:bg-blue-50',
    red: 'text-red-500 hover:text-red-700 hover:bg-red-50',
    green: 'text-green-600 hover:text-green-700 hover:bg-green-50',
    gray: 'text-gray-500 hover:text-gray-700 hover:bg-gray-50',
  }

  getButtonClasses(): string {
    return `${this.baseClasses} ${this.variantClasses[this.variant]}`
  }
}
