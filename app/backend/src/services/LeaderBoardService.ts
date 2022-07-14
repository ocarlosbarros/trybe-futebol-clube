import ILeaderBoard from '../interfaces/ILeaderBoard';
import ILeaderBoardService from './interfaces/ILeaderBoardService';
import IMatchRepository from '../database/models/repositories/interfaces/IMatchRepository';
import IMatch from '../database/models/interfaces/IMatch';
import ITeam from '../database/models/interfaces/ITeam';
import ITeamRepository from '../database/models/repositories/interfaces/ITeamRepository';
import {
  getTotalGames,
  getTotalWins,
  getTotalDraws,
  getTotalLosses,
  getGoalsFavor,
  getGoalsOwn,
  getGoalsBalance,
  getEfficiency,
  getTotalPoints,
  sortTeams,
} from '../utils/LeaderBoardUtil';

class LeaderBoardService implements ILeaderBoardService {
  private _matchRepository;
  private _teamRepository;

  constructor(matchRepository: IMatchRepository, teamRepository: ITeamRepository) {
    this._matchRepository = matchRepository;
    this._teamRepository = teamRepository;
  }

  getHomeMatches = (allMatches: Array<IMatch>, team: ITeam) => {
    const homeMatches = allMatches
      .filter((match) => match.homeTeam === team.id && match.inProgress === false);
    return homeMatches;
  };

  getAwayMatches = (allMatches: Array<IMatch>, team: ITeam) => {
    const awayMatches = allMatches
      .filter((match) => match.awayTeam === team.id && match.inProgress === false);
    return awayMatches;
  };

  getDefaulMatches = (allMatches: Array<IMatch>, team: ITeam) => {
    const fineshedMatches = allMatches.filter((match) => match.inProgress === false);
    const defaultMatches = fineshedMatches.filter((match) => match.homeTeam === team.id
      || match.awayTeam === team.id);
    return defaultMatches;
  };

  setLeaderBoard = (path:string, allMatches: Array<IMatch>, team: ITeam) => {
    switch (path) {
      case '/home': {
        const homeMatches = this.getHomeMatches(allMatches, team);
        return this.buildLeaderBoard(homeMatches, team);
      }
      case '/away': {
        const awayMatches = this.getAwayMatches(allMatches, team);
        return this.buildLeaderBoard(awayMatches, team);
      }
      default: {
        const defaltMatches = this.getDefaulMatches(allMatches, team);
        return this.buildLeaderBoard(defaltMatches, team);
      }
    }
  };

  buildLeaderBoard = (allMatches: Array<IMatch>, team: ITeam) => {
    const leaderBoard = {
      name: team.teamName,
      totalPoints: getTotalPoints(allMatches, team),
      totalGames: getTotalGames(allMatches),
      totalVictories: getTotalWins(allMatches, team),
      totalDraws: getTotalDraws(allMatches),
      totalLosses: getTotalLosses(allMatches, team),
      goalsFavor: getGoalsFavor(allMatches, team),
      goalsOwn: getGoalsOwn(allMatches, team),
      goalsBalance: getGoalsBalance(allMatches, team),
      efficiency: getEfficiency(allMatches, team),
    };
    return leaderBoard;
  };

  async findAll(path: string): Promise<Array<ILeaderBoard> | null> {
    const allTeams = await this._teamRepository.findAll();
    const allMatches = await this._matchRepository.findAll();

    if (!allMatches || !allTeams) return null;

    const leaderBoard = allTeams.map((team) => this.setLeaderBoard(path, allMatches, team));

    if (!leaderBoard) return null;

    const sortedTeams = sortTeams(leaderBoard as Array<ILeaderBoard>);

    return sortedTeams;
  }
}

export default LeaderBoardService;
