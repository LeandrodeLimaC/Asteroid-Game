import { Asteroid } from "../models/Asteroid"
import { SpaceShip } from "../models/SpaceShip"
export class CanvasView {
    private canvas: HTMLCanvasElement
    private context: CanvasRenderingContext2D
    private canvasHeight: number = window.innerHeight
    private canvasWidth: number = window.innerWidth

    constructor(
        public canvasId: string
    ) {
        this.canvas = document.querySelector(`canvas#${canvasId}`) as HTMLCanvasElement;
        this.canvas.width = this.canvasWidth
        this.canvas.height = this.canvasHeight
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    }

    clear(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    drawModel(model: Asteroid | SpaceShip) {

    }


    render() { }
}


