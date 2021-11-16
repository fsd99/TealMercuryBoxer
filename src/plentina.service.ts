import { Injectable, Logger } from '@nestjs/common'
import { Circle } from './models/circle.model'
import { Rectangle } from './models/rectangle.model'
import { Line } from './models/line.model'
import {
  CollideShapesRequest,
  CollideShapesResponse
} from './dto/shape.dto'
import {
  Context, DoesCircleAndCircleCollide,
  DoesCircleAndRectangleCollide,
  DoesRectangleAndRectangleCollide
} from './strategy/shapes.strategy'

@Injectable()
export class PlentinaService {
  private readonly logger = new Logger(PlentinaService.name);
  private context: Context;

  /**
   * Simple health check
   * @returns the applicant's name
   */
  healthCheck(): string {
    this.logger.log('Shapes application visited, healthCheck invoked');
    return 'Ely';
  }

  doShapesCollide(request: CollideShapesRequest): CollideShapesResponse {
    this.logger.log('Request received for shapes collision analysis, doShapesCollide invoked');
    let result = false;
    let collideShapesResponse = new CollideShapesResponse();

    if (request.firstShape.radius && request.secondShape.radius) {
      this.logger.log(`DoesCircleAndCircleCollide is appropriate for request ${JSON.stringify(request)}`);
      this.context = new Context(new DoesCircleAndCircleCollide());

      const circle1 = new Circle(request.firstShape.x,
        request.firstShape.y,
        request.firstShape.radius);
      const circle2 = new Circle(request.secondShape.x,
        request.secondShape.y,
        request.secondShape.radius);

      result = this.context.executeStrategy(circle1, circle2);

    } else if (
      request.firstShape.radius &&
      (request.secondShape.width && request.secondShape.height)
    ) {
      this.logger.log(`DoesCircleAndRectangleCollide is appropriate for request ${JSON.stringify(request)}`);
      this.context = new Context(new DoesCircleAndRectangleCollide());

      const circle = new Circle(request.firstShape.x,
        request.firstShape.y,
        request.firstShape.radius);
      const rectangle = new Rectangle(request.secondShape.x,
        request.secondShape.y,
        request.secondShape.width,
        request.secondShape.height);

      result = this.context.executeStrategy(circle, rectangle);

    } else if (
      request.secondShape.radius &&
      (request.firstShape.width && request.firstShape.height)
    ) {
      this.logger.log(`DoesCircleAndRectangleCollide is appropriate for request ${JSON.stringify(request)}`);
      this.context = new Context(new DoesCircleAndRectangleCollide());

      const circle = new Circle(request.secondShape.x,
        request.secondShape.y,
        request.secondShape.radius);
      const rectangle = new Rectangle(request.firstShape.x,
        request.firstShape.y,
        request.firstShape.width,
        request.firstShape.height);

      result = this.context.executeStrategy(circle, rectangle);

    } else if (
      (request.firstShape.width && request.firstShape.height) &&
      (request.secondShape.width && request.secondShape.height)
    ) {
      this.logger.log(`DoesRectangleAndRectangleCollide is appropriate for request ${JSON.stringify(request)}`);
      this.context = new Context(new DoesRectangleAndRectangleCollide());

      const rectangle1 = new Rectangle(request.firstShape.x,
        request.firstShape.y,
        request.firstShape.width,
        request.firstShape.height);
      const rectangle2 = new Rectangle(request.secondShape.x,
        request.secondShape.y,
        request.secondShape.width,
        request.secondShape.height);

      result = this.context.executeStrategy(rectangle1, rectangle2);

    } else {
      this.logger.error('One of the(Both) shapes is(are) invalid!');
      throw new Error('One of the(Both) shapes is(are) invalid!');
    }

    collideShapesResponse = <CollideShapesResponse>{
      collides: result,
      firstShape: request.firstShape,
      secondShape: request.secondShape,
    };

    this.logger.log(`collideShapesResponse is ${JSON.stringify(collideShapesResponse)}`);
    return collideShapesResponse;
  }
}
