import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComponent {
  @Input() type: 'normal' | 'is-primary' | 'is-success' | 'is-warning' | 'is-error' = 'normal';
  @Input() disabled: boolean = false;
}
