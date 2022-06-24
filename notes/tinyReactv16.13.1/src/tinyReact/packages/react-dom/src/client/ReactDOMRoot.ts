import {
  ELEMENT_NODE,
  COMMENT_NODE,
  DOCUMENT_NODE,
  DOCUMENT_FRAGMENT_NODE,
} from '../shared/HTMLNodeType';
import type { Container } from './ReactDOMHostConfig';
import {
  BlockingRoot,
  ConcurrentRoot,
  LegacyRoot,
} from '../../../shared/ReactRootTags';
import type { RootTag } from '../../../shared/ReactRootTags';
import { createContainer } from '../../../react-reconciler/inline.dom';

export type RootType = {
  render(children: any): void;
  unmount(): void;
  _internalRoot: any;
};
export type RootOptions = {
  hydrate?: boolean;
  hydrationOptions?: {
    onHydrated?: (suspenseNode: Comment) => void;
    onDeleted?: (suspenseNode: Comment) => void;
  };
};

function createRootImpl(
  container: Container,
  tag: RootTag,
  options: void | RootOptions
) {
  console.log('createRootImpl', container, tag, options);
  const hydrate = false;
  const hydrationCallbacks: any = null;

  // container => <div id="root"></div>
  // tag => 0
  // options => undefined
  const root = createContainer(container, tag, hydrate, hydrationCallbacks);
  // markContainerAsRoot(root.current, container);
  return root;
}

/**
 * 类, 通过它可以创建 LegacyRoot 的 Fiber 数据结构
 */
function ReactDOMBlockingRoot(
  container: Container,
  tag: RootTag,
  options: void | RootOptions
) {
  // tag => 0 => legacyRoot
  // container => <div id="root"></div>
  // container._reactRootContainer = {_internalRoot: {}}
  this._internalRoot = createRootImpl(container, tag, options);
}

export function createLegacyRoot(
  container: Container,
  options?: RootOptions
): RootType {
  // container => <div id="root"></div>
  // LegacyRoot 常量, 值为 0,
  // 通过 render 方法创建的 container 就是 LegacyRoot
  return new (ReactDOMBlockingRoot as any)(container, LegacyRoot, options);
}

/**
 *
 * @param node mixed
 *
 * 判断 node 是否是符合要求的 DOM 节点
 * 1. node 可以是元素节点
 * 2. node 可以是 document 节点
 * 3. node 可以是 文档碎片节点
 * 4. node 可以是注释节点但注释内容必须是 react-mount-point-unstable
 * 		react 内部会找到注释节点的父级 通过调用父级元素的 insertBefore 方法, 将 element 插入到注释节点的前面
 *
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType
 */
export function isValidContainer(node: any): boolean {
  return !!(
    node &&
    (node.nodeType === ELEMENT_NODE ||
      node.nodeType === DOCUMENT_NODE ||
      node.nodeType === DOCUMENT_FRAGMENT_NODE ||
      (node.nodeType === COMMENT_NODE &&
        (node as any).nodeValue === ' react-mount-point-unstable '))
  );
}
