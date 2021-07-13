import { Vector } from '../types'

export abstract class Object2D {
  public position: Vector = { x: 0, y: 0 }

  abstract update(): void;
  abstract draw(context: CanvasRenderingContext2D): void;
}