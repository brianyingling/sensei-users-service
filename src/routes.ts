import { Application } from 'express';
import {
  createSession,
  createUser,
  getHealth,
  getSession,
  getUser,
  getUsers,
} from './handlers';

const routes = (app: Application) => {
  app.get('/users/:id', getUser);
  app.get('/users', getUsers);
  app.post('/users', createUser);

  app.get('/sessions/:id', getSession);
  app.post('/sessions', createSession);

  app.get('/health', getHealth);
};

export default routes;
