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
    return <div>{this.props.title} hahahaha</div>;
  }
}

// render(<Greating title="class" />, root);

function FnComponent(props) {
  return <div>{props.title} FnComponent</div>;
}

render(<FnComponent title="hello" />, root);
