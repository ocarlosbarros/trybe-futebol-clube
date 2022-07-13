import { Router } from 'express';
import TeamController from '../controllers/TeamController';
import TeamRepository from '../database/models/repositories/TeamRepository';
import TeamService from '../services/TeamService';

const teamRepository = new TeamRepository();
const teamService = new TeamService(teamRepository);
const teamController = new TeamController(teamService);

const teamRouter = Router();

teamRouter.get('/', teamController.findAll);

export default teamRouter;
