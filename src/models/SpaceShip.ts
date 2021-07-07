import { Vector, keysPressed } from '../types'
import { SHIP_SPEED, SHIP_TURNSPEED, SHIP_RADIUS } from '../setup'

export class SpaceShip {
    private velocity: Vector = { x: 0, y: 0 }
    private nosePosition: Vector = { x: 0, y: 0 }
    private movingForward = false
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
    }

    update(): void {
        let radians: number = this.angle / Math.PI * 180

        // Acelerar
        if (this.keys['w'])
            this.accelerate(radians)
        else {
            // Perda de velocidade
            this.speedLoss()

            // Correção de perda de velocidade
            if (this.velocity.x === 0.05 || this.velocity.x === -0.05)
                this.velocity.x = 0

            if (this.velocity.y === 0.05 || this.velocity.y === -0.05)
                this.velocity.y = 0
        }

        this.position.x -= this.velocity.x
        this.position.y -= this.velocity.y

        if (this.keys['d'])
            this.rotate(1)
        if (this.keys['a'])
            this.rotate(-1)
    }

    draw(context: CanvasRenderingContext2D): void {
        context.strokeStyle = 'white'
        context.beginPath()

        let vertAngle = ((Math.PI * 2) / 3)

        let radians = this.angle / Math.PI * 180

        this.nosePosition.x = this.position.x - SHIP_RADIUS * Math.cos(radians)
        this.nosePosition.y = this.position.y - SHIP_RADIUS * Math.sin(radians)

        for (let i = 0; i < 3; i++) {
            context.lineTo(
                this.position.x - SHIP_RADIUS * Math.cos(vertAngle * i + radians),
                this.position.y - SHIP_RADIUS * Math.sin(vertAngle * i + radians)
            )
        }

        context.closePath()
        context.stroke()
    }
}