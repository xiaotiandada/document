import React, { render } from "./react";

const jsx = (
  <div>
    <p>Hello React</p>
    <p>Hello Fiber</p>
  </div>
);

const root = document.getElementById("root");
render(jsx, root);
