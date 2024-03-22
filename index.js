const express = require('express');
const { createServer } = require('node:http');

const {render} = require('./content/renderContent')

const app = express();
const server = createServer(app);

app.get('/', async (_, res) => {
    try {
        return res.send(await render('./content/index.html'));
    } catch(err){
        return res.status(500).end(err)
    }
});

server.listen(3000, () => {
  return console.log('Server running at http://localhost:3000');
});