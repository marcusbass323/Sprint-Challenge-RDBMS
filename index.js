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
    console.log('project info', project);
    db('projects').insert(project)
        .then(ids => {
            res.status(201).json(ids)
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

//GET BY ID ENDPOINTS
server.get('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    db('projects').where('id', id)
        .then(rows => {
            res.json(rows);
        }).catch(err => {
        res.status(500).json({err: 'Failed to find project'})
    })
})

server.get('/api/actions/:id', (req, res) => {
    const { id } = req.params;
    db('actions').where('id', id)
        .then(rows => {
            res.json(rows);
        }).catch(err => {
        res.status(500).json({err: 'Failed to find action'})
    })
})

//PUT ENDPOINTS
server.put('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    const project = req.body;
    db('projects').where('id', id).update(project)
        .then(rowCount => {
        res.json(rowCount)
        }).catch(err => {
        res.status(500).json({err: 'Failed to update project record'})
    })
})

server.put('/api/actions/:id', (req, res) => {
    const { id } = req.params;
    const action = req.body;
    db('actions').where('id', id).update(action)
        .then(rowCount => {
        res.json(rowCount)
        }).catch(err => {
        res.status(201).json({err: 'Failed to update action'})
    })
})

// DELETE ENDPOINTS

server.delete('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    const project = req.body;
    db('projects').where('id', id).delete(project)
        .then(rowCount => {
            res.json(rowCount);
        }).catch(err => {
        res.status(201).json({err: 'Failed to delete project'})
    })
})

server.delete('/api/actions/:id', (req, res) => {
    const { id } = req.params;
    const action = req.body;
    db('actions').where('id', id).delete(action)
        .then(rowCount => {
            res.json(rowCount);
        }).catch(err => {
        res.status(201).json({err: 'Failed to delete action'})
    })
})

server.listen(PORT, function() {
    console.log(`Server listening on port ${PORT}`);
})
