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
TinyReact.render(<Alert name="zhangsan" age={18} />, root);
setTimeout(() => {
  // TinyReact.render(<Alert name="zhangsan123" age={20} />, root);
  TinyReact.render(<Heart title="Hello React" />, root);
}, 2000);

console.log(virtualDOM);
