import { SpaceShip } from "../models/SpaceShip"

export class CanvasView {
    public canvas: HTMLCanvasElement
    public context: CanvasRenderingContext2D
    public canvasHeight: number = window.innerHeight
    public canvasWidth: number = window.innerWidth

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

    init(startFunction: (view: CanvasView) => void): void {
        startFunction(this)
    }

    drawModel(model: SpaceShip): void {
        model.draw(this.context)
    }

    render() { }
}


