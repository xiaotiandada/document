import React from "react";
// import React from "./react";
// const { createElement, Component } = React;

console.log("React", React);

class PureComponents extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
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

let virtualDOM = (
  <div id="A1" key="A1">
    <div id="B1" key="B1">
      B1
    </div>
    <div id="B2" key="B2">
      B2
    </div>
  </div>
);
console.log("virtualDOM", virtualDOM);

const createElementData = createElement(
  "div",
  {
    id: "A1",
    key: "A1",
  },
  createElement(
    "span",
    {
      id: "B1",
      key: "B1",
    },
    "B1"
  ),
  createElement(
    "div",
    {
      id: "B2",
      key: "B2",
    },
    "B2"
  )
);
console.log("createElementData", createElementData);

function FunctionComponents() {
  return virtualDOM;
}

let functionVirtualDom = <FunctionComponents />;

console.log("functionVirtualDom", functionVirtualDom);

class ClassComponents extends Component {
  render() {
    return virtualDOM;
  }
}

const classVirtualDom = <ClassComponents />;

console.log("classVirtualDom", classVirtualDom);
