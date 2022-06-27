import React, { render } from './react/index';

// const tsx = (
//   <div title="wrapper" className="wrapper">
//     <div title="div1">
//       <div title="div1 - 1">
//         <div title="div1 - 1 - 1">Hello</div>
//         <div title="div1 - 1 - 2">Hello1</div>
//       </div>
//     </div>
//     <div title="div2">
//       <div title="div2 - 1">World</div>
//       <div title="div2 - 2">World1</div>
//     </div>
//     <div title="div3">fiber</div>
//     React
//   </div>
// );
const tsx = (
  <div className="container">
    <h1 data-test="test">你好 Tiny React</h1>
    <h2>(编码必杀技)</h2>
    <div>
      嵌套1 <div>嵌套 1.1</div>
    </div>
    <h3>(观察: 这个将会被改变)</h3>
    {2 === 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 === 2 && <div>2</div>}
    <span>这是一段内容</span>
    <button onClick={() => alert('你好')}>点击我</button>
    <h3>这个将会被删除</h3>
    2, 3<input type="text" value="123"></input>
    <input type="checkbox" checked={true} />
    <input type="checkbox" checked={false} />
  </div>
);
console.log('tsx', tsx);

const root = document.getElementById('root');
render(tsx, root!);
