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

// Routes
app.get('/', renderHtml('./content/index.html'));
app.get('/about', renderHtml('./content/about.html'));


server.listen(3000, () => console.log('Server running at http://localhost:3000'));