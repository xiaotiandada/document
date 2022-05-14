import isFunctionalComponent from "./isFunctionalComponent";
import mountNativeElement from "./mountNativeElement";

export default function mountComponent(virtualDOM, container, oldDOM) {
  let nextVirtualDOM = null;
  let component = null;
  if (isFunctionalComponent(virtualDOM)) {
    nextVirtualDOM = bindFunctionComponent(virtualDOM);
  } else {
    nextVirtualDOM = bindClassComponent(virtualDOM);
    // 获取组件实例对象
    component = nextVirtualDOM.component;
  }
  console.log("nextVirtualDOM", nextVirtualDOM);

  if (isFunctionalComponent(nextVirtualDOM)) {
    mountComponent(nextVirtualDOM, container, oldDOM);
  } else {
    mountNativeElement(nextVirtualDOM, container, oldDOM);
  }

  // 如果组件实例对象存在的话
  if (component) {
    // 生命周期函数
    component.componentDidMount();
    // 判断组件实例对象身上是否有 props 属性 props 属性中是否有 ref 属性
    if (component.props && component.props.ref) {
      component.props.ref(component);
    }
  }
}

function bindFunctionComponent(virtualDOM) {
  return virtualDOM.type(virtualDOM.props || {});
}

function bindClassComponent(virtualDOM) {
  const component = new virtualDOM.type(virtualDOM.props || {});
  const nextVirtualDOM = component.render();
  nextVirtualDOM.component = component;
  return nextVirtualDOM;
}
