const SnakeNamingStrategy = require("typeorm-naming-strategies").SnakeNamingStrategy;

/**
 * Went to this approach due to limitations on typeORM when
 * loading env variables from both .env and ormconfig.js
 * (which is needed for naming strategy setting) simultaneously.
 */

module.exports = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE_NAME,
  logging: false,
  entities: [
     "src/modules/**/*.entity.ts"
  ],
  migrations: [
     "src/migration/**/*.ts"
  ],
  subscribers: [
     "src/modules/**/*.subscriber.ts"
  ],
  migrationsRun: true,
  synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
};