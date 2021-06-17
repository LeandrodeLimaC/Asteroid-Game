// Shared types
type Vector = {
    x: number;
    y: number;
};
export class SpaceShip {
    private speed: number = 0.1;
    private velocity: Vector = { x: 0, y: 0 };
    private nosePos: Vector = { x: 0, y: 0 };
    private rotateSpeed = 0.001;
    private movingForward = false;
    private radius: number = 15;

    constructor(
        protected position: Vector,
        public angle: number = 0
    ) { }

    update(): void {
        throw new Error("Method update not implemented.");
    }
    draw(context: CanvasRenderingContext2D): void {
        context.strokeStyle = 'black';
        context.beginPath();

        let vertAngle = ((Math.PI * 2) / 3);

        let radians = this.angle / Math.PI * 180;

        this.nosePos.x = this.position.x - this.radius * Math.cos(radians);
        this.nosePos.y = this.position.y - this.radius * Math.sin(radians);

        for (let i = 0; i < 3; i++) {
            context.lineTo(
                this.nosePos.x - this.radius * Math.cos(vertAngle * i + radians),
                this.nosePos.y - this.radius * Math.sin(vertAngle * i + radians)
            )
        }

        context.closePath();
        context.stroke();
    }
}