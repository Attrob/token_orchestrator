"use strict";

const { Sequelize, DataTypes} = require('sequelize');
const { database_config } = require("../config/config");

const token_orchestrator = new Sequelize(
    database_config.database, 
    database_config.username, 
    database_config.password, 
    database_config
);

token_orchestrator.authenticate()
.then(() => {
    console.log("DB connection has been established successfully.");
}).catch((err) => {
    console.log("DB connection failed", JSON.stringify(err));
})

const db = {};

db.Sequelize = Sequelize;
db.token_orchestrator = token_orchestrator;

db.tokens = require("./token_orchestrator/tokens.js")(token_orchestrator, DataTypes);

module.exports = db;