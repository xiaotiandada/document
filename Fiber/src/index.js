import React, { render, Component } from "./react";

const jsx = (
  <div>
    <p>Hello React</p>
    <p>Hello Fiber</p>
  </div>
);

const root = document.getElementById("root");
// render(jsx, root);

// setTimeout(() => {
//   const jsx = (
//     <div>
//       <div>Fiber</div>
//       {/* <p>Hello Fiber</p> */}
//     </div>
//   );

//   render(jsx, root);
// }, 2000);

class Greating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "张三",
    };
  }

  render() {
    return (
      <div>
        {this.props.title} hahahaha {this.state.name}
        <button onClick={() => this.setState({ name: "李四" })}>button</button>
      </div>
    );
  }
}

render(<Greating title="class" />, root);

function FnComponent(props) {
  return <div>{props.title} FnComponent</div>;
}

// render(<FnComponent title="hello" />, root);
