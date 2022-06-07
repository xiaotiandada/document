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
  return createFiberRoot(containerInfo, tag, hydrate, hydrationCallbacks);
}
