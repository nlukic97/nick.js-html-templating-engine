const fs = require('node:fs');


function render(path){
    return new Promise(async (resolve, reject)=>{        
        try {
            // getting html code
            let indexPage = await fs.promises.readFile(path, 'utf8')
            
            // finding all text in html code such as <@components/Nav.nick> that 
            // need to be replaed with the real component
            const componentRegex = /<@([^>]+)>/g;
            
            
            let crawled = false
            while(crawled === false){
                let match;
                const componentsToReplace = [];
                while ((match = componentRegex.exec(indexPage)) !== null) {
                    componentsToReplace.push({ fullMatch: match[0], componentPath: match[1] });
                }
    
                // going through each found component import, and replacing it with code found
                // in component filepath
                for (const component of componentsToReplace) {
                    const content = await fs.promises.readFile(`./src/${component.componentPath}`, 'utf8');
                    indexPage = indexPage.replace(component.fullMatch, content);
                }

                // checking current components to see if there are more to be updated   
                const isAMatch = indexPage.match(componentRegex)
                if(!isAMatch){
                    crawled = true
                }
            }

            // returning full html code
            return resolve(indexPage)
        } catch(err){
            return reject('500 - Server Error')
        }
    })
    
}

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

module.exports = {view: renderHtml}