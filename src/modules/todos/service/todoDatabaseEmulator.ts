import { TodoModel } from './TodoModel';

// export const todoDatabaseEmulator: {
//   idCounter: number,
//     todos: TodoModel[],
// } = {
//   idCounter: 1,
//   todos: [],
// };

export const todoDatabaseEmulator: {
  idCounter: number,
  todos: TodoModel[],
} = {
  idCounter: 4,
  todos: [
    {
      id: 1,
      text: 'Make XHR',
      isDone: false,
    },
    {
      id: 2,
      text: 'Understand XHR',
      isDone: true,
    },
    {
      id: 3,
      text: 'Find XHR alternative',
      isDone: false,
    },
  ],
};
