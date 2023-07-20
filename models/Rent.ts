import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database';

// Define the attributes of the Rent model
interface RentAttributes {
  id: number;
  userId: number;
  bookId: number;
  rentedAt: Date;
}

// Define the optional attributes for creating a Rent instance
interface RentCreationAttributes extends Optional<RentAttributes, 'id'> {}

// Define the Rent model by extending the Sequelize Model class
class Rent extends Model<RentAttributes, RentCreationAttributes> implements RentAttributes {
  public id!: number;
  public userId!: number;
  public bookId!: number;
  public rentedAt!: Date;
}

// Initialize the Rent model with the table structure and configuration
Rent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rentedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Rent',
    tableName: 'rents',
  }
);

export { Rent };
