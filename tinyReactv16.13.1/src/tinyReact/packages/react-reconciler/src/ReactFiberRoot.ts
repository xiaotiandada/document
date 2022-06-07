import type { RootTag } from '../../shared/ReactRootTags';
import { NoWork } from './ReactFiberExpirationTime';
import { noTimeout } from './ReactFiberHostConfig';
import { NoPriority } from './SchedulerWithReactIntegration';
import {
  enableSchedulerTracing,
  enableSuspenseCallback,
} from '../../shared/ReactFeatureFlags';

// Exported FiberRoot type includes all properties,
// To avoid requiring potentially error-prone :any casts throughout the project.
// Profiling properties are only safe to access in profiling builds (when enableSchedulerTracing is true).
// The types are defined separately within this file to ensure they stay in sync.
// (We don't have to use an inline :any cast when enableSchedulerTracing is disabled.)
export type FiberRoot = {};

function FiberRootNode(containerInfo: any, tag: RootTag, hydrate: boolean) {
  this.tag = tag;
  this.current = null;
  this.containerInfo = containerInfo;
  this.pendingChildren = null;
  this.pingCache = null;
  this.finishedExpirationTime = NoWork;
  this.finishedWork = null;
  this.timeoutHandle = noTimeout;
  this.context = null;
  this.pendingContext = null;
  this.hydrate = hydrate;
  this.callbackNode = null;
  this.callbackPriority = NoPriority;
  this.firstPendingTime = NoWork;
  this.firstSuspendedTime = NoWork;
  this.lastSuspendedTime = NoWork;
  this.nextKnownPendingLevel = NoWork;
  this.lastPingedTime = NoWork;
  this.lastExpiredTime = NoWork;

  if (enableSchedulerTracing) {
    // this.interactionThreadID = unstable_getThreadID();
    this.interactionThreadID = 0;
    this.memoizedInteractions = new Set();
    this.pendingInteractionMap = new Map();
  }
  if (enableSuspenseCallback) {
    this.hydrationCallbacks = null;
  }
}

export function createFiberRoot(
  containerInfo: any,
  tag: RootTag,
  hydrate: boolean,
  hydrationCallbacks: null
): FiberRoot {
  const root: FiberRoot = new (FiberRootNode as any)(
    containerInfo,
    tag,
    hydrate
  ) as any;
  return root;
}
