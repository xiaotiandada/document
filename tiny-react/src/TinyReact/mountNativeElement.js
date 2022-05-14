import mountElement from "./mountElement";
import createDOMElement from "./createDOMElement";
import unmmountNode from "./unmmountNode";

export default function mountNativeElement(virtualDOM, container, oldDOM) {
  const newElement = createDOMElement(virtualDOM);

  if (oldDOM) {
    container.insertBefore(newElement, oldDOM);
  } else {
    // 将转换之后的 DOM 对象放置在页面中
    container.appendChild(newElement);
  }

  // 如果旧的DOM对象存在 删除
  if (oldDOM) {
    unmmountNode(oldDOM);
  }

  // 获取组件实例对象
  const component = virtualDOM.component;
  // 如果组件实例对象存在
  if (component) {
    // 保存 DOM 对象
    component.setDOM(newElement);
  }
}
