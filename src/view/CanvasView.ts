
export class CanvasView {
    private canvas: HTMLCanvasElement
    private context: CanvasRenderingContext2D
    private canvasHeight: number = window.innerHeight
    private canvasWidth: number = window.innerWidth

    constructor(
        public canvasId: string
    ) {
        const canvasFound = document.querySelector<HTMLCanvasElement>(`canvas#${canvasId}`)
        if (!canvasFound)
            throw new Error(`
                Falha ao encontrar elemento Canvas, 
                verifique se existe um elemento <canvas id="${canvasId}"> 
            `)

        this.canvas = canvasFound

        const contextFound = this.canvas.getContext('2d')
        if (!contextFound)
            throw new Error(`
                Falha ao adquirir contexto 2d
            `)

        this.context = contextFound
    }

    private clear(): void {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    setup() {
        this.canvas.width = this.canvasWidth
        this.canvas.height = this.canvasHeight
        console.log(this.canvas)
        // console.log(this.ctx)
    }

    render() { }
}


