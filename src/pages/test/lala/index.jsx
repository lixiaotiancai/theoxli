import { render } from 'react-dom';
import { App } from './App';
import './index.scss';

document.querySelector('h1').style = "color: blue";

render(App(), window.document.getElementById('page-container'));