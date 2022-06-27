import updateNodeElement from './updateNodeElement';

/**
 * create DOM Element
 * @param virtualDOM
 * @returns
 */
export default function createDOMElement(virtualDOM: any) {
  let newElement: any = null;
  if (virtualDOM.type === 'text') {
    newElement = document.createTextNode(virtualDOM.props.textContent);
  } else {
    newElement = document.createElement(virtualDOM.type);
    updateNodeElement(newElement, virtualDOM);
  }

  return newElement;
}
