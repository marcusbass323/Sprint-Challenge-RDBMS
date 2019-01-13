const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

const PORT = 5000;

server.listen(PORT, function() {
    console.log(`Server listening on port ${PORT}`);
})
