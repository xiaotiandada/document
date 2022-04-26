let style = { border: '1px solid red', color: 'red', margin: '5px' };

let virtualDom = {
  type: 'div',
  key: "A",
  props: {
    style: style,
    children: [
      {
        type: 'input',
        key: "B",
        props: {
          style: style,
          children: 'B1 文本',
        },
      },
      {
        type: 'button',
        key: "C",
        props: {
          style: style,
          children: 'C1 按钮',
        },
      }
    ]
  }
}

let workInProgress
const TAG_ROOT = Symbol.for('TAG_ROOT');
export const TAG_TEXT = Symbol.for('TAG_TEXT');
export const TAG_HOST = Symbol.for('TAG_HOST');

function workLoop() {
  while (workInProgress) {
    workInProgress = performUnitOfWork(workInProgress)
  }
}

let rootFiber = {
  tag: TAG_ROOT,
  key: "ROOT",
  stateNode: document.getElementById('root'),
  props: {
    children: [virtualDom]
  }
}

workInProgress = rootFiber;
workLoop()


function performUnitOfWork (fiber) {
  beginWork(fiber)

  if (fiber.child) {
    return fiber.child
  }

  while (fiber) {
    if (fiber.sibling) {
      return fiber.sibling
    }

    fiber = fiber.return
  }
}

function beginWork (fiber) {
  console.log('fiber', fiber, fiber.key);
  let nextChildren = fiber.props.children
  if (typeof nextChildren === 'string') {
    nextChildren = null
  }
  // return updateHostComponent(fiber, nextChildren)
  return reconcileChildren(fiber, nextChildren)
}

function reconcileChildren(returnFiber, nextChildren) {
  let firstChild = null
  let previousNewFiber = null
  let newChildren = []

  if (Array.isArray(nextChildren)) {
    newChildren = nextChildren
  } else if (!!nextChildren) {
    newChildren = [nextChildren]
  }

  for (let newIdx = 0; newIdx < newChildren.length; newIdx++) {
    const newFiber = createFiber(newChildren[newIdx])
    newFiber.return = returnFiber

    if (!previousNewFiber) {
      firstChild = newFiber
    } else {
      previousNewFiber.sibling = newFiber
    }

    previousNewFiber = newFiber
  }

  returnFiber.child = firstChild
  return firstChild
}

function createFiber (element) {
  if (typeof element === 'string') {
    return { tag: TAG_TEXT, type: element.type, key: element, props: element }
  } else {
    return { tag: TAG_HOST, type: element.type, key: element.key, props: element.props }
  }
}