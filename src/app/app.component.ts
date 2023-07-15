import { Component, HostListener, OnInit, DestroyRef } from '@angular/core';
import { fadeInOut } from './animations/fade-in-out.animation';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';
import { Background, backgroundMap } from './models/background';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeInOut('0.3s ease-in', '0.3s ease-out', true)],
})
export class AppComponent implements OnInit {
  hasInteracted: boolean = false;

  canvasWidth: number = window.innerWidth > 0 ? window.innerWidth : screen.width;
  canvasHeight: number = window.innerHeight > 0 ? window.innerHeight : screen.height;

  @HostListener('window:resize')
  onResize() {
    this.updateCanvasSize();
  }

  @HostListener('window:orientationchange')
  onOrientationChange() {
    this.updateCanvasSize();
  }

  constructor(private store: Store, private destroyRef: DestroyRef) { }

  ngOnInit(): void {
    this.updateCanvasSize();

    const destroyed = new Subject();

    this.destroyRef.onDestroy(() => {
      destroyed.next(null);
      destroyed.complete();
    });

    this.store.select(state => state.app.background)
      .pipe(takeUntil(destroyed))
      .subscribe((background: Background) => {
        if (!background)
          return;
        console.log('background', background);
        const url = backgroundMap[background];
        document.documentElement.style.backgroundImage = `url(${url})`;
      });
  }

  onInteract(): void {
    this.hasInteracted = true;
  }

  private updateCanvasSize(): void {
    this.canvasWidth = window.innerWidth > 0 ? window.innerWidth : screen.width;
    this.canvasHeight = ((window.innerHeight > 0 ? window.innerHeight : screen.height));
  }
}
