import React, { render } from './react/index';

const tsx = <div>Hello</div>;
console.log('tsx', tsx);

const root = document.getElementById('root');
render(tsx, root!);
