import { Component, input, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [],
  templateUrl: './tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex-1',
  },
})
export class TabComponent {
  isActive = input(false)
}
