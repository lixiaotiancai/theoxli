import React from 'react';
import { initApp } from '../../common/utils/isomorph';
import './index.scss';

function Index() {
  return (
    <>
      <h1>我是首页</h1>
    </>
  );
}

export default initApp(<Index />);
