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
    "username": "lioaqhdhoklmiz",
    "password": "d0d9f4e9f13b302e2506988ee7ea7b4cfb684dbf9538bf3a77a8e9b95faa89da",
    "database": "d6a9lt4gimo5ol",
    "host": "ec2-3-224-125-117.compute-1.amazonaws.com",
    "dialect": "postgres",
    "migrationStorage": "sequelize",
    "seederStorage": "sequelize",
    "define": {
      "timestamps": true,
      "underscored": true
    }
  }
}
