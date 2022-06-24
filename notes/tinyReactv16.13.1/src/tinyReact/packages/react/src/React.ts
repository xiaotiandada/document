import {
  createElement as createElementProd,
  isValidElement,
} from './ReactElement';

// TODO: Move this branching into the other module instead and just re-export.
const createElement = createElementProd;

export { createElement, isValidElement };
