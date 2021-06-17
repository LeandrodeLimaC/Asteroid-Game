import { CanvasView } from './view/CanvasView'

function gameLoop(
    view: CanvasView,
): void {
    view.clear()
    requestAnimationFrame(() => gameLoop(view))
}

function startGame(view: CanvasView) {
    gameLoop(view)
}

const view = new CanvasView('asteroids-game')
view.init(startGame)