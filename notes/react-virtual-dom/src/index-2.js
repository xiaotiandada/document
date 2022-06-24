import React from "react";
import ReactDom from "react-dom";
// import React from "./react";
// const { createElement, Component } = React;

console.log("React", React);

class PureComponents extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    console.log("nextProps", nextProps, nextState);
    return (
      shallowEqual(nextProps, this.props) && shallowEqual(nextState, this.state)
    );
  }
}

function shallowEqual(object1, object2) {
  if (object1 === object2) {
    return true;
  }

  if (
    typeof object1 !== "object" ||
    object1 === null ||
    object2 !== "object" ||
    object2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let i = 0; i < keys1.length; i++) {
    if (
      !hasOwnProperty.call(object2, keys1[i]) ||
      object1[keys1[i]] !== object2[keys1[i]]
    ) {
      return false;
    }
  }

  return true;
}

class ClassComponents extends PureComponents {
  state = { number: 0 };
  handleClick = () => {
    setTimeout(() => console.log(this.state.number), 1000); //1
    this.setState({ number: this.state.number + 1 });
  };

  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
}

function FunctionComponent() {
  let [number, setNumber] = React.useState(0);
  let handleClick = () => {
    setTimeout(() => console.log(number), 3000);
    setNumber(number + 1);
  };
  return (
    <div>
      <p>{number}</p>
      <button onClick={handleClick}>+</button>
    </div>
  );
}

ReactDom.render(<ClassComponents />, document.getElementById("root"));
