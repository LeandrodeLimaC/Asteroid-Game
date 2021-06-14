export default class SpaceShip {
    constructor(
        protected canvas: HTMLElement,
        protected yPosition: number = 0,
        protected xPosition: number = 0,
    ) { }

    update(): void {
        throw new Error("Method update not implemented.");
    }
    draw(): void {
        throw new Error("Method not implemented.");
    }
}