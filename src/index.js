// CSS/Less
import './css/style.less';

// JS
import {xhttpRequest, output, searchArr, outputLoop, clear, filePath, goBack, copy, md} from './js/utilities';


//This sets up the file finder
var finder = require('findit').find('wiki');

//This listens for directories found
finder.on('directory', function (dir) {
  console.log('Directory: ' + dir + '/');
});

//This listens for files found
finder.on('file', function (file) {
  console.log('File: ' + file);
});

//// Content/DOM Manipulation

// Wiki data
xhttpRequest('./wiki.php', function(result){
    let wikiArticles = Array.from(JSON.parse(result));
    wikiArticles.forEach((wikiArticle, index) => {
        xhttpRequest(filePath(wikiArticle.file), function(result){ 
            wikiArticle.content = md.render(result);
            if(index === (wikiArticles.length-1)){
                requestCompleted();
            }
        });
    });
    function requestCompleted(){

        // Clear
        clear();
        
        // Markdown - Random Article
        searchArr(null, wikiArticles, 'Random Article', null, (result) => {

            if(result.length > 0){
                output('section', 'ul');
                outputLoop(result);

                // Output go back 
                output('section', 'a', ['back', 'btn'], 'Go back', null, () => {
                    goBack();
                });
            }else {
                output('section', 'article', null, 'Unfortunately nothing has been found.');
            }

        });

        // A - Z web terms
        searchArr('index', wikiArticles, 'Index', null, (result) => {

            if(result.length > 0){
                output('section', 'ul');
                outputLoop(result);

                // Output go back 
                output('section', 'a', ['back', 'btn'], 'Go back', null, () => {
                    goBack();
                });
            }else {
                output('section', 'article', null, 'Unfortunately nothing has been found.');
            }

        });

        // Search
        searchArr('search', wikiArticles, 'Search Results', null, (result) => {

            if(result.length > 0){
                output('section', 'ul');
                outputLoop(result);

                // Output go back 
                output('section', 'a', ['back', 'btn'], 'Go back', null, () => {
                    goBack();
                });
            }else {
                output('section', 'article', null, 'Unfortunately nothing has been found.');
            }

        });
        

        // Content
        searchArr('article', wikiArticles, null, true, (result) => {

            if(result.length > 0){
                // Clear
                clear();

                // Output content
                output('section', 'article', null, result[0].content);

                // Output go back 
                output('article', 'a', ['back', 'btn'], 'Go back', null, () => {
                    goBack();
                });

                // Output Copy
                output('article', 'a', ['copy', 'btn'], 'Copy', null, () => {
                    copy(result.content);
                });

            }
        });
    }
});




//// TODO

// Search = DONE

// Copy article

// Learn More refresh content the whole page content = DONE

// A - Z articles - DONE

// Get articles without PHP

