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

/**
 * 提交所有任务
 * @param fiber
 */
const commitAllWork = (fiber: any) => {
  /**
   * 循环 effect 数组 构建 DOM 节点树
   */
  fiber.effects.forEach((item: any) => {
    console.log(
      'effects',
      item?.props?.title || item?.props?.textContent || item?.props || item
    );

    if (item.effectTag === 'placement') {
      let fiber = item;
      let parentFiber = item.parent;

      if (fiber.tag === 'host_component') {
        parentFiber.stateNode.appendChild(fiber.stateNode);
      }
    }
  });
};

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
   * RootFiber
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
    // console.log(
    //   'uuuuu',
    //   newFiber?.props?.title ||
    //     newFiber?.props?.textContent ||
    //     newFiber?.props ||
    //     newFiber
    // );

    if (index === 0) {
      fiber.child = newFiber;
    } else if (element) {
      prevFiber.sibling = newFiber;
    }

    prevFiber = newFiber;

    index++;
  }
};

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
     * 收集 effects
     */
    console.log(
      'currentExecutelyFiber',
      currentExecutelyFiber?.props?.title ||
        currentExecutelyFiber?.props?.textContent ||
        currentExecutelyFiber?.props ||
        currentExecutelyFiber
    );
    currentExecutelyFiber.parent.effects =
      currentExecutelyFiber.parent.effects.concat(
        currentExecutelyFiber.effects.concat([currentExecutelyFiber])
      );

    console.log('effect', currentExecutelyFiber.parent.effects);

    /**
     * 如果兄弟存在 返回兄弟
     * 将这个兄弟当作父级 构建这个父级下的子级
     */
    if (currentExecutelyFiber.sibling) {
      return currentExecutelyFiber.sibling;
    }

    currentExecutelyFiber = currentExecutelyFiber.parent;
  }

  pendingCommit = currentExecutelyFiber;

  console.log('pendingCommit', pendingCommit);
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
    // console.log(
    //   'ffff',
    //   subTask?.props?.title ||
    //     subTask?.props?.textContent ||
    //     subTask?.props ||
    //     subTask
    // );
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
