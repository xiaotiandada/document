import React, { render } from './react/index';

const tsx = React.createElement(
  'div',
  null,
  React.createElement('div', null, 'hello'),
  React.createElement('div', null, 'world'),
  'react'
);

const root = document.getElementById('root');
render(tsx, root);

console.log('fiber', tsx);
