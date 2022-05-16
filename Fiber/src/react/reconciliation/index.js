import { createTaskQueue } from "../Misc";

const taskQueue = createTaskQueue();

export const render = (element, dom) => {
  // taskQueue.push

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

  console.log(taskQueue.pop());
};
