import { Model, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  public username: string;
  public role: string;
  public email:string;
  public password:string;
}

User.init({
  userName: STRING,
  role: STRING,
  email: STRING,
  password: STRING,
}, {
  underscored: false,
  sequelize: db,
  modelName: 'user',
  timestamps: false,
});

export default User;
