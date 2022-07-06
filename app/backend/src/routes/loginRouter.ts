import { Router } from 'express';
import LoginController from '../controllers/LoginController';

const loginController = new LoginController();

const loginRouter = Router();

loginRouter.post('/', loginController.execute);

export default loginRouter;
