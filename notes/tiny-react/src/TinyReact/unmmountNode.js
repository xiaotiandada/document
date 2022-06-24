export default function unmmountNode(node) {
  // 获取节点对应的 virtualDOM 对象
  const virtualDOM = node._virtualDOM;
  // 如果要删除的节点时文本
  if (virtualDOM.type === "text") {
    // 直接删除节点
    node.remove();
    // 阻止程序向下运行
    return;
  }

  // 查看节点是否由组件生成
  const component = virtualDOM.component;
  // 如果由组件生成
  if (component) {
    // 调用组件卸载生命周期函数
    component.componentWillUnmount();
  }

  // 如果节点具有 ref 属性 通过再次调用 ref 方法 将传递给组件的DOM对象删除
  if (virtualDOM.props && virtualDOM.props.ref) {
    virtualDOM.props.ref(null);
  }

  // 事件处理
  Object.keys(virtualDOM.props).forEach((propName) => {
    if (propName.slice(0, 2) === "on") {
      const eventName = propName.toLowerCase().slice(2);
      const eventHandle = virtualDOM.props[propName];
      node.removeEventListener(eventName, eventHandle);
    }
  });

  // 递归删除子节点
  if (node.childNodes.length > 0) {
    for (let i = 0; i < node.childNodes.length; i++) {
      // console.log("i", i);
      unmmountNode(node.childNodes[i]);
      // 不 i--，递归后步骤不会执行完
      i--;
      // console.log("i", i);
    }
  }

  node.remove();
}
