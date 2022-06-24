import isFunction from "./isFunction";
import mountComponent from "./mountComponent";
import mountNativeElement from "./mountNativeElement";

export default function mountElement(virtualDOM, container, oldDOM) {
  // 无论是类组件还是函数组件 其实本质上都是函数
  // 如果 Virtual DOM 的 type 属性值为函数 就说明当前这个 Virtual DOM 为组件

  // Components
  if (isFunction(virtualDOM)) {
    // 如果是组件 调用 mountComponent 方法进行组件渲染
    mountComponent(virtualDOM, container, oldDOM);
  } else {
    // NativeElement
    mountNativeElement(virtualDOM, container, oldDOM);
  }
}
