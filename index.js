const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');


const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.get('/api/zoos', async (req, res) => {
  try {
    const zoos = await db('zoos');
    res.status(200).json(zoos)
  } catch (err) {
    res.status(500).json({ message: "Could not retrieve zoos" })
  }
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
