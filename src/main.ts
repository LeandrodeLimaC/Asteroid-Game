// import SpaceShip from './models/SpaceShip'

let canvas: HTMLCanvasElement | null
let ctx: CanvasRenderingContext2D
// let playerShip: SpaceShip

(function init(): void {
    canvas = initCanvas()
    console.log(canvas)
    ctx = getCtx(canvas)
})()

function initCanvas(): HTMLCanvasElement {
    const canvasFound = document.querySelector('#asteroids-game');
    if (!canvasFound || !(canvasFound instanceof HTMLCanvasElement))
        throw new Error('Falha ao encontrar canvas')

    canvasFound.width = window.innerWidth
    canvasFound.height = window.innerHeight

    return canvasFound
}

function getCtx(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
    var ctxFound = canvas.getContext('2d');
    if (!ctxFound || !(ctxFound instanceof CanvasRenderingContext2D)) {
        throw new Error('Falha ao adquirir o contexto 2D');
    }

    return ctxFound
}