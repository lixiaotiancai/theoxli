import React from 'react';
import { initApp } from '../../common/utils/isomorph';
import './index.scss';

function Index() {
  const onClick = () => {
    const $ = (id) => document.getElementById(id);
    if ($('fullpage').classList.contains('night')) {
      $('fullpage').classList.remove('night');
      $('switch').classList.remove('switched');
    } else {
      $('fullpage').classList.add('night');
      $('switch').classList.add('switched');
    }
  };

  return (
    <>
      <div id="fullpage">
        <div className="section">
          <div className="time-circle">
            <div className="sun"></div>
            <div className="moon">
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="stars">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className="water"></div>
          </div>
          <div id="intro-text">
            <h1 href="#">theo的小窝</h1>
            <h4>coming soon...</h4>
          </div>
          <div id="switch" className="switch" onClick={onClick}>
            <div id="circle" className="circle"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default initApp(<Index />);
