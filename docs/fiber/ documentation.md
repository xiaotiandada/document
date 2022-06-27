# Documentation

- https://github.com/ValenW/fed-e-task-04-01/blob/101958bc7e0ded15e033444fa287e8b96cf037c7/notes/12%20React.md

## Init

- https://github.com/Microsoft/TypeScript-Babel-Starter
- https://github.com/xiaotiandada/blog/issues/115

Babel 7 不需要 ts-loader。从 Babel 7 开始，ts-loader 是不必要的，因为 Babel 7 支持 TypeScript。

## jsx

```tsx
const tsx = <div>Hello</div>;
console.log('tsx', tsx);

{
    "type": "div",
    "props": {
        "children": [
            {
                "type": "text",
                "props": {
                    "children": [],
                    "textContent": "Hello"
                }
            }
        ]
    }
}
```

### fiber

比如我们有一个类似这样的树节点

![img](https://i.imgur.com/E7hZuy3.png)

![image-20220627145356640](https://i.imgur.com/vwf90YP.png)



一段类似的 jsx

```tsx
const tsx = (
  <div title="wrapper">
    <div title="div1">
      <div title="div1 - 1">
        <div title="div1 - 1 - 1">Hello</div>
        <div title="div1 - 1 - 2">Hello1</div>
      </div>
    </div>
    <div title="div2">
      <div title="div2 - 1">World</div>
      <div title="div2 - 2">World1</div>
    </div>
    <div title="div3">div3</div>
    React
  </div>
);
```

构建左侧节点

![image-20220627114940759](https://i.imgur.com/t68J2y1.png)



构建兄弟节点

![image-20220627115016318](https://i.imgur.com/uOdPVyj.png)

执行顺序 会先构建链表左侧最深

![image-20220627124015340](https://i.imgur.com/XOosouO.png)

![image-20220627124919866](https://i.imgur.com/7lVZrGN.png)

![image-20220627151002339](https://i.imgur.com/dxnQexr.png)

构建顺序: wrapper >> div1 >> div - 1 >> div - 1 - 1 >> Hello



然后支持构建兄弟节点，构建完所有的节点后返回 undefined 停止 loop

![image-20220627145249870](https://i.imgur.com/RqDxpMA.png)

红色 向下查找链表节点

粉色 查找兄弟链表节点

蓝色 返回父级链表节点

![image-20220627152034495](https://i.imgur.com/fv8xz34.png)

### fiber 设置节点属性

```ts
newFiber.stateNode = createStateNode(newFiber);
```

```ts
import { createDOMElement } from '../../DOM/index';

const createStateNode = (fiber: { tag: string }) => {
  if (fiber.tag === 'host_component') {
    return createDOMElement(fiber);
  }
};

export default createStateNode;

```

```ts
export default function updateNodeElement(
  newElement: any,
  virtualDOM: any
) {
  let newProps = virtualDOM.props;

  if (virtualDOM.type === 'text') {
    virtualDOM.parent.stateNode.appendChild(
      document.createTextNode(newProps.textContent)
    );
    return;
  }

  Object.keys(newProps).forEach((propName) => {
    console.log('pp', newProps);
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
```

