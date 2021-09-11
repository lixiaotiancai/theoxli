import { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { isMiniProgram } from './env';

/**
 * 入口dom render
 *
 * @param {ReactElement} el
 */
function createApp(el: ReactElement) {
  return () => {
    const container = document.createElement('div');
    container.id = 'app';
    document.body.appendChild(container);

    ReactDOM.render(el, container);
  };
}

/**
 * 入口同构
 *
 * @export
 * @param {ReactElement} el
 * @return {*}
 */
export function initApp(el: ReactElement) {
  if (isMiniProgram) {
    return createApp(el);
  }
  return createApp(el)();
}
