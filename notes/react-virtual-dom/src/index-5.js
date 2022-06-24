import React from "react";
import ReactDOM from "react-dom";
class App extends React.Component {
  state = { list: new Array(10).fill(0) };
  add = () => {
    this.setState({ list: [...this.state.list, 1] });
  };
  render() {
    return (
      <ul>
        <input />
        <button onClick={this.add}>add</button>
        {this.state.list.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  }
}
let root = document.getElementById("root");
ReactDOM.render(<App />, root);
