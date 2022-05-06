import createDOMElement from './createDOMElement'
import mountElement from './mountElement'
import updateNodeElement from './updateNodeElement'
import updateTextNode from './updateTextNode'
import unmmountNode from './unmmountNode'

export default function diff (virtualDOM, container, oldDOM) {
  const oldVirtualDOM = oldDOM && oldDOM._virtualDOM
  // 判断 oldDOM 是否存在
  if (!oldDOM) {
    mountElement(virtualDOM, container)
  } else if (virtualDOM.type !== oldVirtualDOM.type && typeof virtualDOM.type !== 'function') {
    // 如果 Virtual DOM 类型不一样
    // 并且 Virtual DOM 不是组件 因为组件要单独进行处理

    // 根据 Virtual DOM 创建真实 DOM 元素
    const newElement = createDOMElement(virtualDOM)
    // 用创建出来的真实 DOM 元素 替换旧的 DOM 元素
    oldDOM.parentNode.replaceChild(newElement, oldDOM)
  } else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
    if (virtualDOM.type === 'text') {
      // 文本节点
      // 更新内容
      updateTextNode(virtualDOM, oldVirtualDOM, oldDOM)
    } else {
      // 更新元素属性
      updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM)
    }

    virtualDOM.children.forEach((child, index) => {
      // console.log('ccc', child, oldDOM, oldDOM._virtualDOM, oldDOM.childNodes[index])
      diff(child, oldDOM, oldDOM.childNodes[index])
    })

    // 首先会在前面更新 DOM，然后删除多余的 DOM
    // 删除节点
    // 获取旧节点
    let oldChildNodes = oldDOM.childNodes
    // 判断旧节点的数量
    if (oldChildNodes.length > virtualDOM.children.length) {
      // 有节点需要被删除
      for (
        let i = oldChildNodes.length - 1;
        i > virtualDOM.children.length - 1;
        i --
      ) {
        // console.log('oldChildNodes', oldChildNodes[i])
        unmmountNode(oldChildNodes[i])
      }
    }
  }
}