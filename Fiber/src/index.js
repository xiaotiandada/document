import React, { render } from "./react";

const jsx = (
  <div>
    <p>Hello React</p>
  </div>
);

console.log("client");
console.log(jsx);

const root = document.getElementById("root");
render(jsx, root);
