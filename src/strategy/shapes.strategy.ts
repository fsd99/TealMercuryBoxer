import { Circle } from "../models/circle.model";
import { Rectangle } from "../models/rectangle.model";
import { Shape, distanceBetween, Point } from "../models/shape.model";

export interface ShapesStrategy {
  collides(firstShape: Shape, secondShape: Shape): boolean;
}

export class DoesCircleAndCircleCollide implements ShapesStrategy {
  collides(circle1: Circle, circle2: Circle): boolean {
    let distance = distanceBetween(circle1.center, circle2.center);

    return distance <= circle1.radius + circle2.radius;
  }
}

export class DoesCircleAndRectangleCollide implements ShapesStrategy {
  collides(circle: Circle, rectangle: Rectangle): boolean {
    let pointDistance: Point = <Point>{
      x: Math.abs(circle.center.x - rectangle.center.x),
      y: Math.abs(circle.center.y - rectangle.center.y),
    };

    if (pointDistance.x > rectangle.width / 2 + circle.radius) {
      return false;
    } else if (pointDistance.y > rectangle.height / 2 + circle.radius) {
      return false;
    } else if (pointDistance.x <= rectangle.width / 2) {
      return true;
    } else if (pointDistance.y <= rectangle.height / 2) {
      return true;
    }

    let circleToRectDistance =
      Math.pow(pointDistance.x - rectangle.width / 2, 2) +
      Math.pow(pointDistance.y - rectangle.height / 2, 2);

    return circleToRectDistance <= Math.pow(circle.radius, 2);
  }
}

export class DoesCircleAndLineCollide implements ShapesStrategy {
  collides(firstShape: Shape, secondShape: Shape): boolean {
    // throw new Error('Implement Circle to Line collision checking');
    return false;
  }
}

export class DoesRectangleAndRectangleCollide implements ShapesStrategy {
  collides(rectangle1: Rectangle, rectangle2: Rectangle): boolean {
    if (((rectangle1.center.x + rectangle1.width / 2) <= (rectangle2.center.x - rectangle2.width / 2))
      || ((rectangle1.center.x - rectangle1.width / 2) >= (rectangle2.center.x + rectangle2.width / 2))
    ) {
      return false;
    }
    else if (((rectangle1.center.y + rectangle1.height / 2) <= (rectangle2.center.y - rectangle2.height / 2))
      || ((rectangle1.center.y - rectangle1.height / 2) >= (rectangle2.center.y + rectangle2.height / 2))
    ) {
      return false;
    }
    else {
      return true;
    }
  }
}

export class DoesRectangleAndLineCollide implements ShapesStrategy {
  collides(firstShape: Shape, secondShape: Shape): boolean {
    throw new Error('Implement Rectangle to Line collision checking');
  }
}

export class DoesLineAndLineCollide implements ShapesStrategy {
  collides(firstShape: Shape, secondShape: Shape): boolean {
    throw new Error('Implement Line to Line collision checking');
  }
}

export class Context {
  private shapesStrategy: ShapesStrategy;

  constructor(shapesStrategy: ShapesStrategy) {
    this.shapesStrategy = shapesStrategy;
  }

  executeStrategy(firstShape: Shape, secondShape: Shape): boolean {
    return this.shapesStrategy.collides(firstShape, secondShape);
  }
}