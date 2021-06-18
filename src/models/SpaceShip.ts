import { Vector } from '../types'

export class SpaceShip {
    private speed: number = 0.1
    private velocity: Vector = { x: 0, y: 0 }
    private nosePos: Vector = { x: 0, y: 0 }
    private rotateSpeed = 0.001
    private movingForward = false
    private radius: number = 15
    private keys: Object[] = []

    constructor(
        protected position: Vector,
        public angle: number = 0
    ) {
        document.body.addEventListener("keydown", (e): Boolean => this.keys[e.keyCode] = true)
        document.body.addEventListener("keyup", (e): Boolean => this.keys[e.keyCode] = false)
    }

    rotate(dir: number): void {
        this.angle += this.rotateSpeed * dir
    }

    public accelerate(radians: number): void {
        this.velocity.x += parseFloat((Math.cos(radians) * this.speed).toFixed(4))
        this.velocity.y += parseFloat((Math.sin(radians) * this.speed).toFixed(4))
    }

    update(): void {
        let radians: number = this.angle / Math.PI * 180;

        // Acelerar
        if (this.movingForward) this.accelerate(radians)

        // Perda de velocidade
        if (this.velocity.x || this.velocity.y || !this.movingForward) {
            this.velocity.x = parseFloat((this.velocity.x * 0.99).toFixed(3));
            this.velocity.y = parseFloat((this.velocity.y * 0.99).toFixed(3));
        }

        // Correção de perda de velocidade
        if ((this.velocity.x === 0.05 || this.velocity.x === -0.05) && !this.movingForward)
            this.velocity.x = 0

        if (this.velocity.y === 0.05 || this.velocity.y === -0.05 && !this.movingForward)
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

        this.nosePos.x = this.position.x - this.radius * Math.cos(radians)
        this.nosePos.y = this.position.y - this.radius * Math.sin(radians)

        for (let i = 0; i < 3; i++) {
            context.lineTo(
                this.position.x - this.radius * Math.cos(vertAngle * i + radians),
                this.position.y - this.radius * Math.sin(vertAngle * i + radians)
            )
        }

        context.closePath()
        context.stroke()
    }
}