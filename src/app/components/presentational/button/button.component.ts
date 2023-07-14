import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() title!: string;
  @Input() type: 'normal' | 'is-primary' | 'is-success' | 'is-warning' | 'is-error' = 'normal';
  @Input() disabled: boolean = false;

  @Output() click: EventEmitter<MouseEvent> = new EventEmitter();

  onButtonClick(event: MouseEvent): void {
    event.stopPropagation();
    this.click.emit(event);
  }
}
