import { REACT_ELEMENT_TYPE } from '../../shared/ReactSymbols';

const hasOwnProperty = Object.prototype.hasOwnProperty;

const __DEV__ = true;

const RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true,
};

let specialPropKeyWarningShown: boolean;
let specialPropRefWarningShown: boolean;
let didWarnAboutStringRefs;

/**
 * 查看参数对象中是否有合法的 ref 属性
 * 返回布尔值
 */
function hasValidRef(config: any) {
  return config.ref !== undefined;
}

/**
 * 查看参数对象中是否有合法的 key 属性
 * 返回布尔值
 */
function hasValidKey(config: any) {
  return config.key !== undefined;
}

/**
 *  指定当通过 props 对象获取 key 属性时报错
 *  props        组件中的 props 对象
 *  displayName  组件名称标识
 */
function defineKeyPropWarningGetter(
  props: { [key: string]: any },
  displayName: string
) {
  // 通过 props 对象获取 key 属性报错
  const warnAboutAccessingKey = function () {
    // 在开发环境中
    if (__DEV__) {
      // specialPropKeyWarningShown 控制错误只输出一次的变量
      if (!specialPropKeyWarningShown) {
        // 通过 specialPropKeyWarningShown 变量锁住判断条件
        specialPropKeyWarningShown = true;
        // 指定报错信息和组件名称
        console.error(
          '%s: `key` is not a prop. Trying to access it will result ' +
            'in `undefined` being returned. If you need to access the same ' +
            'value within the child component, you should pass it as a different ' +
            'prop. (https://fb.me/react-special-props)',
          displayName
        );
      }
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  // 为 props 对象添加 key 属性
  Object.defineProperty(props, 'key', {
    // 当获取 key 属性时调用 warnAboutAccessingKey 方法进行报错
    get: warnAboutAccessingKey,
    configurable: true,
  });
}

/**
 *  指定当通过 props 对象获取 ref 属性时报错
 *  props        组件中的 props 对象
 *  displayName  组件名称标识
 */
function defineRefPropWarningGetter(
  props: { [key: string]: any },
  displayName: string
) {
  // 通过 props 对象获取 ref 属性报错
  const warnAboutAccessingRef = function () {
    if (__DEV__) {
      // specialPropRefWarningShown 控制错误只输出一次的变量
      if (!specialPropRefWarningShown) {
        // 通过 specialPropRefWarningShown 变量锁住判断条件
        specialPropRefWarningShown = true;
        // 指定报错信息和组件名称
        console.error(
          '%s: `ref` is not a prop. Trying to access it will result ' +
            'in `undefined` being returned. If you need to access the same ' +
            'value within the child component, you should pass it as a different ' +
            'prop. (https://fb.me/react-special-props)',
          displayName
        );
      }
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  // 为 props 对象添加 key 属性
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true,
  });
}

// 接收参数 返回 ReactElement
/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, instanceof check
 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} props
 * @param {*} key
 * @param {string|object} ref
 * @param {*} owner
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @internal
 */
const ReactElement = function (
  type: any,
  key: any,
  ref: any,
  self: any,
  source: any,
  owner: any,
  props: any
) {
  const element = {
    /**
     * 组件的类型, 十六进制数值或者 Symbol 值
     * React 在最终在渲染 DOM 的时候, 需要确保元素的类型是 REACT_ELEMENT_TYPE
     * 需要此属性作为判断的依据
     */
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    /**
     * 元素具体的类型值 如果是元素节点 type 属性中存储的就是 div span 等等
     * 如果元素是组件 type 属性中存储的就是组件的构造函数
     */
    // Built-in properties that belong on the element
    type: type,
    /**
     * 元素的唯一标识
     * 用作内部 vdom 比对 提升 DOM 操作性能
     */
    key: key,
    /**
     * 存储元素 DOM 对象或者组件 实例对象
     */
    ref: ref,
    /**
     * 存储向组件内部传递的数据
     */
    props: props,

    /**
     * 记录当前元素所属组件 (记录当前元素是哪个组件创建的)
     */
    // Record the component responsible for creating this element.
    _owner: owner,
  };

  // 返回 ReactElement
  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://reactjs.org/docs/react-api.html#createelement
 */
export function createElement(type: any, config: any, children: any) {
  /**
   * propName -> 属性名称
   * 用于后面的 for 循环
   */
  let propName: any;

  /**
   * 存储 React Element 中的普通元素属性 即不包含 key ref self source
   */
  // Reserved names are extracted
  const props: { [key: string]: any } = {};

  /**
   * 待提取属性
   * React 内部为了实现某些功能而存在的属性
   */
  let key = null;
  let ref = null;
  let self = null;
  let source = null;

  // 如果 config 不为 null
  if (config !== null) {
    // 如果 config 对象中有合法的 ref 属性
    if (hasValidRef(config)) {
      // 将 config.ref 属性提取到 ref 变量中
      ref = config.ref;
    }
    // 如果在 config 对象中拥有合法的 key 属性
    if (hasValidKey(config)) {
      // 将 config.key 属性中的值提取到 key 变量中
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;

    // 遍历 config 对象
    // Remaining properties are added to a new props object
    for (propName in config) {
      // 如果当前遍历到的属性是对象自身属性
      // 并且在 RESERVED_PROPS 对象中不存在该属性
      if (
        hasOwnProperty.call(config, propName) &&
        !RESERVED_PROPS.hasOwnProperty(propName)
      ) {
        // 将满足条件的属性添加到 props 对象中 (普通属性)
        props[propName] = config[propName];
      }
    }
  }

  /**
   * 将第三个及之后的参数挂载到 props.children 属性中
   * 如果子元素是多个 props.children 是数组
   * 如果子元素是一个 props.children 是对象
   */

  // 由于从第三个参数开始及以后都表示子元素
  // 所以减去前两个参数的结果就是子元素的数量

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  const childrenLength = arguments.length - 2;
  // 如果子元素的数量是 1
  if (childrenLength === 1) {
    // 直接将子元素挂载到到 props.children 属性上
    // 此时 children 是对象类型
    props.children = children;
    // 如果子元素的数量大于 1
  } else if (childrenLength > 1) {
    // 创建数组, 数组中元素的数量等于子元素的数量
    const childArray = Array(childrenLength);
    // 开启循环 循环次匹配子元素的数量
    for (let i = 0; i < childrenLength; i++) {
      // 将子元素添加到 childArray 数组中
      // i + 2 的原因是实参集合的前两个参数不是子元素
      childArray[i] = arguments[i + 2];
    }

    // 将子元素数组挂载到 props.children 属性中
    props.children = childArray;
  }

  /**
   * 如果当前处理是组件
   * 看组件身上是否有 defaultProps 属性
   * 这个属性中存储的是 props 对象中属性的默认值
   * 遍历 defaultProps 对象 查看对应的 props 属性的值是否为 undefined
   * 如果为undefined 就将默认值赋值给对应的 props 属性值
   */

  // Resolve default props
  if (type && type.defaultProps) {
    const defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }

  if (__DEV__) {
    if (key || ref) {
      const displayName =
        typeof type === 'function'
          ? type.displayName || type.name || 'Unknown'
          : type;
      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }
      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }
  }

  return ReactElement(
    type,
    key,
    ref,
    self,
    source,
    null, // ReactCurrentOwner.current,
    props
  );
}

/**
 * 验证 object 参数是否是 ReactElement. 返回布尔值
 * 验证成功的条件:
 * object 是对象
 * object 不为null
 * object对象中的 $$typeof 属性值为 REACT_ELEMENT_TYPE
 *
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a ReactElement.
 * @final
 */
export function isValidElement(object: { [key: string]: any }) {
  return (
    typeof object === 'object' &&
    object !== null &&
    object.$$typeof === REACT_ELEMENT_TYPE
  );
}

// const props = { ref: 'ref', key: 'key' };
// defineKeyPropWarningGetter(props, 'key');
// defineRefPropWarningGetter(props, 'ref');

// props.key;
// props.ref;
