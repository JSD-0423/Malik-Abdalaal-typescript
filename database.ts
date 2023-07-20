import { Sequelize } from 'sequelize';

const Book = require('./models/Book'); 
const User = require('./models/User'); 
const Rent = require('./models/Rent');

// Create a new Sequelize instance with the database credentials
export const sequelize = new Sequelize('bookstore', 'root', 'root@123', {
  host: '127.0.0.1',
  dialect: 'mysql',
  
});


const models = {
  Book,
  User,
  Rent,
};

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

module.exports = {
  sequelize,
  ...models,
};