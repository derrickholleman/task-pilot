import { Component, input, output, computed, ChangeDetectionStrategy } from '@angular/core'

type ColorVariant = 'blue' | 'red' | 'green' | 'gray'

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [],
  template: `
    <button (click)="clicked.emit()" [class]="buttonClasses()" [attr.aria-label]="ariaLabel()">
      <ng-content></ng-content>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconButtonComponent {
  variant = input<ColorVariant>('gray')
  ariaLabel = input('')
  clicked = output<void>()

  private readonly baseClasses = 'p-2 rounded-lg cursor-pointer transition-colors'

  private readonly variantClasses: Record<ColorVariant, string> = {
    blue: 'text-blue-500 hover:text-blue-700 hover:bg-blue-50',
    red: 'text-red-500 hover:text-red-700 hover:bg-red-50',
    green: 'text-green-600 hover:text-green-700 hover:bg-green-50',
    gray: 'text-gray-500 hover:text-gray-700 hover:bg-gray-50',
  }

  buttonClasses = computed(() => {
    return `${this.baseClasses} ${this.variantClasses[this.variant()]}`
  })
}
