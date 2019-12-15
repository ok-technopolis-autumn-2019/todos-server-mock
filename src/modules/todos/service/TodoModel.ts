
export interface TodoModel {
  id: number;
  text: string;
  isDone: boolean;
}

export function createTodoModel(options: {
  id: number,
  text?: string,
  isDone?: boolean,
}): TodoModel {
  return {
    id: options.id,
    text: options.text || '',
    isDone: options.isDone ?? false,
  };
}
