import { Router } from 'express';
import loginRouter from './loginRouter';
import matchRouter from './matchRouter';
import teamRouter from './teamRouter';

const routes = Router();

routes.use('/login', loginRouter);
routes.use('/teams', teamRouter);
routes.use('/matches', matchRouter);

export default routes;
