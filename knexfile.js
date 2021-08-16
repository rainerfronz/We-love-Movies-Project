const path = require("path");

require("dotenv").config();

const {
  NODE_ENV = "development",
DEVELOPMENT_DATABASE_URL,
  PRODUCTION_DATABASE_URL,
} = process.env;
const URL = NODE_ENV === "production"
? process.env.PRODUCTION_DATABASE_URL
: process.env.DEVELOPMENT_DATABASE_URL;

module.exports = {
  development: {
    client: "postgresql",
    connection: "postgres://zanoeizl:bvSDupaIOjsVwV7AKfuQ256OpdGEKRxU@chunee.db.elephantsql.com/zanoeizl",
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  production: {
    client: "postgresql",
    connection: "postgres://zanoeizl:bvSDupaIOjsVwV7AKfuQ256OpdGEKRxU@chunee.db.elephantsql.com/zanoeizl",
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    useNullAsDefault: true,
  },
};
