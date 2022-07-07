import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';
import LoginController from '../controllers/LoginController';
import UserRepository from '../database/models/repositories/UserRepository';

const userRepository = new UserRepository();
const authenticateUserService = new AuthenticateUserService(userRepository);
const loginController = new LoginController(authenticateUserService);

const loginRouter = Router();

loginRouter.post('/', loginController.execute);

export default loginRouter;
