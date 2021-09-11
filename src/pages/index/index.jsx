import React from 'react';
import { isMiniProgram } from '../../common/utils/env';
import { initApp } from '../../common/utils/isomorph';
import './index.scss';

function Index() {
  const onJump1 = () => {
    if (isMiniProgram) {
      wx.navigateTo({
        url: '/pages/mptest/index'
      })
    }
  }

  const onJump2 = () => {
    if (isMiniProgram) {
      wx.navigateTo({
        url: '/pages/testlala/index'
      })
    }
  }

  return (
    <>
      <h1>我是首页</h1>
      <p onClick={onJump1}>路由1</p>
      <p onClick={onJump2}>路由2</p>
    </>
  )
}

export default initApp(<Index />);
