const express = require('express');
const { createServer } = require('node:http');

const {view} = require('./lib/renderer')

const app = express();
const server = createServer(app);

// added this as a middleware example
function test(req,res,next){
    next()
}


// Routes
app.get('/', test, view('index.html'));
app.get('/about', test, view("about.html"));


server.listen(3000, () => console.log('Server running at http://localhost:3000'));