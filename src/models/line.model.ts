import { Point, Shape, Type } from "./shape.model";

export class Line implements Shape {
    readonly center: Point;
    //readonly endpoint: Point;
    readonly endpointX: number;
    readonly endpointY: number;

    readonly type: Type;

    constructor(x: number, y: number, endpointX: number, endpointY: number) {
        this.center = <Point>{ x, y };
        this.type = Type.LINE;
        //this.endpoint = <Point>{ endpointX, endpointY };
        this.endpointX = endpointX;
        this.endpointY = endpointY;
    }
}