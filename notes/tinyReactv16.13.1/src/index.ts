'use strict';

import * as React from './tinyReact/packages/react/index';
import * as ReactDOM from './tinyReact/packages/react-dom/index';

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

const jsx1 = React.createElement('div', null, 'react');

console.log('Hello World!', jsx);

console.log('isValidElement', React.isValidElement(jsx));

const root = document.getElementById('root');

ReactDOM.render(jsx1, root, () => {
  console.log('render callback');
});
