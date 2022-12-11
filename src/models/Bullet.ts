import { Object2D } from "./Object2D";
import { SpaceShip } from "./SpaceShip";

import { toRadians } from "../utils";

export class Bullet extends Object2D {
  private _acceleration: number = 5;
  private _height: number = 3;
  private _width: number = 3;
  public collisionRadius: number = 3;

  constructor(
    private spaceShip: SpaceShip,
    private angle: number
  ) {
    super()

    this.position = {
      x: this.spaceShip.weaponPosition.x,
      y: this.spaceShip.weaponPosition.y
    }
  }

  update(): void {
    let radians = toRadians(this.angle)
    this.position.x -= Math.cos(radians) * this._acceleration;
    this.position.y -= Math.sin(radians) * this._acceleration;
  }
  draw(context: CanvasRenderingContext2D): void {
    this.update()
    context.fillStyle = 'white';
    context.fillRect(this.position.x, this.position.y, this._width, this._height)
  }
}