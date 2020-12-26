// CSS/Less
import './css/style.less';

// JS
import {getCollection,loop} from './js/utilities';

//// Content/DOM Manipulation

// Markdown - Random Article
loop(getCollection('.random-article'), 'XMLHttpRequest', 'content/dns.md');

// TODO

// Search

// Copy article

// Learn More refresh content the whole page content

// A - Z web terms

// A - Z clients

// Date ordering for client