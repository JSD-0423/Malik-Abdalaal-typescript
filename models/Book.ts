import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../database';

// Define the attributes of the Book model
interface BookAttributes {
  id: number;
  title: string;
  author: string;
}

// Define the optional attributes for creating a Book instance
interface BookCreationAttributes extends Optional<BookAttributes, 'id'> {}

// Define the Book model by extending the Sequelize Model class
class Book extends Model<BookAttributes, BookCreationAttributes> implements BookAttributes {
  public id!: number;
  public title!: string;
  public author!: string;
}

// Initialize the Book model with the table structure and configuration
Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Book',
    tableName: 'books',
  }
);

export { Book };
