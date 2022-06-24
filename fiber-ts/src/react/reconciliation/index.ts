import {
  createTaskQueue,
  arrified,
  getTag,
  createStateNode,
} from '../Misc/index';

/**
 * 任务队列
 */
const taskQueue = createTaskQueue();

/**
 * 要执行的子任务
 */
let subTask: any = null;
let pendingCommit: any = null;

const getFirstTask = (): {
  props: any;
  stateNode: any;
  tag: string;
  effects: any[];
  child: any;
  alternate: any;
} => {
  /**
   * 从任务队列中获取任务
   */
  const task = taskQueue.pop();
  console.log('task', task);

  /**
   * 返回最外层节点的 fiber 对象
   */
  return {
    props: task.props,
    stateNode: task.dom,
    tag: 'host_root',
    effects: [],
    child: null,
    alternate: task.dom.__rootFiberContainer,
  };
};

const reconcileChildren = (fiber: any, children: any[] | object) => {
  /**
   * children 可能对象 也可能是数组
   * 将 children 转换成数组
   */
  const arrifiedChildren = arrified(children);

  let index = 0;
  let numberOfElements = arrifiedChildren.length;
  let element = null;
  let newFiber = null;
  let prevFiber = null;

  while (index < numberOfElements) {
    element = arrifiedChildren[index];

    // 初始渲染
    newFiber = {
      type: element.type,
      props: element.props,
      tag: getTag(element),
      effects: [],
      effectTag: 'placement',
      stateNode: null,
      parent: fiber,
    };

    newFiber.stateNode = createStateNode(newFiber);

    if (index === 0) {
      fiber.child = newFiber;
    }

    index++;
  }
};

const executeTask = (fiber: any) => {
  /**
   * 构建子级 fiber 对象
   */
  reconcileChildren(fiber, fiber.props.children);

  if (fiber.child) {
    return fiber.child;
  }

  let currentExecutelyFiber = fiber;

  while (currentExecutelyFiber.parent) {
    currentExecutelyFiber.parent.effects =
      currentExecutelyFiber.parent.effects.concat(
        currentExecutelyFiber.effects.concat([currentExecutelyFiber])
      );

    currentExecutelyFiber = currentExecutelyFiber.parent;
  }

  pendingCommit = currentExecutelyFiber;

  console.log('pendingCommit', pendingCommit);
};

const commitAllWork = (fiber: any) => {
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

  if (pendingCommit) {
    commitAllWork(pendingCommit);
  }
};

const performTask = (deadline: IdleDeadline) => {
  /**
   * 执行任务
   */
  workLoop(deadline);
};

export const render = (element: any, dom: HTMLElement) => {
  console.log('render', element);

  /**
   * 1. add task queue
   * 2. 空闲执行任务
   */

  /**
   * 任务就是通过 vdom 对象 构建 fiber 对象
   */
  taskQueue.push({
    dom,
    props: { children: element },
  });

  /**
   * 指定在浏览器空闲的时间去执行任务
   */
  requestIdleCallback(performTask);
};
