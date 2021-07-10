import { Vector, keysPressed } from '../types'
import { SHIP_SPEED, SHIP_TURNSPEED, SHIP_RADIUS } from '../setup'
import { Object2D } from './Object2D'

interface ShipWeapon {
    weaponPosition: Vector;
    fire: () => void;
}

export class SpaceShip extends Object2D implements ShipWeapon {
    private _velocity: Vector = { x: 0, y: 0 }
    private _keys: keysPressed = {}
    weaponPosition: Vector = { x: 0, y: 0 }

    set velocity({ x, y }: Vector) {
        this._velocity = {
            ...this.velocity,
            x: parseFloat((x).toFixed(3)),
            y: parseFloat((y).toFixed(3)),
        }
    }

    get velocity() {
        return this._velocity;
    }

    constructor(
        protected position: Vector,
        public angle: number = 0
    ) {
        super()
        document.body.addEventListener("keydown", ({ key }) => this._keys[key] = true)
        document.body.addEventListener("keyup", ({ key }) => {
            this._keys[key] = false
            if (key === ' ') this.fire()
        })
    }

    fire() {
        console.log(`Fired bullet at:`, this.weaponPosition)
        console.log(`From this ship:`, this)
    }

    rotate(dir: number): void {
        this.angle += SHIP_TURNSPEED * dir
    }

    public accelerate(radians: number): void {
        this.velocity = {
            x: this.velocity.x + (Math.cos(radians) * SHIP_SPEED),
            y: this.velocity.y + (Math.sin(radians) * SHIP_SPEED)
        }
        // this.setVelocityY = this.velocity.y + (Math.sin(radians) * SHIP_SPEED)
    }

    private speedLoss() {
        if (!this.velocity.x && !this.velocity.y) return

        this.velocity = {
            x: this.velocity.x * 0.99,
            y: this.velocity.y * 0.99
        }

        if (this.velocity.x === 0.05 || this.velocity.x === -0.05)
            this.velocity.x = 0

        if (this.velocity.y === 0.05 || this.velocity.y === -0.05)
            this.velocity.y = 0
    }

    update() {
        console.log(this.velocity)
        let radians: number = this.angle / Math.PI * 180

        if (this._keys['w'])
            this.accelerate(radians)
        else
            this.speedLoss()

        this.position.x -= this.velocity.x
        this.position.y -= this.velocity.y

        if (this._keys['d'])
            this.rotate(1)
        if (this._keys['a'])
            this.rotate(-1)

        this.weaponPosition.x = this.position.x - SHIP_RADIUS * Math.cos(radians)
        this.weaponPosition.y = this.position.y - SHIP_RADIUS * Math.sin(radians)
    }

    draw(context: CanvasRenderingContext2D) {
        this.update()

        context.strokeStyle = 'white'
        context.beginPath()

        let vertAngle = ((Math.PI * 2) / 3)

        let radians = this.angle / Math.PI * 180

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