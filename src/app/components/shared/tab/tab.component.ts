import { Component, Input, HostBinding } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab.component.html',
})
export class TabComponent {
  @Input() isActive = false
  @HostBinding('class') hostClass = 'flex-1'
}
