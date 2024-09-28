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
                    const content = await fs.promises.readFile(`./content/${component.componentPath}`, 'utf8');
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

module.exports = {render}