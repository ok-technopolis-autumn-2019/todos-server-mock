import { TodoDtoData } from '../service/todos.service';

export class UpdatingTodoDto implements TodoDtoData {
  readonly text?: string;
  readonly isDone?: boolean;
}
