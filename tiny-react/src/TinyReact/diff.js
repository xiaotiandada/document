import createDOMElement from "./createDOMElement";
import mountElement from "./mountElement";
import updateNodeElement from "./updateNodeElement";
import updateTextNode from "./updateTextNode";
import unmmountNode from "./unmmountNode";
import diffComponent from "./diffComponent";

export default function diff(virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM;
  const oldComponent = oldVirtualDOM && oldVirtualDOM.component;

  // 判断 oldDOM 是否存在
  if (!oldDOM) {
    mountElement(virtualDOM, container);
  } else if (
    virtualDOM.type !== oldVirtualDOM.type &&
    typeof virtualDOM.type !== "function"
  ) {
    // 如果 Virtual DOM 类型不一样
    // 并且 Virtual DOM 不是组件 因为组件要单独进行处理

    // 根据 Virtual DOM 创建真实 DOM 元素
    const newElement = createDOMElement(virtualDOM);
    // 用创建出来的真实 DOM 元素 替换旧的 DOM 元素
    oldDOM.parentNode.replaceChild(newElement, oldDOM);
  } else if (typeof virtualDOM.type === "function") {
    // 要更新的是组件
    // 1) 组件本身的 virtualDOM 对象 通过它可以获取到组件最新的 props
    // 2) 要更新的组件的实例对象 通过它可以调用组件的生命周期函数 可以更新组件的 props 属性 可以获取到组件返回的最新的 Virtual DOM
    // 3) 要更新的 DOM 象 在更新组件时 需要在已有DOM对象的身上进行修改 实现DOM最小化操作 获取旧的 Virtual DOM 对象
    // 4) 如果要更新的组件和旧组件不是同一个组件 要直接将组件返回的 Virtual DOM 显示在页面中 此时需要 container 做为父级容器
    diffComponent(virtualDOM, oldComponent, oldDOM, container);
  } else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
    if (virtualDOM.type === "text") {
      // 文本节点
      // 更新内容
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM);
    } else {
      // 更新元素属性
      updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM);
    }

    // 将拥有key属性的元素放入 keyedElements 对象中
    let keyedElements = {};
    for (let i = 0, len = oldDOM.childNodes.length; i < len; i++) {
      const domElement = oldDOM.childNodes[i];
      if (domElement.nodeType === 1) {
        let key = domElement.getAttribute("key");
        if (key) {
          keyedElements[key] = domElement;
        }
      }
    }

    // 看一看是否有找到了拥有 key 属性的元素
    let hasNoKey = Object.keys(keyedElements).length === 0;

    // 如果没有找到拥有 key 属性的元素 就按照索引进行比较
    if (hasNoKey) {
      // 递归对比 Virtual DOM 的子元素
      virtualDOM.children.forEach((child, index) => {
        // console.log('ccc', child, oldDOM, oldDOM._virtualDOM, oldDOM.childNodes[index])
        diff(child, oldDOM, oldDOM.childNodes[index]);
      });
    } else {
      // 使用key属性进行元素比较
      virtualDOM.children.forEach((child, i) => {
        // 获取要进行比对的元素的 key 属性
        let key = child.props.key;
        // 如果 key 属性存在
        if (key) {
          // 到已存在的 DOM 元素对象中查找对应的 DOM 元素
          let domElement = keyedElements[key];
          // 如果找到元素就说明该元素已经存在 不需要重新渲染
          if (domElement) {
            // 虽然 DOM 元素不需要重新渲染 但是不能确定元素的位置就一定没有发生变化
            // 所以还要查看一下元素的位置
            // 看一下 oldDOM 对应的(i)子元素和 domElement 是否是同一个元素 如果不是就说明元素位置发生了变化
            if (oldDOM.childNodes[i] && domElement !== oldDOM.childNodes[i]) {
              // 元素位置发生了变化
              // 将 domElement 插入到当前元素位置的前面 oldDOM.childNodes[i] 就是当前位置
              // domElement 就被放入了当前位置
              // console.log(
              //   "insertBefore",
              //   oldDOM,
              //   domElement,
              //   oldDOM.childNodes[i]
              // );
              oldDOM.insertBefore(domElement, oldDOM.childNodes[i]);
            }
          } else {
            // 新增元素
            mountElement(child, oldDOM, oldDOM.childNodes[i]);
          }
        }
      });
    }

    // 首先会在前面更新 DOM，然后删除多余的 DOM
    // 删除节点
    // 获取旧节点
    let oldChildNodes = oldDOM.childNodes;
    // 判断旧节点的数量
    if (oldChildNodes.length > virtualDOM.children.length) {
      if (hasNoKey) {
        // 有节点需要被删除
        for (
          let i = oldChildNodes.length - 1;
          i > virtualDOM.children.length - 1;
          i--
        ) {
          // console.log('oldChildNodes', oldChildNodes[i])
          unmmountNode(oldChildNodes[i]);
        }
      } else {
        // 通过 Key 属性删除节点
        for (let i = 0; i < oldChildNodes.length; i++) {
          let oldChild = oldChildNodes[i];
          let oldChildKey = oldChild._virtualDOM.props.key;
          let found = false;
          for (let n = 0; n < virtualDOM.children.length; n++) {
            if (oldChildKey === virtualDOM.children[n].props.key) {
              found = true;
              break;
            }
          }

          if (!found) {
            unmmountNode(oldChild);
          }
        }
      }
    }
  }
}
