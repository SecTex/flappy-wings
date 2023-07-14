import { Vec2D } from "./vec2d";

export class Obstacle {
    model!: HTMLImageElement;
    position: Vec2D = { x: 0, y: 0 };
    currentVelocity: Vec2D = { x: 0, y: 0 };
    currentGapSize: number = 0;
    passed: boolean = false;

    readonly defaultVelocity: Vec2D = { x: -7, y: 0 };
    readonly velocityIncreaseInterval: number = 2;
    readonly velocityIncreaseValue: number = 0.01;
    readonly width: number = 50;
    readonly padding: number = 50;
    readonly gapSize: number = 125;
    readonly gapSizeDecreaseInterval: number = 125;
    readonly gapSizeDecreaseValue: number = 125;

    constructor() {
        this.model = new Image();
        this.model.src = 'assets/images/wood-texture.png';
    }

    reset(screenWidth: number, screenHeight: number): void {
        const difficulty = this.calculateDifficulty(screenWidth, screenHeight);

        this.currentGapSize = this.gapSize * difficulty;
        this.currentVelocity.x = this.defaultVelocity.x;
    }

    next(screenWidth: number, screenHeight: number, levelSeed: number, score: number): void {
        // Generate random gap position based on levelSeed
        const gapPosition = Number(
            ((BigInt(levelSeed) + BigInt(score)) * BigInt(100)) % BigInt(screenHeight - 150),
        );

        // Adjust gap position if too close to top or bottom of canvas
        if (gapPosition - this.currentGapSize < this.padding) {
            this.position.y = this.padding;
        } else if (gapPosition - this.currentGapSize > screenHeight - this.padding) {
            this.position.y = screenHeight - this.padding;
        } else {
            this.position.y = gapPosition;
        }
        // Set obstacle position
        this.position.x = screenWidth;
        // Reset obstacle score flag
        this.passed = false;
    }

    draw(ctx: CanvasRenderingContext2D, pattern: CanvasPattern | string, screenHeight: number): void {
        ctx.save();
        ctx.shadowColor = '#000000';
        ctx.shadowOffsetX = 0;
        // Create a pattern fill using the obstacle texture image
        ctx.fillStyle = pattern;
        // Adjust the position of the pattern fill based on the position of the obstacle
        const patternX = this.position.x - this.width / 2;
        const patternY = 0;
        ctx.translate(patternX, patternY);
        ctx.strokeStyle = '#4a322e';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, this.width, this.position.y);
        ctx.strokeRect(0, this.position.y + this.currentGapSize, this.width, screenHeight - this.position.y - this.gapSize);
        ctx.fillRect(0, 0, this.width, this.position.y);
        ctx.fillRect(0, this.position.y + this.currentGapSize, this.width, screenHeight - this.position.y - this.gapSize);
        ctx.translate(-patternX, -patternY);
        ctx.restore();
    }

    private calculateDifficulty(screenWidth: number, screenHeight: number): number {
        const aspectRatio = screenWidth / screenHeight;
        return aspectRatio % 2 <= 1 ? 1 : aspectRatio;
    }
}