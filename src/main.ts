import { CanvasView } from './view/CanvasView'
import { SpaceShip } from './models/SpaceShip'

function gameLoop(
    view: CanvasView,
    ship: SpaceShip,
): void {
    view.clear()
    view.drawModel(ship)

    requestAnimationFrame(() => gameLoop(view, ship))
}

function startGame(view: CanvasView) {
    const ship = new SpaceShip(
        {
            x: view.canvasWidth / 2,
            y: view.canvasHeight / 2
        }
    )

    gameLoop(view, ship)
}

const view = new CanvasView('asteroids-game')
view.init(startGame)