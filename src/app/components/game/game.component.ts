import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy,
  NgZone,
  ChangeDetectorRef,
  HostListener,
  Input,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { fadeInOut } from '../../animations/fade-in-out.animation';
import { AppState } from '../../states/app.state';
import { Player } from '../../models/player';
import { Obstacle } from '../../models/obstacle';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeInOut('0.5s ease-in', '0.5s ease-out', true)],
})
export class GameComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  @Input() canvasWidth: number = window.innerWidth > 0 ? window.innerWidth : screen.width;
  @Input() canvasHeight: number = window.innerHeight > 0 ? window.innerHeight : screen.height;

  @Select(AppState.getLevelSeed) levelSeed$!: Observable<number>;

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.code !== 'Space') return;
    this.playerJump();
  }

  private ctx: CanvasRenderingContext2D | null = null;
  private animationFrameTimeStamp?: DOMHighResTimeStamp;

  private readonly player: Player = new Player();
  private readonly obstacle: Obstacle = new Obstacle();

  private readonly backgroundBottomPadding: number = 15;
  private readonly gameTickInterval: number = 1000 / 60;

  private obstaclePattern: CanvasPattern | string = 'black';

  score: number = 0;
  gameOver!: boolean;
  gameStarted!: boolean;
  isSettingsVisible: boolean = false;

  constructor(
    protected ngZone: NgZone,
    protected changeDetector: ChangeDetectorRef,
    protected store: Store,
  ) {
    this.draw = this.draw.bind(this);
  }

  ngOnChanges({ canvasWidth, canvasHeight }: SimpleChanges): void {
    if (this.gameStarted || canvasWidth?.isFirstChange() || canvasHeight?.isFirstChange()) return;
    if (canvasWidth?.currentValue || canvasHeight?.currentValue) {
      // Trigger change detection to update the view since the
      // initialize() method relies on the canvasWidth and canvasHeight
      this.changeDetector.detectChanges();
      this.initialize();
    }
  }

  ngAfterViewInit(): void {
    // Initialize the game
    this.initialize();
    // Start the game loop
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.gameLoop();
      }, this.gameTickInterval);
    });
  }

  ngOnInit(): void {
    // Get the canvas context
    this.ctx = this.canvas.nativeElement.getContext('2d', { alpha: true });
    if (!this.ctx) return;
    // Get the obstacle texture image
    this.obstacle.model.onload = () => {
      this.obstaclePattern = this.ctx!.createPattern(this.obstacle.model, 'repeat-y') ?? 'black';
    };
  }

  private gameLoop(): void {
    // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
    // Tell the browser to perform an animation right before the next repaint
    requestAnimationFrame(this.draw);
    // Check if the game has started
    if (this.gameStarted) {
      // Update the game state
      this.updateGameState();
    }
  }

  private initialize(): void {
    const element = this.canvas.nativeElement;
    // Reset player position, player/obstacle velocity and obstacle gap size
    this.player.reset(element.width, element.height);
    this.obstacle.reset(element.width, element.height);
    // Reset the score before spawning the first obstacle to
    // avoid a different world seed generation on the second game start
    this.score = 0;
    // Spawn the first obstacle
    this.spawnObstacle();
    // Reset the game-over/game-started flags
    this.gameStarted = false;
    this.gameOver = false;
    if (!NgZone.isInAngularZone())
      // Trigger change detection to update the view
      this.changeDetector.detectChanges();
  }

  private updateGameState(): void {
    if (this.gameOver) return;
    const element = this.canvas.nativeElement;
    // Update player position
    this.player.currentVelocity.y += this.player.gravity;
    this.player.position.y += this.player.currentVelocity.y;
    // Update obstacle position
    this.obstacle.position.x += this.obstacle.currentVelocity.x;
    // Check for collisions
    if (this.player.position.y >= element.height - (this.backgroundBottomPadding + this.player.height)) {
      this.gameOver = true;
      // Trigger change detection to update the view
      this.changeDetector.detectChanges();
      // Return to avoid a score increment
      return;
    }
    if (
      this.obstacle.position.x < this.player.position.x + this.player.width &&
      this.obstacle.position.x + this.obstacle.width > this.player.position.x
    ) {
      if (
        this.player.position.y < this.obstacle.position.y ||
        this.player.position.y + this.player.height > this.obstacle.position.y + this.obstacle.currentGapSize
      ) {
        this.gameOver = true;
        // Trigger change detection to update the view
        this.changeDetector.detectChanges();
        // Return to avoid a score increment
        return;
      }
    }
    // Check if the player passed the obstacle
    if (this.obstacle.position.x + this.obstacle.width < this.player.position.x && !this.obstacle.passed) {
      this.score += 1;
      // Trigger change detection to update the view
      this.changeDetector.detectChanges();
      // Set the obstacle.passed flag to avoid multiple score increments
      this.obstacle.passed = true;
      // Increase obstacle speed every X points by this.obstacle.velocityIncreaseValue * this.score
      if (this.score % this.obstacle.velocityIncreaseInterval === 0 && this.score > 0)
        this.obstacle.currentVelocity.x -= this.obstacle.velocityIncreaseValue * this.score;
      // Decrease obstacle gap size every X points by this.obstacleGapSizeDecreaseValue
      if (
        this.score % this.obstacle.gapSizeDecreaseInterval === 0 &&
        this.score > 0 &&
        this.obstacle.currentGapSize >= this.player.height * 2
      )
        this.obstacle.currentGapSize -= this.obstacle.gapSizeDecreaseValue
    }
    // Spawn new obstacle
    if (this.obstacle.position.x < -this.obstacle.width) this.spawnObstacle();
  }

  private draw(timeStamp: DOMHighResTimeStamp): void {
    if (!this.ctx) return;
    // Don't draw if the elapsed time is less than the game tick interval
    if (
      this.animationFrameTimeStamp &&
      timeStamp - this.animationFrameTimeStamp <= this.gameTickInterval
    )
      return;
    // Draw the game components. We'll draw the background via CSS to improve performance.
    const element = this.canvas.nativeElement;
    // Use CanvasRenderingContext2D's `clearRect` method to clear the canvas instead of filling it with a solid color.
    // This can improve performance by reducing the amount of work the browser has to do to clear the canvas.
    this.ctx.clearRect(0, 0, element.width, element.height);
    // Draw the obstacle
    this.obstacle.draw(this.ctx, this.obstaclePattern, element.height);
    // Draw the player
    this.player.draw(this.ctx);
    // Save the current timestamp    
    this.animationFrameTimeStamp = timeStamp;
  }

  private spawnObstacle(): void {
    const element = this.canvas.nativeElement;
    this.obstacle.next(element.width, element.height, this.store.selectSnapshot(AppState.getLevelSeed), this.score);
  }

  playerJump(): void {
    // Start the game if not started yet
    if (!this.gameStarted) this.gameStarted = true;
    // Don't jump if game is over
    if (this.gameOver) return;
    // Jump
    this.player.currentVelocity.y = this.player.velocity.y;
  }

  showSettings(): void {
    this.isSettingsVisible = true;
    // Trigger change detection to update the view
    this.changeDetector.detectChanges();
  }

  onOverlayVisibilityChange(isVisible: boolean): void {
    if (isVisible) return;
    // Initialize the game if overlay were visible
    this.initialize();
  }
}
