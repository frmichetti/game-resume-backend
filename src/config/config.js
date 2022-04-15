module.exports = {
  "development": {
    "username": "postgres",
    "password": "postgres",
    "database": "mgr_dev",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "migrationStorage": "sequelize",
    "seederStorage": "sequelize",
    "define": {
      "timestamps": true,
      "underscored": true
    }
  },
  "test": {
    "username": "postgres",
    "password": "postgres",
    "database": "mgr_test",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "migrationStorage": "sequelize",
    "seederStorage": "sequelize",
    "define": {
      "timestamps": true,
      "underscored": true
    }
  },
  "production": {
    "use_env_variable": 'DATABASE_URL',
    "dialect": 'postgres',
    "protocol": 'postgres',
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false,
      },
      "migrationStorage": "sequelize",
      "seederStorage": "sequelize",
      "define": {
        "timestamps": true,
        "underscored": true
      }
    }
  }
}
