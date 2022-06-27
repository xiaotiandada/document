export default function updateNodeElement(
  newElement: any,
  virtualDOM: any,
  oldVirtualDOM = {}
) {
  let newProps = virtualDOM.props;

  if (virtualDOM.type === 'text') {
    virtualDOM.parent.stateNode.appendChild(
      document.createTextNode(newProps.textContent)
    );
    return;
  }

  Object.keys(newProps).forEach((propName) => {
    // console.log('pp', newProps);
    // 获取属性值
    const newPropsValue = newProps[propName];

    // 考虑属性名称是否以 on 开头 如果是就表示是个事件属性 onClick -> click
    if (propName.slice(0, 2) === 'on') {
      const eventName = propName.toLowerCase().slice(2);
      newElement.addEventListener(eventName, newPropsValue);
    } else if (propName === 'value' || propName === 'checked') {
      // 如果属性名称是 value 或者 checked 需要通过 [] 的形式添加
      newElement[propName] = newPropsValue;
    } else if (propName !== 'children') {
      // 刨除 children 因为它是子元素 不是属性

      if (propName === 'className') {
        // className 属性单独处理 不直接在元素上添加 class 属性是因为 class 是 JavaScript 中的关键字
        newElement.setAttribute('class', newPropsValue);
      } else {
        // 普通属性
        newElement.setAttribute(propName, newPropsValue);
      }
    }
  });
}
