//// Dependencies

// Add Markdown Parser
var MarkdownIt = require('markdown-it'), md = new MarkdownIt();


//// Utility functions

// Random Number
function randNum(num = null){
    if(!isNaN(num)){
        return Math.floor(Math.random() * num);
    }
}


// File path
function filePath(file = null){
    if(file){
        return encodeURI('./wiki/'+file);
    }
}

// Collection, loop
function collection(selector = null, callback = null){
    const $collection = document.querySelectorAll(selector) || null;
    if($collection){
        $collection.forEach(item => {
            callback(item);
        });
    }
}

// XHTTP request
function xhttpRequest(file = null, callback = null){
    let output;
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            output = xhttp.responseText;
            callback !== null ? callback(output) : '';
        }
    };
    xhttp.open("GET", decodeURI(file), false);
    xhttp.send();
}

// Go back btn
function goBack(){
    collection('.back', item => {
        item.addEventListener('click', () => {
            window.history.back();
        });
    });
}

// Copy btn
function copy(data = null){
    if(data){
        collection('.copy', item => {
            item.addEventListener('click', (e) => {
                const $parentElem = e.target.parentNode;
                const $input = $parentElem ? $parentElem.querySelector('.copied') : null;
                if(!$input){
                    output('article', 'input', null, null, null, (item) => {
                        if(item.tagName === 'INPUT'){
                            item.setAttribute('type', 'text');
                            item.style.cssText = 'display:none;';
                            item.classList.add('copied');
                        }
                        if(data){
                            item.setAttribute('value', data);
                        }
                    });
                }
                if($input){
                    console.log('boo');
                    $input.focus();
                    $input.select();
                    alert('Successfully copied!');
                    document.execCommand('copy');
                    document.queryCommandSupported('copy');
                }
                e.preventDefault();
            });
        });
    }
}


// Search array
function searchArr(urlParam = null, arr = null, title = 'Random Article', file = null, callback = null){
    const urlSearch = urlParam ? window.location.search : null;

    if(urlSearch && urlSearch.indexOf(urlParam) > -1){
        const urlParams = new URLSearchParams(urlSearch);
        const term = urlParams.get(urlParam).toLowerCase();
        let result = file === true ? arr.filter(item => item.file.toLowerCase().indexOf(term) > -1) : arr.filter(item => item.content.toLowerCase().indexOf(term) > -1);

        // Clear
        clear();

        // Output
        output('section', 'h2', null, title);

        if(callback){
            callback(result);
        }else{
            output('section', 'article');
            output('article', 'p', null, 'Unfortunately nothing has been found.');
        }
    }

    if(urlParam == null){

        // Clear
        clear();

        // Output
        output('section', 'h2', null, title);

        // Output random
        output('section', 'article', null, arr[randNum(arr.length)].content);
    }
}

// Clear
function clear(elem = 'section'){
    const $elem = document.querySelector(elem);
    if($elem){
        $elem.innerHTML = '';
    }
}

// Output
function output(parentElem = null, elem = null, classes = null, innerhtml = null, readMore = null, callback = null){
    const $parentElem = document.querySelector(parentElem);
    const $elem = $parentElem ? document.createElement(elem) : null;
    if($elem){
        if($elem && innerhtml){
            $elem.innerHTML = innerhtml;
            $elem.innerHTML += readMore === true ? '<p><a href="#" class="back">Back</a></p>' : '';
        }
        if(classes){
            $elem.classList.add(...classes);
        }
        $parentElem.insertAdjacentElement('beforeEnd', $elem);
        if(callback){
            callback($elem);
        }
    }
}

// Output loop
function outputLoop(collection = null, callback = null){
    if(collection){
        collection.forEach(item => {
            if(item.file){
                let name = item.file.replace(/.md/gi, ' ').toUpperCase();
                let file = item.file;
                output('section ul', 'li', ['list-item'], '<a href="?article='+file+'" class="read-more" data-read-more="'+file+'">'+name+'</a>');
            }
            if(callback){   
                callback(item);
            }
        });
    }
}

// Export
export {xhttpRequest, output, outputLoop, searchArr, clear, goBack, copy, filePath, md}