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
        document.body.addEventListener("keydown", (e): void => {
            console.log(e)
            this.keys[e.keyCode] = true
        })
        document.body.addEventListener("keyup", (e): void => {
            this.keys[e.keyCode] = false
        })
    }

    rotate(dir: number) {
        this.angle += this.rotateSpeed * dir
    }

    update(): void {
        let radians = this.angle / Math.PI * 180;
        if (this.movingForward) {
            this.velocity.x += Math.cos(radians) * this.speed
            this.velocity.y += Math.sin(radians) * this.speed
        }

        this.velocity.x *= 0.99;
        this.velocity.y *= 0.99;
        console.log("this.velocity", this.velocity)
        this.position.x -= this.velocity.x
        this.position.y -= this.velocity.y
        console.log("this.position", this.position)


        this.movingForward = Boolean(this.keys[87])

        if (this.keys[68]) this.rotate(1)
        if (this.keys[65]) this.rotate(-1)
    }

    draw(context: CanvasRenderingContext2D): void {
        context.strokeStyle = 'black'
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