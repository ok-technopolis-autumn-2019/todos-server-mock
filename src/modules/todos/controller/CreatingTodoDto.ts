import { TodoDtoData } from '../service/todos.service';

export class CreatingTodoDto implements TodoDtoData {
  readonly text: string;
  readonly isDone: boolean;
}
