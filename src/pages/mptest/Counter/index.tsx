import React from 'react';

function Counter() {
  return <div dangerouslySetInnerHTML={{ __html: '123' }}></div>;
}

export default Counter;
