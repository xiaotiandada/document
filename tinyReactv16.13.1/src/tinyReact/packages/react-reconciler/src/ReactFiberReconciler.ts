import type { Container } from './ReactFiberHostConfig';
import type { RootTag } from '../../shared/ReactRootTags';
import type { FiberRoot } from './ReactFiberRoot';
import { createFiberRoot } from './ReactFiberRoot';

type OpaqueRoot = FiberRoot;

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

export function getPublicRootInstance(container: OpaqueRoot): any {
  console.log('container', container);

  const containerFiber = container.current;
  if (!containerFiber.child) {
    return null;
  }
  switch (containerFiber.child.tag) {
    default:
      return containerFiber.child.stateNode;
  }
}
