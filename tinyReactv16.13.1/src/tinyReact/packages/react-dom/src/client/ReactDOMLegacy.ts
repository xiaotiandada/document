import type { Container } from './ReactDOMHostConfig';
import { isValidContainer } from './ReactDOMRoot';
import invariant from '../../../shared/invariant';
import type { ReactNodeList } from '../../../shared/ReactTypes';

function legacyRenderSubtreeIntoContainer(
  parentComponent: any,
  children: ReactNodeList,
  container: Container,
  forceHydrate: boolean,
  callback?: Function
) {
  return {};
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
