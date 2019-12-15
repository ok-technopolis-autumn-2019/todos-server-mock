import { Module } from '@nestjs/common';
import { TodosController } from './modules/todos/controller/todos.controller';
import { TodosService } from './modules/todos/service/todos.service';

@Module({
  imports: [],
  controllers: [
    TodosController,
  ],
  providers: [
    TodosService,
  ],
})
export class AppModule {}
