import { Router } from 'express';
import TeamRepository from '../database/models/repositories/TeamRepository';
import MatchRepository from '../database/models/repositories/MatchRepository';

import LeaderBoardController from '../controllers/LeaderBoardController';
import LeaderBoardService from '../services/LeaderBoardService';

const matchRepository = new MatchRepository();
const teamRepository = new TeamRepository();
const leaderBoardService = new LeaderBoardService(matchRepository, teamRepository);
const leaderBoardController = new LeaderBoardController(leaderBoardService);

const leaderBoardRouter = Router();

leaderBoardRouter.get('/', leaderBoardController.findAll);
leaderBoardRouter.get('/home', leaderBoardController.findAll);
leaderBoardRouter.get('/away', leaderBoardController.findAll);

export default leaderBoardRouter;
