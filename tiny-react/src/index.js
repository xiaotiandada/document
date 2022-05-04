console.log('tiny react');
import TinyReact from './TinyReact'

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
      2, 3
      <input type="text" value="123"></input>
      <input type="checkbox"  checked={true} />
      <input type="checkbox"  checked={false} />
    </div>
  )

  const container = document.getElementById('root')

  const Demo = () => <span>&hearts;</span>
  const Heart = (props) => <div>
    <h1>Hello</h1>
    word
    <Demo />
    {props.title}
  </div>

  // TinyReact.render(virtualDOM, container)
  // TinyReact.render(<Heart title="Hello React" />, container)

  class Alert extends TinyReact.Component {
    constructor(props) {
      super(props)
    }
    render () {
      return <div>
        {this.props.name}
        {this.props.age}
        <br />
        Hello Class Component
      </div>
    }
  }
  TinyReact.render(<Alert name="zhangsan" age={18} />, container)

  console.log(virtualDOM)