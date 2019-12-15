import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { TodoModel } from '../service/TodoModel';
import { ListQuery } from '../../../helpers/responses/ListQuery';
import { TodosService } from '../service/todos.service';
import { parseIntFromParameter } from '../../../helpers/parseIntFromParameter';
import { UpdatingTodoDto } from './UpdatingTodoDto';
import { CreatingTodoDto } from './CreatingTodoDto';

@Controller('todos')
export class TodosController {

  constructor(
    private readonly todosService: TodosService,
  ) {}

  @Post()
  async create(
    @Body() creatingTodoDto: CreatingTodoDto,
  ): Promise<TodoModel> {
    return this.todosService.create(creatingTodoDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatingTodoDto: UpdatingTodoDto,
  ): Promise<TodoModel> {
    return this.todosService
      .update(
        {
          id: parseIntFromParameter(id),
        },
        updatingTodoDto,
      );
  }

  @Get(':id')
  read(
    @Param('id') id: string,
  ): Promise<TodoModel> {
    return this.todosService
      .read({
        id: parseIntFromParameter(id),
      });
  }

  @Get()
  async getAll(): Promise<ListQuery<TodoModel>> {
    return this.todosService.getAll();
  }

  @Delete(':id')
  delete(
    @Param('id') id: string,
  ) {
    return this.todosService
      .delete({
        id: parseIntFromParameter(id),
      });
  }

}
