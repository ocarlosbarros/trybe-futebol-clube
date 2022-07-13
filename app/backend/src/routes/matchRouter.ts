import { Router } from 'express';
import MatchRepository from '../database/models/repositories/MatchRepository';
import MatchController from '../controllers/MatchController';
import MatchService from '../services/MatchService';

const matchRepository = new MatchRepository();
const matchService = new MatchService(matchRepository);
const matchController = new MatchController(matchService);

const matchRouter = Router();

matchRouter.get('/', matchController.findAll);

export default matchRouter;
