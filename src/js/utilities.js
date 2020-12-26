//// Dependencies

// Add in 'fs'
const fs = require('fs');
fs.readdir('./css', (err, files) => {
    files.forEach(file => {
      console.log(file);
    });
  });

// Add Markdown Parser
var MarkdownIt = require('markdown-it'), md = new MarkdownIt();


//// Utility functions

// Collection
function getCollection(selector = null){
    const $collection = document.querySelectorAll(selector);
    if($collection){
        return $collection;
    }
}

// Loop & action
function loop(collection = null,action = null,args = null){
    if(collection){
        collection.forEach(item => {
            if(action == 'addClass' && args){
                item.classList.add(args);
                return;
            }
            if(action == 'XMLHttpRequest' && args){
                const xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        item.innerHTML = md.render(xhttp.responseText);
                    }
                };
                xhttp.open("GET", args, true);
                xhttp.send();
            }
        });
    }
} 

// Random Number
function randNum(num){
    return Math.floor(Math.random() * num);
}

// Export
export {getCollection, loop}

// Directories
/*const dirTree = require("directory-tree");
console.log('dirTree ' + dirTree);*/
