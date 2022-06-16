import { HostRoot } from '../../shared/ReactWorkTags';

// The root we're working on
let workInProgressRoot: any | null = null;
// The fiber we're working on
let workInProgress: any | null = null;

// This is split into a separate function so we can mark a fiber with pending
// work without treating it as a typical update that originates from an event;
// e.g. retrying a Suspense boundary isn't an update, but it does schedule work
// on a fiber.
function markUpdateTimeFromFiberToRoot(fiber: any, expirationTime: number) {
  let node = fiber.return;
  let root = null;
  if (node === null && fiber.tag === HostRoot) {
    root = fiber.stateNode;
  } else {
    //
  }

  if (root !== null) {
    if (workInProgressRoot === root) {
      //
    }
  }

  return root;
}

// This is the entry point for synchronous tasks that don't go
// through Scheduler
function performSyncWorkOnRoot(root: any): any {
  console.log('performSyncWorkOnRoot root', root);

  // If we have a work-in-progress fiber, it means there's still work to do
  // in this root.
  if (workInProgress !== null) {
    //
  }

  return null;
}

export function scheduleUpdateOnFiber(fiber: any, expirationTime: any) {
  console.log('scheduleUpdateOnFiber', fiber);
  console.log('expirationTime', expirationTime);

  const root = markUpdateTimeFromFiberToRoot(fiber, expirationTime);
  if (root === null) {
    return;
  }

  // 同步任务入口点
  performSyncWorkOnRoot(root);
}

export const scheduleWork = scheduleUpdateOnFiber;

export function unbatchedUpdates(fn: any): any {
  try {
    return fn();
  } finally {
    //
  }
}
