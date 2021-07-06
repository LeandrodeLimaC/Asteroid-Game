import { Vector } from '../types'
import { SHIP_SPEED, SHIP_TURNSPEED, SHIP_RADIUS } from '../setup';

export class SpaceShip {
    // Ship variables
    private velocity: Vector = { x: 0, y: 0 }
    private nosePosition: Vector = { x: 0, y: 0 }
    private movingForward = false
    private keys: Object[] = []

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
        document.body.addEventListener("keydown", (e): Boolean => this.keys[e.keyCode] = true)
        document.body.addEventListener("keyup", (e): Boolean => this.keys[e.keyCode] = false)
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
        let radians: number = this.angle / Math.PI * 180;

        // Acelerar
        if (this.movingForward)
            this.accelerate(radians)
        else
            this.speedLoss()
        // Perda de velocidade

        // Correção de perda de velocidade
        if ((this.velocity.x === 0.05 || this.velocity.x === -0.05) && !this.movingForward)
            this.velocity.x = 0

        if ((this.velocity.y === 0.05 || this.velocity.y === -0.05) && !this.movingForward)
            this.velocity.y = 0

        this.position.x -= this.velocity.x
        this.position.y -= this.velocity.y

        this.movingForward = Boolean(this.keys[87])

        if (this.keys[68])
            this.rotate(1)
        if (this.keys[65])
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