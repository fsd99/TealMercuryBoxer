import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { PlentinaService } from './plentina.service'
import { CreateShapeDto, CollideShapesRequest, CollideShapesResponse } from './dto/shape.dto';

/*
export interface ShapeDTO {
  x: number;
  y: number;
  radius?: number;
  width?: number;
  height?: number;
}

export interface CollideShapesRequest {
  firstShape: ShapeDTO;
  secondShape: ShapeDTO;
}

export interface CollideShapesResponse {
  collides: boolean;
  firstShape: ShapeDTO;
  secondShape: ShapeDTO;
}
*/

@Controller()
export class PlentinaController {
  constructor(private readonly plentinaService: PlentinaService) {}

  @Get()
  // item 1 - Should we add this endpoint?
  //@Get(`/healthCheck`)
  healthCheck(@Res({ passthrough: true }) res: Response): any {
    try {
      res.status(HttpStatus.OK);
      return { name: this.plentinaService.healthCheck() };
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST);
      return { error: 'Did you forget to return your name?' };
    }
  }

  @Post('/shape')
  collideShapes(@Body() collideShapesReq: CollideShapesRequest, @Res() res: Response) {
    try {
      const collideShapesRes: CollideShapesResponse =
        this.plentinaService.doShapesCollide(collideShapesReq);
      res.status(HttpStatus.OK).json(collideShapesRes);
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).json(e);
    }
  }
}
