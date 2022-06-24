export default function updateNodeElement(
  newElement: any,
  virtualDOM: any,
  oldVirtualDOM = {}
) {
  let newProps = virtualDOM.props;

  if (virtualDOM.type === 'text') {
    virtualDOM.parent.stateNode.appendChild(
      document.createTextNode(newProps.textContent)
    );

    return;
  }
}
