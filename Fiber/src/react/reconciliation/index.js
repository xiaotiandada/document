import { updateNodeElement } from "../DOM";
import { createTaskQueue, arrified, createStateNode, getTag } from "../Misc";

/**
 * 任务队列
 */
const taskQueue = createTaskQueue();

/**
 * 要执行的子任务
 */
let subTask = null;

let pendingCommit = null;

const commitAllWork = (fiber) => {
  /**
   * 循环 effect 数组 构建 DOM 节点树
   */
  fiber.effects.forEach((item) => {
    if (item.effectTag === "update") {
      /**
       * 更新
       */
      if (item.type === item.alternate.type) {
        /**
         * 节点类型相同
         */
        updateNodeElement(item.stateNode, item, item.alternate);
      } else {
        /**
         * 节点类型不同
         */
        item.parent.stateNode.replaceChild(
          item.stateNode,
          item.alternate.stateNode
        );
      }
    } else if (item.effectTag === "placement") {
      let fiber = item;
      let parentFiber = item.parent;
      while (
        parentFiber.tag === "class_component" ||
        parentFiber.tag === "function_component"
      ) {
        parentFiber = parentFiber.parent;
      }
      if (fiber.tag === "host_component") {
        parentFiber.stateNode.appendChild(fiber.stateNode);
      }
    }
  });

  /**
   * 备份旧的 fiber 节点对象
   */
  fiber.stateNode.__rootFiberContainer = fiber;
};

const getFirstTask = () => {
  /**
   * 从任务队列中获取任务
   */
  const task = taskQueue.pop();
  console.log("task", task);

  /**
   * 返回最外层节点的 fiber 对象
   */
  return {
    props: task.props,
    stateNode: task.dom,
    tag: "host_root",
    effects: [],
    child: null,
    alternate: task.dom.__rootFiberContainer,
  };
};

const reconcileChildren = (fiber, children) => {
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

  let alternate = null;

  if (fiber.alternate && fiber.alternate.child) {
    alternate = fiber.alternate.child;
  }

  while (index < numberOfElements) {
    /**
     * 子级 virtualDOM 对象
     */
    element = arrifiedChildren[index];

    if (element && alternate) {
      /**
       * 更新
       */
      newFiber = {
        type: element.type,
        props: element.props,
        tag: getTag(element),
        effects: [],
        effectTag: "update",
        // stateNode: null,
        parent: fiber,
        alternate,
      };

      if (element.type === alternate.type) {
        /**
         * 类型相同
         */
        newFiber.stateNode = alternate.stateNode;
      } else {
        /**
         * 类型不同
         */
        newFiber.stateNode = createStateNode(newFiber);
      }
    } else if (element && !alternate) {
      /**
       * 初始渲染
       */
      /**
       * 子级 fiber 对象
       */
      newFiber = {
        type: element.type,
        props: element.props,
        tag: getTag(element),
        effects: [],
        effectTag: "placement",
        // stateNode: null,
        parent: fiber,
      };

      /**
       * 为 fiber 节点添加 DOM 对象或组件实例对象
       */
      newFiber.stateNode = createStateNode(newFiber);
    }

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      prevFiber.sibling = newFiber;
    }

    if (alternate && alternate.sibling) {
      alternate = alternate.sibling;
    } else {
      alternate = null;
    }

    prevFiber = newFiber;

    index++;
  }
};

const executeTask = (fiber) => {
  /**
   * 构建子级 fiber 对象
   */
  if (fiber.tag === "class_component") {
    reconcileChildren(fiber, fiber.stateNode.render());
  } else if (fiber.tag === "function_component") {
    reconcileChildren(fiber, fiber.stateNode(fiber.props));
  } else {
    reconcileChildren(fiber, fiber.props.children);
  }

  /**
   * 如果子级存在 返回子级
   * 将这个子级当作父级 构建这个父级下的子级
   */
  if (fiber.child) {
    return fiber.child;
  }

  let currentExecutelyFiber = fiber;

  while (currentExecutelyFiber.parent) {
    currentExecutelyFiber.parent.effects =
      currentExecutelyFiber.parent.effects.concat(
        currentExecutelyFiber.effects.concat([currentExecutelyFiber])
      );

    if (currentExecutelyFiber.sibling) {
      return currentExecutelyFiber.sibling;
    }

    currentExecutelyFiber = currentExecutelyFiber.parent;
  }

  pendingCommit = currentExecutelyFiber;

  console.log(currentExecutelyFiber);
};

const workLoop = (deadline) => {
  /**
   * 如果子任务不存在 就去获取子任务
   */
  if (!subTask) {
    subTask = getFirstTask();
    console.log("subTask", subTask);
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

const performTask = (deadline) => {
  /**
   * 执行任务
   */
  workLoop(deadline);

  /**
   * 判断任务是否存在
   * 判断任务队列中是否还有任务没有执行
   * 再一次告诉浏览器在空闲的时候执行任务
   */
  if (subTask || !taskQueue.isEmpty()) {
    requestIdleCallback(performTask);
  }
};

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

  /**
   * 指定在浏览器空闲的时间去执行任务
   */
  requestIdleCallback(performTask);
};
