console.log("tiny react");
import TinyReact from "./TinyReact";

const virtualDOM = (
  <div className="container">
    <h1 data-test="test">你好 Tiny React</h1>
    <h2>(编码必杀技)</h2>
    <div>
      嵌套1 <div>嵌套 1.1</div>
    </div>
    <h3>(观察: 这个将会被改变)</h3>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    <span>这是一段内容</span>
    <button onClick={() => alert("你好")}>点击我</button>
    <h3>这个将会被删除</h3>
    2, 3<input type="text" value="123"></input>
    <input type="checkbox" checked={true} />
    <input type="checkbox" checked={false} />
  </div>
);

const modifyVirtualDOM = (
  <div className="container">
    <h1 data-test="test-modify">你好 Tiny React</h1>
    <h2>(编码必杀技)</h2>
    <div>
      嵌套1 <div>嵌套 1.1</div>
    </div>
    <h3>(观察: 这个将会被改变)</h3>
    {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
    {2 == 2 && <div>2</div>}
    <button onClick={() => alert("你好 modify")}>点击我</button>
    <input type="text" value="123"></input>
    <input type="checkbox" checked={true} />
    <input type="checkbox" checked={false} />
  </div>
);

const root = document.getElementById("root");

const Demo = () => <span>&hearts;</span>;
const Heart = (props) => (
  <div>
    <h1>Hello</h1>
    word
    <Demo />
    {props.title}
  </div>
);

// TinyReact.render(virtualDOM, root)
// setTimeout(() => {
//   TinyReact.render(modifyVirtualDOM, root)
// }, 2000)
// TinyReact.render(<Heart title="Hello React" />, root)

class Alert extends TinyReact.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "default title",
    };

    // 更改 handleChange 方法中的 this 指向 让 this 指向类实例对象
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    // 调用父类中的 setState 方法更改状态
    console.log("handleChange", this.state);
    this.setState({
      title: "changed title" + " " + Date.now(),
    });
  }

  componentWillReceiveProps() {
    console.log("componentWillReceiveProps");
  }
  componentWillUpdate() {
    console.log("componentWillUpdate");
  }
  componentDidUpdate() {
    console.log("componentDidUpdate");
  }

  render() {
    console.log("this", this.state);
    return (
      <div>
        {this.props.name}
        {this.props.age}
        <br />
        Hello Class Component
        <br />
        {this.state.title}
        <br />
        <button onClick={this.handleChange}>change</button>
      </div>
    );
  }
}
// TinyReact.render(<Alert name="zhangsan" age={18} />, root);
// setTimeout(() => {
// TinyReact.render(<Alert name="zhangsan123" age={20} />, root);
// TinyReact.render(<Heart title="Hello React" />, root);
// }, 2000);

class DemoRef extends TinyReact.Component {
  constructor(props) {
    super(props);
  }

  handle() {
    let value = this.input.value;
    console.log(value);
    console.log(this.alert);
  }
  componentDidMount() {
    console.log("componentDidMount");
  }
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }
  render() {
    console.log("this", this.state);
    return (
      <div>
        <input type="text" ref={(input) => (this.input = input)} />
        <button onClick={this.handle.bind(this)}>按钮</button>
        <Alert
          name="zhangsan123"
          age={20}
          ref={(alert) => (this.alert = alert)}
        />
      </div>
    );
  }
}

// TinyReact.render(<DemoRef />, root);

class KeyDemo extends TinyReact.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [
        {
          id: 1,
          name: "张三1",
        },
        {
          id: 2,
          name: "张三2",
        },
        {
          id: 3,
          name: "张三3",
        },
        {
          id: 4,
          name: "张三4",
        },
      ],
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const newState = JSON.parse(JSON.stringify(this.state));
    // newState.persons.push(newState.persons.shift());
    newState.persons.splice(1, 0, { id: 100, name: "100" });
    // newState.persons.splice(1, 1, { id: 100, name: "100" });
    // newState.persons.pop();
    this.setState(newState);
    // this.setState({
    //   persons: [
    //     {
    //       id: 4,
    //       name: "张三4",
    //     },
    //     {
    //       id: 2,
    //       name: "张三2",
    //     },
    //     {
    //       id: 3,
    //       name: "张三3",
    //     },
    //     {
    //       id: 1,
    //       name: "张三1",
    //     },
    //   ],
    // });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.persons.map((person) => (
            <li key={person.id}>
              {person.name}
              <DemoRef></DemoRef>
            </li>
          ))}
        </ul>
        <button onClick={this.handleClick}>按钮</button>
      </div>
    );
  }
}
TinyReact.render(<KeyDemo />, root);

console.log(virtualDOM);
