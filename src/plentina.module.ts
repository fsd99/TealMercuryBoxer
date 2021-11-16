import { Module } from '@nestjs/common'
import { PlentinaController } from './plentina.controller'
import { PlentinaService } from './plentina.service'
import { ShapesController } from './shapes/shapes.controller';
import { ShapesService } from './shapes/shapes.service';
import { ShapesModule } from './shapes/shapes.module';

@Module({
  imports: [ShapesModule],
  controllers: [PlentinaController, ShapesController],
  providers: [PlentinaService, ShapesService],
})
export class AppModule {}
