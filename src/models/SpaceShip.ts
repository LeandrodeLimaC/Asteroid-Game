import { Vector, keysPressed } from '../types'
import { SHIP_SPEED, SHIP_TURNSPEED, SHIP_RADIUS } from '../setup'

export class SpaceShip {
    private velocity: Vector = { x: 0, y: 0 }
    private nosePosition: Vector = { x: 0, y: 0 }
    private keys: keysPressed = {}

    set setVelocityX(value: number) {
        this.velocity.x = parseFloat((value).toFixed(3))
    }
    set setVelocityY(value: number) {
        this.velocity.y = parseFloat((value).toFixed(3))
    }

    constructor(
        protected position: Vector,
        public angle: number = 0
    ) {
        document.body.addEventListener("keydown", ({ key }) => this.keys[key] = true)
        document.body.addEventListener("keyup", ({ key }) => this.keys[key] = false)
    }

    rotate(dir: number): void {
        this.angle += SHIP_TURNSPEED * dir
    }

    public accelerate(radians: number): void {
        this.setVelocityX = this.velocity.x + (Math.cos(radians) * SHIP_SPEED)
        this.setVelocityY = this.velocity.y + (Math.sin(radians) * SHIP_SPEED)
    }

    private speedLoss() {
        if (!this.velocity.x && !this.velocity.y) return

        this.setVelocityX = this.velocity.x * 0.99
        this.setVelocityY = this.velocity.y * 0.99

        if (this.velocity.x === 0.05 || this.velocity.x === -0.05)
            this.velocity.x = 0

        if (this.velocity.y === 0.05 || this.velocity.y === -0.05)
            this.velocity.y = 0
    }

    update(): void {
        let radians: number = this.angle / Math.PI * 180

        if (this.keys['w'])
            this.accelerate(radians)
        else
            this.speedLoss()

        this.position.x -= this.velocity.x
        this.position.y -= this.velocity.y

        if (this.keys['d'])
            this.rotate(1)
        if (this.keys['a'])
            this.rotate(-1)
    }

    draw(context: CanvasRenderingContext2D): void {
        this.update()

        context.strokeStyle = 'white'
        context.beginPath()

        let vertAngle = ((Math.PI * 2) / 3)

        let radians = this.angle / Math.PI * 180

        this.nosePosition.x = this.position.x - SHIP_RADIUS * Math.cos(radians)
        this.nosePosition.y = this.position.y - SHIP_RADIUS * Math.sin(radians)

        context.lineTo(
            this.position.x - SHIP_RADIUS * Math.cos(vertAngle * 0 + radians),
            this.position.y - SHIP_RADIUS * Math.sin(vertAngle * 0 + radians)
        )
        context.lineTo(
            this.position.x - (SHIP_RADIUS - 5) * Math.cos(vertAngle * 1 + radians),
            this.position.y - (SHIP_RADIUS - 5) * Math.sin(vertAngle * 1 + radians)
        )
        context.lineTo(
            this.position.x - (SHIP_RADIUS - 5) * Math.cos(vertAngle * 2 + radians),
            this.position.y - (SHIP_RADIUS - 5) * Math.sin(vertAngle * 2 + radians)
        )

        context.closePath()
        context.stroke()
    }
}