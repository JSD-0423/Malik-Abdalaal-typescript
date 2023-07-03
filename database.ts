import { Sequelize } from 'sequelize';

// Create a new Sequelize instance with the database credentials
const sequelize = new Sequelize('bookstore', 'root', 'root@123', {
  host: '127.0.0.1',
  dialect: 'mysql',
  
});

export { sequelize };
