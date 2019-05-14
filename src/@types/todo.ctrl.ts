export interface IReqParam {
  id: string;
  todo?: string;
}

export interface IReqTodo {
  title: string;
  content: string;
  priority: number;
  dueDate?: Date;
}
