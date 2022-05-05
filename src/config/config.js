module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DATABASE_URL || 'mstodos',
    //user: process.env.DB_USER || 'root',
    //password: process.env.DB_PASS || 'root',
    options: {
      dialect: process.env.DB_DIALECT || 'postgres',
      use_env_variable: process.env.DATABASE_URL || false,
      //host: process.env.DATABASE_URL || 'localhost',
      dialectOptions: {
          require: true,
          ssl: {rejectUnauthorized: false},
      },
      // storage: process.env.DB_STORAGE || './src/db/verkstad.sqlite',
    },
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret',
  },
  log: {
    path: process.env.LOG_PATH || './src/log'
  }
};
