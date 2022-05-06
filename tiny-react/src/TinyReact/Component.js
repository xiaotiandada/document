import diff from "./diff"

export default class Component {
  constructor(props) {
    this.props = props
  }

  setState(state) {
    // setState 方法被子类调用 此处this指向子类实例对象
    // 所以改变的是子类的 state 对象
    // console.log('setState', state, this.state)
    this.state = Object.assign({}, this.state, state)

    // 通过调用 render 方法获取最新的 Virtual DOM
    let virtualDOM = this.render()
    console.log('virtualDOM', virtualDOM)
    
    // 获取页面中正在显示的 DOM 对象 通过它可以获取其对象的 Virtual DOM 对象
    let oldDOM = this.getDOM()

    console.log('oldDOM', oldDOM)

    let container = oldDOM.parentNode
    diff(virtualDOM, container, oldDOM)
  }
  // 保存 DOM 对象的方法
  setDOM(dom) {
    this._dom = dom
  }

  // 获取 DOM 对象的方法
  getDOM() {
    return this._dom
  }
}