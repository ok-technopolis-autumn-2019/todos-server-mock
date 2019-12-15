import { Injectable, NotFoundException } from '@nestjs/common';
import { ListQuery } from '../../../helpers/responses/ListQuery';
import { createTodoModel, TodoModel } from './TodoModel';
import { MinRequestResult } from '../../../helpers/responses/MinRequestResult';
import { todoDatabaseEmulator } from './todoDatabaseEmulator';

export interface TodoDtoData {
  text?: string;
  isDone?: boolean;
}

export interface TodoQuery {
  id: number;
}

export interface TodoQueryResult {
  index: number;
  model: TodoModel;
}

export function selectTodo(todoQuery: TodoQuery): Promise<TodoQueryResult> {
  const foundTodoIndex = todoDatabaseEmulator.todos
    .findIndex(todo => todo.id === todoQuery.id);

  if (foundTodoIndex === -1) {
    return Promise.reject(new NotFoundException());
  }

  return Promise.resolve({
    index: foundTodoIndex,
    model: todoDatabaseEmulator.todos[foundTodoIndex],
  });
}

@Injectable()
export class TodosService {

  create(
    newTodoData: TodoDtoData,
  ): Promise<TodoModel> {
    const todoModel = createTodoModel({
      ...newTodoData,
      id: todoDatabaseEmulator.idCounter++,
    });
    todoDatabaseEmulator.todos.push(todoModel);

    return Promise.resolve(todoModel);
  }

  update(
    todoQuery: TodoQuery,
    updateTodoData: TodoDtoData,
  ): Promise<TodoModel> {
    return selectTodo(todoQuery)
      .then(queryResult => {
        const foundTodoModel = queryResult.model;

        const newTodo: TodoModel = createTodoModel({
          id: foundTodoModel.id,
          text: updateTodoData.text ?? foundTodoModel.text,
          isDone: updateTodoData.isDone ?? foundTodoModel.isDone,
        });

        todoDatabaseEmulator.todos[queryResult.index] = newTodo;

        return newTodo;
      });
  }

  read(
    todoQuery: TodoQuery,
  ) {
    return selectTodo(todoQuery).then(result => result.model);
  }

  getAll(): Promise<ListQuery<TodoModel>> {
    const allTodos = todoDatabaseEmulator.todos;

    return Promise.resolve({
      count: allTodos.length,
      elements: allTodos,
    });
  }

  delete(
    todoQuery: TodoQuery,
  ): Promise<MinRequestResult> {
    return selectTodo(todoQuery)
      .then(queryResult => {
        todoDatabaseEmulator.todos.splice(queryResult.index, 1);
        return true;
      })
      .then(isDeleted => ({
        isOk: isDeleted,
      }));
  }

}
