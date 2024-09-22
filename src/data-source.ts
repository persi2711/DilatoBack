const { DataSource } = require('typeorm');
require('dotenv').config();

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL, // Usa la cadena de conexión completa aquí
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*.ts'],
  synchronize: false,
  logging: true,
});
module.exports = AppDataSource;
