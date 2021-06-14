import SpaceShip from './models/SpaceShip'

let canvas: HTMLElement
let playerShip: SpaceShip<HTMLElement>

(function init(): void {
    canvas = document.getElementById('asteroids-game')!;
    playerShip = new SpaceShip(canvas)

    playerShip.update()
})()