import ITeam from '../database/models/interfaces/ITeam';
import IMatch from '../database/models/interfaces/IMatch';
import ILeaderBoard from '../interfaces/ILeaderBoard';

/* eslint-disable no-param-reassign */
const getTotalGames = (matches: Array<IMatch>) : number => {
  const totalGames = matches.reduce((acc, item) => {
    if (item) {
      acc += 1;
    }
    return acc;
  }, 0);
  return totalGames;
};

const getTotalWins = (matches: Array<IMatch>, team: ITeam) : number => {
  let totalWins = 0;

  matches.forEach((currentTeam) => {
    if (team.id === currentTeam.homeTeam && currentTeam.homeTeamGoals > currentTeam.awayTeamGoals) {
      totalWins += 1;
    }
    if (team.id === currentTeam.awayTeam && currentTeam.awayTeamGoals > currentTeam.homeTeamGoals) {
      totalWins += 1;
    }
  });
  return totalWins;
};

const getTotalDraws = (matches: IMatch[]) => {
  const totalDraws = matches.reduce((acc, item) => {
    if (item.homeTeamGoals === item.awayTeamGoals) {
      acc += 1;
    }
    return acc;
  }, 0);
  return totalDraws;
};

const getTotalLosses = (matches: Array<IMatch>, team: ITeam) : number => {
  let totalLosses = 0;

  matches.forEach((currentTeam) => {
    if (team.id === currentTeam.homeTeam && currentTeam.homeTeamGoals < currentTeam.awayTeamGoals) {
      totalLosses += 1;
    }
    if (team.id === currentTeam.awayTeam && currentTeam.awayTeamGoals < currentTeam.homeTeamGoals) {
      totalLosses += 1;
    }
  });
  return totalLosses;
};

const getGoalsFavor = (matches: IMatch[], team: ITeam) => {
  let goals = 0;
  matches.forEach((match) => {
    if (match.homeTeam === team.id) {
      goals += match.homeTeamGoals;
    }
    if (match.awayTeam === team.id) {
      goals += match.awayTeamGoals;
    }
  });
  return goals;
};

const getGoalsOwn = (matches: IMatch[], team: ITeam) => {
  let goalOwn = 0;
  matches.forEach((match) => {
    if (match.homeTeam === team.id) {
      goalOwn += match.awayTeamGoals;
    }
    if (match.awayTeam === team.id) {
      goalOwn += match.homeTeamGoals;
    }
  });
  return goalOwn;
};

const getGoalsBalance = (matches: IMatch[], team: ITeam) => {
  const goalsBalance = getGoalsFavor(matches, team) - getGoalsOwn(matches, team);
  return goalsBalance;
};

const getTotalPoints = (matches: IMatch[], team: ITeam) => {
  const totalPoints = (getTotalWins(matches, team) * 3)
  + getTotalDraws(matches);
  return totalPoints;
};

const getEfficiency = (matches: IMatch[], team: ITeam) => {
  const PERCENTAGE = 100;
  const totalGames = getTotalGames(matches);
  const totalPoints = getTotalPoints(matches, team);
  const efficiency = (totalPoints / (totalGames * 3)) * PERCENTAGE;
  return Number.parseFloat(efficiency.toFixed(2));
};

/**
 * ordenar por múltiplos parametros
 * referência https://dev.to/markbdsouza/js-sort-an-array-of-objects-on-multiple-columns-keys-2bj1
 */
const sortTeams = (teams: Array<ILeaderBoard>) => teams.sort((teamA, teamB) => (
  teamB.totalPoints - teamA.totalPoints
  || teamB.totalVictories - teamA.totalVictories
  || teamB.goalsBalance - teamA.goalsBalance
  || teamB.goalsFavor - teamA.goalsFavor
  || teamB.goalsOwn - teamA.goalsOwn
));

export {
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
};
