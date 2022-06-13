import type { Container } from './ReactDOMHostConfig';
import { createLegacyRoot, isValidContainer } from './ReactDOMRoot';
import invariant from '../../../shared/invariant';
import type { ReactNodeList } from '../../../shared/ReactTypes';
import type { RootType } from './ReactDOMRoot';
import {
  DOCUMENT_NODE,
  ELEMENT_NODE,
  COMMENT_NODE,
} from '../shared/HTMLNodeType';
import { ROOT_ATTRIBUTE_NAME } from '../shared/DOMProperty';
import { getPublicRootInstance } from '../../../react-reconciler/inline.dom';

const __DEV__ = true;

let topLevelUpdateWarnings;
let warnedAboutHydrateAPI = false;

function getReactRootElementInContainer(container: any) {
  if (!container) {
    return null;
  }

  if (container.nodeType === DOCUMENT_NODE) {
    return container.documentElement;
  } else {
    return container.firstChild;
  }
}

function shouldHydrateDueToLegacyHeuristic(container: any) {
  const rootElement = getReactRootElementInContainer(container);
  return !!(
    rootElement &&
    rootElement.nodeType === ELEMENT_NODE &&
    rootElement.hasAttribute(ROOT_ATTRIBUTE_NAME)
  );
}

/**
 * 判断是否为服务器端渲染 如果不是服务器端渲染
 * 清空 container 容器中的节点
 */
function legacyCreateRootFromDOMContainer(
  container: Container,
  forceHydrate: boolean
): RootType {
  // container => <div id="root"></div>
  // 检测是否为服务器端渲染
  const shouldHydrate =
    forceHydrate || shouldHydrateDueToLegacyHeuristic(container);

  console.log('shouldHydrate', shouldHydrate);
  console.log('container', container);

  // First clear any existing content.
  // 如果不是服务器端渲染
  if (!shouldHydrate) {
    let warned = false;
    let rootSibling;
    // 开启循环 删除 container 容器中的节点
    while ((rootSibling = container.lastChild)) {
      if (__DEV__) {
        if (
          !warned &&
          rootSibling.nodeType === ELEMENT_NODE &&
          (rootSibling as any).hasAttribute(ROOT_ATTRIBUTE_NAME)
        ) {
          warned = true;
          console.error(
            'render(): Target node has markup rendered by React, but there ' +
              'are unrelated nodes as well. This is most commonly caused by ' +
              'white-space inserted around server-rendered markup.'
          );
        }
      }
      // 删除 container 容器中的节点
      container.removeChild(rootSibling);
      /**
       * 为什么要清除 container 中的元素 ?
       * 为提供首屏加载的用户体验, 有时需要在 container 中放置一些占位图或者 loading 图
       * 就无可避免的要向 container 中加入 html 标记.
       * 在将 ReactElement 渲染到 container 之前, 必然要先清空 container
       * 因为占位图和 ReactElement 不能同时显示
       *
       * 在加入占位代码时, 最好只有一个父级元素, 可以减少内部代码的循环次数以提高性能
       * <div>
       *  <p>placement<p>
       *  <p>placement<p>
       *  <p>placement<p>
       * </div>
       */
    }
  }

  if (__DEV__) {
    if (shouldHydrate && !forceHydrate && !warnedAboutHydrateAPI) {
      warnedAboutHydrateAPI = true;
      console.warn(
        'render(): Calling ReactDOM.render() to hydrate server-rendered markup ' +
          'will stop working in React v17. Replace the ReactDOM.render() call ' +
          'with ReactDOM.hydrate() if you want React to attach to the server HTML.'
      );
    }
  }

  return createLegacyRoot(
    container,
    shouldHydrate
      ? {
          hydrate: true,
        }
      : undefined
  );
}

function legacyRenderSubtreeIntoContainer(
  parentComponent: any,
  children: ReactNodeList,
  container: Container,
  forceHydrate: boolean,
  callback?: Function
) {
  /**
   * 检测 container 是否已经是初始化过的渲染容器
   * react 在初始渲染时会为最外层容器添加 _reactRootContainer 属性
   * react 会根据此属性进行不同的渲染方式
   * root 不存在 表示初始渲染
   * root 存在 表示更新
   */
  console.log('children', children);
  // 获取 container 容器对象下是否有 _reactRootContainer 属性
  let root: RootType = container._reactRootContainer as any;
  // 即将存储根 Fiber 对象
  let fiberRoot;

  if (!root) {
    // 初始渲染
    // 初始化根 Fiber 数据结构
    // 为 container 容器添加 _reactRootContainer 属性
    // 在 _reactRootContainer 对象中有一个属性叫做 _internalRoot
    // _internalRoot 属性值即为 FiberRoot, 表示根节点 Fiber 数据结构

    // Initial mount
    // legacyCreateRootFromDOMContainer: 清除container的所有子DOM
    // createLegacyRoot: 调用 new ReactDOMBlockingRoot: { _internalRoot: FiberRootNode }
    // new ReactDOMBlockingRoot -> this._internalRoot
    // createRootImpl

    /**
     * container = <div id="root"></div>
     * root = container._reactRootContainer = { _internalRoot: FiberRootNode }
     * <div id="root"></div>._reactRootContainer._internalRoot = FiberRootNode
     */
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(
      container,
      forceHydrate
    );

    console.log('root', root);

    // 获取 Fiber Root 对象
    fiberRoot = root._internalRoot;
  }

  // 返回 render 方法第一个参数的真实 DOM 对象作为 render 方法的返回值
  // 就是说渲染谁 返回谁的真实 DOM 对象
  console.log('fiberRoot', fiberRoot);
  return getPublicRootInstance(fiberRoot);
}

/**
 * 渲染入口
 * element 要进行渲染的 ReactElement, createElement 方法的返回值
 * container 渲染容器 <div id="root"></div>
 * callback 渲染完成后执行的回调函数
 */
export function render(
  element: any,
  container: Container,
  callback?: Function
) {
  console.log('render', element, container, callback);

  // 检测 container 是否是符合要求的渲染容器
  // 即检测 container 是否是真实的DOM对象
  // 如果不符合要求就报错
  invariant(
    isValidContainer(container),
    'Target container is not a DOM element.'
  );

  return legacyRenderSubtreeIntoContainer(
    // 父组件 初始渲染没有父组件 传递 null 占位
    null,
    element,
    container,
    // 是否为服务器端渲染 false 不是服务器端渲染 true 是服务器端渲染
    false,
    callback
  );
}
