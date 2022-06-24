let style = { border: '1px solid red', color: 'red', margin: '10px', padding: '10px' };

let virtualDom = {
  type: 'div',
  key: "A",
  props: {
    style: style,
    children: [
      {
        type: 'div',
        key: "A1",
        style: style,
        props: {
          style: style,
          children: 'A1 text',
        },
      },
      {
        type: 'div',
        key: "A2",
        props: {
          style: style,
          children: [
            {
              type: 'div',
              key: "A21",
              style: style,
              props: {
                style: style,
                children: 'A21 text',
              },
            },
            {
              type: 'div',
              key: "A22",
              props: {
                style: style,
                children: 'A22 text',
              },
            }
          ]
        }
      }
    ]
  }
}

let workInProgress
const TAG_ROOT = Symbol.for('TAG_ROOT');
export const TAG_TEXT = Symbol.for('TAG_TEXT');
export const TAG_HOST = Symbol.for('TAG_HOST');
const Placement = 'Placement';

function workLoop() {
  while (workInProgress) {
    workInProgress = performUnitOfWork(workInProgress)
  }
  commitRoot(rootFiber)
}

function commitRoot(rootFiber) {
  let currentEffect = rootFiber.firstEffect;
  while (currentEffect) {
    console.log('currentEffect', currentEffect.key)
    let flags = currentEffect.flags
    switch (flags) {
      case Placement:
        commitPlacement(currentEffect)
        break;
    }
    currentEffect = currentEffect.nextEffect
  }
}

function commitPlacement(currentFiber) {
  let parent = currentFiber.return.stateNode
  parent.appendChild(currentFiber.stateNode)
}

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
console.log('rootFiber', rootFiber)

function completeUnitOfWork(workInProgress) {
  // console.log('workInProgress', workInProgress.key)

  let stateNode
  switch (workInProgress.tag) {
    case TAG_HOST:
      stateNode = createStateNode(workInProgress)
      setInitialProperties(stateNode, workInProgress.props)
      break;
    case TAG_TEXT:
      createStateNode(workInProgress)
      break;
  }
  markEffectList(workInProgress)
}

function setInitialProperties(node, props) {
  for (let property in props.style) {
    node.style[property] = props.style[property]
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

function markEffectList (completedWork) {
  const returnFiber = completedWork.return
  if (returnFiber) {
    if (!returnFiber.firstEffect) {
      returnFiber.firstEffect = completedWork.firstEffect
    }
    if (completedWork.lastEffect) {
      // console.log('completedWork', completedWork)
      if (returnFiber.lastEffect) {
        console.log('returnFiber.lastEffect', returnFiber.lastEffect.nextEffect, completedWork.firstEffect)
        returnFiber.lastEffect.nextEffect = completedWork.firstEffect
      }
      returnFiber.lastEffect = completedWork.lastEffect
      console.log('returnFiber.lastEffect222', returnFiber, completedWork)
    }
    if (completedWork.flags) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = completedWork
      } else {
        returnFiber.firstEffect = completedWork
      }
      returnFiber.lastEffect = completedWork
    }
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
    newFiber.flags = Placement;

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