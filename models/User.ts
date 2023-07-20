import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database';

// Define the attributes of the User model
interface UserAttributes {
  id: number;
  username: string;
  password: string;
}

// Define the optional attributes for creating a User instance
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define the User model by extending the Sequelize Model class
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;
}

// Initialize the User model with the table structure and configuration
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  }
);

export { User };
