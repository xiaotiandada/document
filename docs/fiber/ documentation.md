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

## fiber

### fiber 树

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



从下往上收集 fiber

红色 向上收集链表节点

蓝色 查找兄弟链表节点并向上收集链表节点

![image-20220627171608241](https://i.imgur.com/tvnG529.png)

![image-20220627165808499](https://i.imgur.com/slyXjju.png)

![image-20220627171645377](https://i.imgur.com/nD8kQby.png)

日志输出父级 effects 数组收集过程

`[parent]: [effects]`

div - 1 - 1:  `[hello]`

div - 1: `[hello, div - 1 - 1]`

div - 1 - 2: `[hello1]`

div - 1: `[hello, div - 1 - 1, hello1, div - 1 - 2]`

div1: `[hello, div - 1 - 1, hello1, div - 1 - 2, div1 - 1]`

wrapper: `[hello, div - 1 - 1, hello1, div - 1 - 2, div1 - 1, div1]`

<br />

div2 - 1: `[world]`

div2: `[world, div2-1]`

div2-2: `[world1]`

div2: ` [world, div2-1, world1, div2 - 2]`

wrapper: `[hello, div - 1 - 1, hello1, div - 1 - 2, div1 - 1, div1, world, div2-1, world1, div2 - 2, div2]`  

<br />

div3: `[fiber]`

wrapper: ` [hello, div - 1 - 1, hello1, div - 1 - 2, div1 - 1, div1, world, div2-1, world1, div2 - 2, div2, fiber, div3]`

<br />

wrapper:  `[hello, div - 1 - 1, hello1, div - 1 - 2, div1 - 1, div1, world, div2-1, world1, div2 - 2, div2, fiber, div3, React]`

<br />

RootFiber: `[hello, div - 1 - 1, hello1, div - 1 - 2, div1 - 1, div1, world, div2-1, world1, div2 - 2, div2, fiber, div3, React, wrapper]`

### fiber 构建节点

```ts
const workLoop = (deadline: IdleDeadline) => {
  /**
   * 如果子任务不存在 就去获取子任务
   */
  if (!subTask) {
    subTask = getFirstTask();
    console.log('subTask', subTask);
  }

  /**
   * 如果任务存在并且浏览器有空余的时间就调用
   * executeTask 方法执行任务 接受任务 返回新的任务
   */
  while (subTask && deadline.timeRemaining() > 1) {
    subTask = executeTask(subTask);
  }
};
```

```ts
const executeTask = (fiber: any) => {
  /**
   * 构建子级 fiber 对象
   */
  reconcileChildren(fiber, fiber.props.children);

  /**
   * 如果子级存在 返回子级
   * 将这个子级当作父级 构建这个父级下的子级
   */
  if (fiber.child) {
    return fiber.child;
  }

  let currentExecutelyFiber = fiber;

  /**
   * 父级存在
   */
  while (currentExecutelyFiber.parent) {
    /**
     * 如果兄弟存在 返回兄弟
     * 将这个兄弟当作父级 构建这个父级下的子级
     */
    if (currentExecutelyFiber.sibling) {
      return currentExecutelyFiber.sibling;
    }

    currentExecutelyFiber = currentExecutelyFiber.parent;
  }
};
```

```ts
const reconcileChildren = (fiber: any, children: any[] | object) => {
  /**
   * children 可能对象 也可能是数组
   * 将 children 转换成数组
   */
  const arrifiedChildren = arrified(children);

  /**
   * 循环 children 使用的索引
   */
  let index = 0;
  /**
   * children 数组中元素的个数
   */
  let numberOfElements = arrifiedChildren.length;
  /**
   * 循环过程中的循环项 就是子节点的 virtualDOM 对象
   */
  let element = null;
  /**
   * 子级 fiber 对象
   */
  let newFiber = null;
  /**
   * 上一个兄弟 fiber 对象
   */
  let prevFiber = null;

  while (index < numberOfElements) {
    /**
     * 子级 virtualDOM 对象
     */
    element = arrifiedChildren[index];

    // 初始渲染
    newFiber = {
      type: element.type,
      props: element.props,
      // 获取 Tag
      tag: getTag(element),
      effects: [],
      effectTag: 'placement',
      stateNode: null,
      parent: fiber,
    };
	 
    // 创建状态节点
    newFiber.stateNode = createStateNode(newFiber);

    if (index === 0) {
      fiber.child = newFiber;
    } else if (element) {
      prevFiber.sibling = newFiber;
    }

    prevFiber = newFiber;

    index++;
  }
};
```

```ts
/**
 * get tag
 * 通过 vdom type 判断类型返回 tag
 * @param vdom
 * @returns
 */
const getTag = (vdom: { type: string }) => {
  if (typeof vdom.type === 'string') {
    return 'host_component';
  }
};

export default getTag;

```

```ts
import { createDOMElement } from '../../DOM/index';

/**
 * 通过 tag 创建不同的节点
 * @param fiber
 * @returns
 */
const createStateNode = (fiber: { tag: string }) => {
  if (fiber.tag === 'host_component') {
    return createDOMElement(fiber);
  }
};

export default createStateNode;
```

```ts
/**
 * create DOM Element
 * 通过 type 类型判断来创建不同的 DOM 元素
 * @param virtualDOM
 * @returns
 */
export default function createDOMElement(virtualDOM: any) {
  let newElement: any = null;
  if (virtualDOM.type === 'text') {
    newElement = document.createTextNode(virtualDOM.props.textContent);
  } else {
    newElement = document.createElement(virtualDOM.type);
  }

  return newElement;
}
```

### fiber 提交任务 构建 DOM 节点树

```ts
const executeTask = (fiber: any) => {
	// ...

  /**
   * 父级存在
   */
  while (currentExecutelyFiber.parent) {
    /**
     * 收集 effects
     */
    currentExecutelyFiber.parent.effects =
      currentExecutelyFiber.parent.effects.concat(
        currentExecutelyFiber.effects.concat([currentExecutelyFiber])
      );

    // ...

    currentExecutelyFiber = currentExecutelyFiber.parent;
  }

  pendingCommit = currentExecutelyFiber;

  console.log('pendingCommit', pendingCommit);
};
```

```ts
const workLoop = (deadline: IdleDeadline) => {
  // ...
  if (pendingCommit) {
    commitAllWork(pendingCommit);
  }
};
```

```ts
/**
 * 提交所有任务
 * @param fiber
 */
const commitAllWork = (fiber: any) => {
  /**
   * 循环 effect 数组 构建 DOM 节点树
   */
  fiber.effects.forEach((item: any) => {
    if (item.effectTag === 'placement') {
      let fiber = item;
      let parentFiber = item.parent;

      if (fiber.tag === 'host_component') {
        parentFiber.stateNode.appendChild(fiber.stateNode);
      }
    }
  });
};
```

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

