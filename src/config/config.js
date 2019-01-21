module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'mstodos',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    options: {
      dialect: process.env.DB_DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: process.env.DB_STORAGE || './mstodos.sqlite',
    },
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret',
  }
};
