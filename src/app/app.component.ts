import { Component, HostListener } from '@angular/core';
import { fadeInOut } from './animations/fade-in-out.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fadeInOut('0.3s ease-in', '0.3s ease-out', true)],
})
export class AppComponent {
  hasInteracted: boolean = false;

  canvasWidth: number = window.innerWidth > 0 ? window.innerWidth : screen.width;
  canvasHeight: number = window.innerHeight > 0 ? window.innerHeight : screen.height;

  @HostListener('window:resize')
  onResize() {
    this.canvasWidth = window.innerWidth > 0 ? window.innerWidth : screen.width;
    this.canvasHeight = window.innerHeight > 0 ? window.innerHeight : screen.height;
  }

  onInteract(): void {
    this.hasInteracted = true;
  }
}
