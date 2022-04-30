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
          children: [
            {
              type: 'span',
              key: 'b1',
              props: 'B1 文本',
            },
            'B2 文本'
          ]
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
  // console.log('f', fiber)

  if (fiber.child) {
    return fiber.child
  }

  while (fiber) {
    completeUnitOfWork(fiber)
    if (fiber.sibling) {
      return fiber.sibling
    }

    fiber = fiber.return
  }
}

function completeUnitOfWork(workInProgress) {
  // console.log('workInProgress', workInProgress.key)

  let stateNode
  switch (workInProgress.tag) {
    case TAG_HOST:
      stateNode = createStateNode(workInProgress)
      break;
    case TAG_TEXT:
      createStateNode(workInProgress)
      break;
  }
}

function createStateNode(fiber) {
  if (fiber.tag === TAG_TEXT) {
    let stateNode = document.createTextNode(fiber.props)
    fiber.stateNode = stateNode
  } else if (fiber.tag === TAG_HOST) {
    let stateNode = document.createElement(fiber.type)
    if (typeof fiber.props.children === 'string') {
      stateNode.appendChild(document.createTextNode(fiber.props.children))
    }
    fiber.stateNode = stateNode
  }

  return fiber.stateNode
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