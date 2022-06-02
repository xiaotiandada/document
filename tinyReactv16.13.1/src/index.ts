'use strict';

import * as React from './tinyReact/packages/react/index';

/*#__PURE__*/
const jsx = React.createElement(
  'div',
  {
    title: 'title',
  },
  /*#__PURE__*/ React.createElement(
    'div',
    {
      title: 'hello',
    },
    'Hello'
  ),
  // @ts-ignore
  /*#__PURE__*/ React.createElement(
    'div',
    {
      title: 'world',
    },
    'World'
  )
);

console.log('Hello World!', jsx);

console.log('isValidElement', React.isValidElement(jsx));
