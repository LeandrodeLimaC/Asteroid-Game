// import SpaceShip from './models/SpaceShip'

let canvas: HTMLCanvasElement | null
// let playerShip: SpaceShip

(function init(): void {
    canvas = initCanvas()
    console.log(canvas)
})()

function initCanvas(): HTMLCanvasElement {
    const canvasFound = document.querySelector('#asteroids-game');
    if (!canvasFound || !(canvasFound instanceof HTMLCanvasElement))
        throw new Error('Falha ao encontrar canvas')

    canvasFound.width = window.innerWidth
    canvasFound.height = window.innerHeight

    return canvasFound
}
