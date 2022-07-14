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
