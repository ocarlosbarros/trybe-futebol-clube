import { Router } from 'express';
import loginRouter from './loginRouter';
import matchRouter from './matchRouter';
import teamRouter from './teamRouter';
import leaderBoardRouter from './leaderBoardRouter';

const routes = Router();

routes.use('/teams', teamRouter);
routes.use('/matches', matchRouter);
routes.use('/login', loginRouter);
routes.use('/leaderboard', leaderBoardRouter);

export default routes;
