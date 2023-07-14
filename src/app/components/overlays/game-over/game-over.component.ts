import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { fadeInOut } from '../../../animations/fade-in-out.animation';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInOut('0.5s ease-in', '0.5s ease-out', true)],
})
export class GameOverComponent {
  @Input() score!: number;
  @Input() visible: boolean = false;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();

  animationDone: boolean = false;

  toogleVisibility(): void {
    this.visible = !this.visible;
    this.visibleChange.emit(this.visible);
  }

  toggleAnimationDone(): void {
    this.animationDone = !this.animationDone;
  }
}
