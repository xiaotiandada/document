import { createDOMElement } from '../../DOM/index';

const createStateNode = (fiber: any) => {
  if (fiber.tag === 'host_component') {
    return createDOMElement(fiber);
  }
};

export default createStateNode;
