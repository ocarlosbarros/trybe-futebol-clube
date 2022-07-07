import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';
import LoginController from '../controllers/LoginController';
import UserRepository from '../database/models/repositories/UserRepository';
import loginValidate from '../middeware/loginValidate';
import ensureAuthenticated from '../middeware/ensureAuthenticated';

const userRepository = new UserRepository();
const authenticateUserService = new AuthenticateUserService(userRepository);
const loginController = new LoginController(authenticateUserService);

const loginRouter = Router();

loginRouter.post('/', loginValidate, loginController.execute);
loginRouter.get('/validate', ensureAuthenticated, loginController.validate);

export default loginRouter;
