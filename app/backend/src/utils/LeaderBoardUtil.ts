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
