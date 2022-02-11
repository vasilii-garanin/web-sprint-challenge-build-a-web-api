const express = require('express');
const server = express();

const cors = require('cors');

const projectRouter = require('./projects/projects-router');

const actionRouter = require('./actions/actions-router');

server.use(cors());

server.use(express.json());

server.use('/api/projects', projectRouter);

server.use('/api/actions', actionRouter);

server.get('/', (req, res) =>
{
    res.send(`
      <h2>Project&Action Page</h2>
      <p>Welcome to the Project&Action API</p>
    `);
});

server.use('*', (req, res) => 
{
    res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!` });
});


module.exports = server;
