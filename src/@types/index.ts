export interface IUser {
  accessToken: string;
  uniqueId: string;
  name: string;
}

export interface ITodo {
  title: string;
  content: string;
  priority: number;
  dueDate?: Date;
  done?: boolean;
}
