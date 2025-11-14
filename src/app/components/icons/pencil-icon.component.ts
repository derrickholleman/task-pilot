import { Component, ChangeDetectionStrategy } from '@angular/core'

@Component({
  selector: 'app-pencil-icon',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
      class="w-5 h-5"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M16.862 3.487a2.25 2.25 0 0 1 3.182 3.182L7.125 19.588a4.5 4.5 0 0 1-1.897 1.13L2 21.75l1.032-3.228a4.5 4.5 0 0 1 1.13-1.897L16.862 3.487Z"
      />
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PencilIconComponent {}
