const emptyObject = {};

/**
 * Base class helpers for the updating state of a component.
 */
export function Component(props) {
  this.props = props;
  this.refs = emptyObject;
}

Component.prototype.isReactComponent = {};
