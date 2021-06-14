export default class SpaceShip<T extends HTMLElement> {
    constructor(
        protected canvas: T,
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