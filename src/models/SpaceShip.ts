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
    draw(): void {
        throw new Error("Method draw not implemented.");
    }
}