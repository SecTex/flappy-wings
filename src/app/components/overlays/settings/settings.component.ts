import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { fadeInOut } from '../../../animations/fade-in-out.animation';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../states/app.state';
import { SetLevelSeed } from '../../../actions/actions';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInOut('0.5s ease-in', '0.5s ease-out', true)],
})
export class SettingsComponent {
  @ViewChild('levelSeedElement', { static: false })
  levelSeedElement!: ElementRef<HTMLInputElement>;
  @Select(AppState.getLevelSeed) levelSeed$!: Observable<number>;

  @Input() visible: boolean = false;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();

  animationDone: boolean = false;

  constructor(protected store: Store) { }

  toogleVisibility(): void {
    this.visible = !this.visible;
    this.visibleChange.emit(this.visible);
  }

  randomizeLevelSeed(): void {
    const levelSeed = Math.floor(Math.random() * Number.MAX_VALUE - 1) + 1;
    this.changeLevelSeed(levelSeed);
  }

  onLevelSeedChange(event: Event | null): void {
    if (!event)
      return;
    this.changeLevelSeed(Number((event.target as HTMLInputElement).value));
  }

  copyToClipboard(): void {
    if (!this.levelSeedElement?.nativeElement) {
      return;
    }
    this.levelSeedElement.nativeElement.select();
    document.execCommand('copy');
    this.levelSeedElement.nativeElement.blur();
  }

  toggleAnimationDone(): void {
    this.animationDone = !this.animationDone;
  }

  private changeLevelSeed(value: number): void {
    this.store.dispatch(new SetLevelSeed(value));
  }
}
