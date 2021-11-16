import { Module } from '@nestjs/common'
import { ShapesController } from './shapes.controller';
import { ShapesService } from './shapes.service';

@Module({
    imports: [],
    controllers: [ShapesController],
    providers: [ShapesService],
})
export class ShapesModule {}