import { Point, Shape, Type } from './shape.model'

export class Rectangle implements Shape {
  readonly center: Point;
  readonly width: number;
  readonly height: number;
  readonly type: Type;

  constructor(x: number, y: number, width: number, height: number) {
    this.center = <Point>{ x, y };
    this.type = Type.RECT;
    this.width = width;
    this.height = height;
  }

  /**
   * Typecasts a Shape object into this Shape type
   * @param other the Shape object
   * @returns a Rect object
   */
  // no longer needed, already checked service layer, used AND(&&) instead of OR(||)
  // static fromShape(other: Shape): Rectangle {
  //   const polymorph = <any>other;
  //   if (!polymorph.width || !polymorph.height) {
  //     throw new Error('Shape is invalid! Cannot convert to a Rectangle');
  //   }

  //   return new Rectangle(
  //     polymorph.center.x,
  //     polymorph.center.y,
  //     polymorph.width,
  //     polymorph.height,
  //   );
  // }
}
