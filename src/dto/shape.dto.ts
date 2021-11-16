export class CreateShapeDto {
  readonly x: number;
  readonly y: number;
  readonly radius?: number;
  readonly width?: number;
  readonly height?: number;
  readonly lineEndpointX?: number;
  readonly lineEndpointy?: number;
}

export class CollideShapesRequest {
  firstShape: CreateShapeDto;
  secondShape: CreateShapeDto;
}

export class CollideShapesResponse extends CollideShapesRequest {
  collides: boolean;
}