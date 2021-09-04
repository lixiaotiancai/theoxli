import React from 'react';
import { render } from 'react-dom';
import './index.scss';

const container = document.createElement('div')
container.id = 'app'
document.body.appendChild(container)

render(<div>啦啦啦我是小程序</div>, container);