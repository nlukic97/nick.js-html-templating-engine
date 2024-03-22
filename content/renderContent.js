// now try to replace this actually
/* function renderContent(content){
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
    </head>
    <body>
    ${content}
    </body>
    </html>
    `
} */

const fs = require('node:fs');


function renderContent(content){
    return new Promise((resolve, reject)=>{
        fs.readFile('./content/code.html', 'utf8', (err, data) => {
            if (err) {
                return reject(err)
            }

            data = data.replace('<!-- $content$ -->',content)
            return resolve(data)
        })
    })
    
}

module.exports = {renderContent}