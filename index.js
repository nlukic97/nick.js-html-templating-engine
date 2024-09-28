const express = require('express');
const { createServer } = require('node:http');

const {render} = require('./content/renderContent')

const app = express();
const server = createServer(app);

// method used to render a custom page
function renderHtml(path) {
    return async (_,res)=>{
        try {
            return res.send(await render(path));
        } catch(err){
            return res.status(500).end(err)
        }
    }
}

// added this as a middleware example
function test(req,res,next){
    next()
}


// Routes
app.get('/', test, renderHtml('./content/index.html'));
app.get('/about', test, renderHtml("./content/about.html"));


server.listen(3000, () => console.log('Server running at http://localhost:3000'));