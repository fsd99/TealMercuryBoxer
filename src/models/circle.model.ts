import { Point, Shape, Type } from './shape.model'

export class Circle implements Shape {
  readonly center: Point;
  readonly radius: number;
  readonly type: Type;

  constructor(x: number, y: number, radius: number) {
    this.center = <Point>{ x, y };
    this.type = Type.CIRCLE;
    this.radius = radius;
  }
  
  /**
   * Typecasts a Shape object into this Shape type
   * @param other the Shape object
   * @returns a Circle object
   */
  // no longer needed, already checked service layer, used AND(&&) instead of OR(||)
  // static fromShape(other: Shape): Circle {
  //   const polymorph = <any>other;
  //   if (!polymorph.radius) {
  //     throw new Error('Shape is invalid! Cannot convert to a Circle');
  //   }

  //   return new Circle(polymorph.center.x, polymorph.center.y, polymorph.radius);
  // }
}
