const express = require('express');
const { createServer } = require('node:http');

const {renderContent} = require('./content/renderContent')

const app = express();
const server = createServer(app);

app.get('/', async (_, res) => {
    try {
        const content = '<h1>Home page</h1>'
        return res.send(await renderContent(content));
    } catch(err){
        return res.send(err)
    }
});

app.get('/about', async (_, res) => {
    try {
        const content = '<h1>About page</h1>'
        return res.send(await renderContent(content));
    } catch(err){
        return res.send(err)
    }
});

app.get('*', async (_, res) => {
    try {
        const content = `
        <h1>404 - not found</h1>
        <div>
            <a href="/">Go to Home page</a><br/>
            <a href="/">Go to About page</a><br/>
        </div>
        `
        return res.send(await renderContent(content));
    } catch(err){
        return res.send(err)
    }
});

server.listen(3000, () => {
  return console.log('Server running at http://localhost:3000');
});