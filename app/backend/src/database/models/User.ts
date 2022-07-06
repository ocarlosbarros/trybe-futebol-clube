import { Model, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  public userName: string;
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
  underscored: true,
  sequelize: db,
  modelName: 'user',
  timestamps: false,
});

export default User;
