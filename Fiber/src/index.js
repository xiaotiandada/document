import React, { render, Component } from "./react";

const jsx = (
  <div>
    <p>Hello React</p>
    <p>Hello Fiber</p>
  </div>
);

const root = document.getElementById("root");
// render(jsx, root);

class Greating extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>hahahaha</div>;
  }
}

render(<Greating />, root);
