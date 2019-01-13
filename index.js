const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

const PORT = 5000;

// GET ENDPOINTS
server.get('/api/projects', (req,res) => {
    db('projects').then(rows => {
        res.json(rows);
    }).catch(err => {
        res.status(500).json({err: "Can't retrieve project data"})
    })
})

server.get('/api/actions', (req,res) => {
    db('actions').then(rows => {
        res.json(rows);
    }).catch(err => {
        res.status(500).json({err: "Can't retrieve action data"})
    })
})

// POST ENDPOINTS

server.post('/api/projects', (req, res) => {
    const project = req.body;
    console.log('project info', project)
    db('projects').insert(project)
        .then(ids => {
            res.status(201).json(ids);
        }).catch(err => {
            res.status(500).json({err: 'Failed to insert project data'})
    });
});

server.post('/api/actions', (req,res) =>{
    const action = req.body;
    console.log('action info', action);
    db('actions').insert(action)
    .then(ids => {
        res.status(201).json(ids);
    }).catch(err => {
        res.status(500).json({err: 'Failed to insert action'})
    })
})

server.listen(PORT, function() {
    console.log(`Server listening on port ${PORT}`);
})
