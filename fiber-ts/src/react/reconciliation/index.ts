import { createTaskQueue } from '../Misc/index';

/**
 * 任务队列
 */
const taskQueue = createTaskQueue();

/**
 * 要执行的子任务
 */
let subTask: any = null;

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

const workLoop = (deadline: IdleDeadline) => {
  /**
   * 如果子任务不存在 就去获取子任务
   */
  if (!subTask) {
    subTask = getFirstTask();
    console.log('subTask', subTask);
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
