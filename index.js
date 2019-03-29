const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');


const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

// C
server.post('/api/zoos', async (req, res) => {
  try {
    const [ id ] = await db('zoos')
      .insert(req.body);
    const zoo = await db('zoos')
      .where({ id })
      .first();
    res.status(201).json(zoo)
  } catch (err) {
    res.status(500).json({ message: 'Could not add zoo' })
  }
})

// R
server.get('/api/zoos', async (req, res) => {
  try {
    const zoos = await db('zoos');
    res.status(200).json(zoos)
  } catch (err) {
    res.status(500).json({ message: "Could not retrieve zoos" })
  }
})

server.get('/api/zoos/:id', async (req, res) => {
  try {
    const zoo = await db('zoos')
    .where({ id: req.params.id})
    if (zoo.length === 0) {
      res.status(404).json({ error: "That id does not exist" })
    } else {
      res.status(200).json(zoo);
    }
  } catch (err) {
    res.status(500).json({ message: "Could not retrieve requested zoo" })
  }
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
