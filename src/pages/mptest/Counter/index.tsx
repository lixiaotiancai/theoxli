import React, { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <button onClick={() => setCount(count - 1)}>-</button>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>+</button>
      <div onClick={clickHandle}>跳转</div>
    </div>
  )
}

function clickHandle() {
  if ("undefined" != typeof window.wx && window?.wx.getSystemInfoSync) {
    window?.wx?.navigateTo({
      url: '../index/index?id=1'
    })
  } else {
    location.href = 'log.html'
  }
}

export default Counter