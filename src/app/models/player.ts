import { Vec2D } from "./vec2d";

export class Player {
    model!: HTMLImageElement;
    position: Vec2D = { x: 0, y: 0 };
    currentVelocity: Vec2D = { x: 0, y: 0 };
    velocity: Vec2D = { x: 0, y: -1 };

    readonly defaultVelocity: Vec2D = { x: 0, y: -4.5 };
    readonly gravity: number = 0.4;
    readonly width: number = 30;
    readonly height: number = 30;

    constructor() {
        this.model = new Image(this.width, this.height);
        this.model.src = 'assets/images/player-model.png';
    }

    reset(screenWidth: number, screenHeight: number): void {
        const difficulty = this.calculateDifficulty(screenWidth, screenHeight);

        this.position.x = screenWidth / 2 - this.width / 2;
        this.position.y = screenHeight / 2 - this.height / 2;
        this.velocity.y = this.defaultVelocity.y * difficulty;
        this.currentVelocity.y = 0;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.currentVelocity.y / 10);
        ctx.drawImage(this.model, 0, 0, this.width, this.height);
        ctx.restore();
    }

    private calculateDifficulty(screenWidth: number, screenHeight: number): number {
        // const aspectRatio = screenWidth / screenHeight;
        // return aspectRatio % 2 <= 1 ? 1 : aspectRatio;
        return 1;
    }
}
