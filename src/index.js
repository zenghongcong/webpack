import { cube } from './math.js';
import header from './header.html';
import printMe from './print.js';
import './style.css';

var element = document.createElement('pre');
element.innerHTML = [
    'Hello webpack!',
    '5 cubed is equal to ' + cube(5)
].join('\n\n');
document.body.appendChild(element);