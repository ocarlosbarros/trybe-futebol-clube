import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './Team';

class Match extends Model {
  public homeTeam: number;
  public homeTeamGoals: number;
  public awayTeam: number;
  public awayTeamGoals: number;
  public inProgress: boolean;
}

Match.init({
  homeTeam: INTEGER,
  homeTeamGoals: INTEGER,
  awayTeam: INTEGER,
  awayTeamGoals: INTEGER,
  inProgress: BOOLEAN,

}, {
  underscored: true,
  sequelize: db,
  modelName: 'match',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

Team.belongsTo(Match, { foreignKey: 'homeTeam', as: 'teamHome' });
Team.belongsTo(Match, { foreignKey: 'awayTeam', as: 'teamAway' });

Match.hasMany(Team, { foreignKey: 'id', as: 'homeTeam' });
Match.hasMany(Team, { foreignKey: 'id', as: 'awayTeam' });

export default Match;
