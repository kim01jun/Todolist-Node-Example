import { Request, Response } from 'express';
import User from '../../models/User';
import * as types from '../../@types/todo.ctrl';

export const getTodos = async (req: Request, res: Response) => {
// tslint:disable-next-line: ter-indent
try {
  const params: types.IReqParam = req.params;
  const todos = await User.getTodos(params.id);

  res.status(200).json(todos);
} catch (e) {
  res.status(500).json({ result: 'ERROR' });
}
};

export const addTodo = async (req: Request, res: Response) => {
// tslint:disable-next-line: ter-indent
try {
  const params: types.IReqParam = req.params;
  const newTodo: types.IReqTodo = req.body;

  await User.createTodo(params.id, newTodo);

  res.status(201).json({ result: 'OK' });
} catch (e) {
  res.status(500).json({ result: 'ERROR' });
}
};

export const updateTodo = async (req: Request, res: Response) => {
// tslint:disable-next-line: ter-indent
try {
  const params: types.IReqParam = req.params;
  const newTodo: types.IReqTodo = req.body;

  if (!params.todo) return res.status(405).json({ result: 'ERROR', message: 'todo id is missing' });
  await User.updateTodo(params.id, params.todo, newTodo);

  res.status(204).json({ result: 'OK' });
} catch (e) {
  res.status(500).json({ result: 'ERROR' });
}
};

export const deleteTodo = async (req: Request, res: Response) => {
// tslint:disable-next-line: ter-indent
try {
  const params: types.IReqParam = req.params;

  if (!params.todo) return res.status(405).json({ result: 'ERROR', message: 'todo id is missing' });
  await User.deleteTodo(params.id, params.todo);

  res.status(204).json({ result: 'OK' });
} catch (e) {
  res.status(500).json({ result: 'ERROR' });
}
};
