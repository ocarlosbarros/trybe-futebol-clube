import { Router } from 'express';

import ensureAuthenticated from '../middeware/ensureAuthenticated';
import MatchRepository from '../database/models/repositories/MatchRepository';
import MatchController from '../controllers/MatchController';
import MatchService from '../services/MatchService';

const matchRepository = new MatchRepository();
const matchService = new MatchService(matchRepository);
const matchController = new MatchController(matchService);

const matchRouter = Router();

matchRouter.get('/', matchController.findAll);
matchRouter.post('/', ensureAuthenticated, matchController.create);
matchRouter.patch('/:id/finish', ensureAuthenticated, matchController.patch);

export default matchRouter;
