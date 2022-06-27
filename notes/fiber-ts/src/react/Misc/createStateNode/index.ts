import { createDOMElement } from '../../DOM/index';

/**
 * 通过 tag 创建不同的节点
 * @param fiber
 * @returns
 */
const createStateNode = (fiber: { tag: string }) => {
  if (fiber.tag === 'host_component') {
    return createDOMElement(fiber);
  }
};

export default createStateNode;
