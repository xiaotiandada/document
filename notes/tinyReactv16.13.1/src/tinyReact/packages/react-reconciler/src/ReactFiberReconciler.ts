import type { Container } from './ReactFiberHostConfig';
import type { RootTag } from '../../shared/ReactRootTags';
import { HostComponent } from '../../shared/ReactWorkTags';
import type { FiberRoot } from './ReactFiberRoot';
import { createFiberRoot } from './ReactFiberRoot';
import { getPublicInstance } from './ReactFiberHostConfig';
import { scheduleWork, unbatchedUpdates } from './ReactFiberWorkLoop';

type OpaqueRoot = FiberRoot;

let expirationTime = 0;

export function createContainer(
  containerInfo: Container,
  tag: RootTag,
  hydrate: boolean,
  hydrationCallbacks: null
): OpaqueRoot {
  // containerInfo => <div id="root"></div>
  // tag: 0
  // hydrate: false
  // hydrationCallbacks: null
  // 忽略了和服务器端渲染相关的内容
  return createFiberRoot(containerInfo, tag, hydrate, hydrationCallbacks);
}

export function updateContainer(
  element: any,
  container: OpaqueRoot,
  parentComponent?: any,
  callback?: Function
): any {
  console.log('updateContainer container', container);

  const current = (container as any).current;
  scheduleWork(current, expirationTime);

  return expirationTime;
}

export function getPublicRootInstance(container: OpaqueRoot): any {
  console.log('container', container);
  // 获取 rootFiber
  const containerFiber = (container as any).current;
  // 如果 rootFiber 没有子元素
  // 指的就是 id="root" 的 div 没有子元素
  if (!containerFiber.child) {
    // 返回 null
    return null;
  }
  switch (containerFiber.child.tag) {
    case HostComponent:
      return getPublicInstance(containerFiber.child.stateNode);
    default:
      return containerFiber.child.stateNode;
  }
}

export { unbatchedUpdates };
