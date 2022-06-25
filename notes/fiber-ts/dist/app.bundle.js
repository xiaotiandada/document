/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/react/CreateElement/index.ts":
/*!******************************************!*\
  !*** ./src/react/CreateElement/index.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ createElement; }
/* harmony export */ });
function createElement(type, props) {
  var _ref;

  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  // 将原有 children 拷贝一份 不要在原有数组上进行操作
  var childElements = (_ref = []).concat.apply(_ref, children).reduce(function (result, child) {
    // 如果子元素不是 false true null
    if (child !== false && child !== true && child !== null) {
      // 判断 child 是否是对象类型
      if (child instanceof Object) {
        // 如果是 什么都不需要做 直接返回即可
        result.push(child);
      } else {
        // 如果不是对象就是文本 手动调用 createElement 方法将文本转换为 Virtual DOM
        result.push(createElement('text', {
          textContent: child
        }));
      }
    }

    return result;
  }, []);

  return {
    type: type,
    props: Object.assign({
      children: childElements
    }, props)
  };
}

/***/ }),

/***/ "./src/react/DOM/createDOMElement.ts":
/*!*******************************************!*\
  !*** ./src/react/DOM/createDOMElement.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ createDOMElement; }
/* harmony export */ });
/* harmony import */ var _updateNodeElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateNodeElement */ "./src/react/DOM/updateNodeElement.ts");

function createDOMElement(virtualDOM) {
  var newElement = null;

  if (virtualDOM.type === 'text') {
    newElement = document.createTextNode(virtualDOM.props.textContent);
  } else {
    newElement = document.createElement(virtualDOM.type);
    (0,_updateNodeElement__WEBPACK_IMPORTED_MODULE_0__["default"])(newElement, virtualDOM);
  }

  return newElement;
}

/***/ }),

/***/ "./src/react/DOM/index.ts":
/*!********************************!*\
  !*** ./src/react/DOM/index.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createDOMElement": function() { return /* reexport safe */ _createDOMElement__WEBPACK_IMPORTED_MODULE_0__["default"]; },
/* harmony export */   "updateNodeElement": function() { return /* reexport safe */ _updateNodeElement__WEBPACK_IMPORTED_MODULE_1__["default"]; }
/* harmony export */ });
/* harmony import */ var _createDOMElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createDOMElement */ "./src/react/DOM/createDOMElement.ts");
/* harmony import */ var _updateNodeElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./updateNodeElement */ "./src/react/DOM/updateNodeElement.ts");



/***/ }),

/***/ "./src/react/DOM/updateNodeElement.ts":
/*!********************************************!*\
  !*** ./src/react/DOM/updateNodeElement.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ updateNodeElement; }
/* harmony export */ });
function updateNodeElement(newElement, virtualDOM) {
  var oldVirtualDOM = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var newProps = virtualDOM.props;

  if (virtualDOM.type === 'text') {
    virtualDOM.parent.stateNode.appendChild(document.createTextNode(newProps.textContent));
    return;
  }
}

/***/ }),

/***/ "./src/react/Misc/CreateTaskQueue/index.ts":
/*!*************************************************!*\
  !*** ./src/react/Misc/CreateTaskQueue/index.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var createTaskQueue = function createTaskQueue() {
  var taskQueue = [];
  return {
    push: function push(item) {
      return taskQueue.push(item);
    },
    pop: function pop() {
      return taskQueue.shift();
    },
    isEmpty: function isEmpty() {
      return taskQueue.length === 0;
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (createTaskQueue);

/***/ }),

/***/ "./src/react/Misc/arrified/index.ts":
/*!******************************************!*\
  !*** ./src/react/Misc/arrified/index.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var arrified = function arrified(args) {
  return Array.isArray(args) ? args : [args];
};

/* harmony default export */ __webpack_exports__["default"] = (arrified);

/***/ }),

/***/ "./src/react/Misc/createStateNode/index.ts":
/*!*************************************************!*\
  !*** ./src/react/Misc/createStateNode/index.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _DOM_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../DOM/index */ "./src/react/DOM/index.ts");


var createStateNode = function createStateNode(fiber) {
  if (fiber.tag === 'host_component') {
    return (0,_DOM_index__WEBPACK_IMPORTED_MODULE_0__.createDOMElement)(fiber);
  }
};

/* harmony default export */ __webpack_exports__["default"] = (createStateNode);

/***/ }),

/***/ "./src/react/Misc/getTag/index.ts":
/*!****************************************!*\
  !*** ./src/react/Misc/getTag/index.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var getTag = function getTag(vdom) {
  if (typeof vdom.type === 'string') {
    return 'host_component';
  }
};

/* harmony default export */ __webpack_exports__["default"] = (getTag);

/***/ }),

/***/ "./src/react/Misc/index.ts":
/*!*********************************!*\
  !*** ./src/react/Misc/index.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "arrified": function() { return /* reexport safe */ _arrified_index__WEBPACK_IMPORTED_MODULE_1__["default"]; },
/* harmony export */   "createStateNode": function() { return /* reexport safe */ _createStateNode_index__WEBPACK_IMPORTED_MODULE_3__["default"]; },
/* harmony export */   "createTaskQueue": function() { return /* reexport safe */ _CreateTaskQueue_index__WEBPACK_IMPORTED_MODULE_0__["default"]; },
/* harmony export */   "getTag": function() { return /* reexport safe */ _getTag_index__WEBPACK_IMPORTED_MODULE_2__["default"]; }
/* harmony export */ });
/* harmony import */ var _CreateTaskQueue_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateTaskQueue/index */ "./src/react/Misc/CreateTaskQueue/index.ts");
/* harmony import */ var _arrified_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./arrified/index */ "./src/react/Misc/arrified/index.ts");
/* harmony import */ var _getTag_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getTag/index */ "./src/react/Misc/getTag/index.ts");
/* harmony import */ var _createStateNode_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createStateNode/index */ "./src/react/Misc/createStateNode/index.ts");





/***/ }),

/***/ "./src/react/index.ts":
/*!****************************!*\
  !*** ./src/react/index.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* reexport safe */ _reconciliation_index__WEBPACK_IMPORTED_MODULE_1__.render; }
/* harmony export */ });
/* harmony import */ var _CreateElement_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateElement/index */ "./src/react/CreateElement/index.ts");
/* harmony import */ var _reconciliation_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reconciliation/index */ "./src/react/reconciliation/index.ts");


/* harmony default export */ __webpack_exports__["default"] = ({
  createElement: _CreateElement_index__WEBPACK_IMPORTED_MODULE_0__["default"]
});

/***/ }),

/***/ "./src/react/reconciliation/index.ts":
/*!*******************************************!*\
  !*** ./src/react/reconciliation/index.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": function() { return /* binding */ render; }
/* harmony export */ });
/* harmony import */ var _Misc_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Misc/index */ "./src/react/Misc/index.ts");

/**
 * 任务队列
 */

var taskQueue = (0,_Misc_index__WEBPACK_IMPORTED_MODULE_0__.createTaskQueue)();
/**
 * 要执行的子任务
 */

var subTask = null;
var pendingCommit = null;

var getFirstTask = function getFirstTask() {
  /**
   * 从任务队列中获取任务
   */
  var task = taskQueue.pop();
  console.log('task', task);
  /**
   * 返回最外层节点的 fiber 对象
   */

  return {
    props: task.props,
    stateNode: task.dom,
    tag: 'host_root',
    effects: [],
    child: null,
    alternate: task.dom.__rootFiberContainer
  };
};

var reconcileChildren = function reconcileChildren(fiber, children) {
  /**
   * children 可能对象 也可能是数组
   * 将 children 转换成数组
   */
  var arrifiedChildren = (0,_Misc_index__WEBPACK_IMPORTED_MODULE_0__.arrified)(children);
  var index = 0;
  var numberOfElements = arrifiedChildren.length;
  var element = null;
  var newFiber = null;
  var prevFiber = null;

  while (index < numberOfElements) {
    element = arrifiedChildren[index]; // 初始渲染

    newFiber = {
      type: element.type,
      props: element.props,
      tag: (0,_Misc_index__WEBPACK_IMPORTED_MODULE_0__.getTag)(element),
      effects: [],
      effectTag: 'placement',
      stateNode: null,
      parent: fiber
    };
    newFiber.stateNode = (0,_Misc_index__WEBPACK_IMPORTED_MODULE_0__.createStateNode)(newFiber);

    if (index === 0) {
      fiber.child = newFiber;
    }

    index++;
  }
};

var executeTask = function executeTask(fiber) {
  /**
   * 构建子级 fiber 对象
   */
  reconcileChildren(fiber, fiber.props.children);

  if (fiber.child) {
    return fiber.child;
  }

  var currentExecutelyFiber = fiber;

  while (currentExecutelyFiber.parent) {
    currentExecutelyFiber.parent.effects = currentExecutelyFiber.parent.effects.concat(currentExecutelyFiber.effects.concat([currentExecutelyFiber]));
    currentExecutelyFiber = currentExecutelyFiber.parent;
  }

  pendingCommit = currentExecutelyFiber;
  console.log('pendingCommit', pendingCommit);
};

var commitAllWork = function commitAllWork(fiber) {
  fiber.effects.forEach(function (item) {
    if (item.effectTag === 'placement') {
      var _fiber = item;
      var parentFiber = item.parent;

      if (_fiber.tag === 'host_component') {
        parentFiber.stateNode.appendChild(_fiber.stateNode);
      }
    }
  });
};

var workLoop = function workLoop(deadline) {
  /**
   * 如果子任务不存在 就去获取子任务
   */
  if (!subTask) {
    subTask = getFirstTask();
    console.log('subTask', subTask);
  }
  /**
   * 如果任务存在并且浏览器有空余的时间就调用
   * executeTask 方法执行任务 接受任务 返回新的任务
   */


  while (subTask && deadline.timeRemaining() > 1) {
    subTask = executeTask(subTask);
  }

  if (pendingCommit) {
    commitAllWork(pendingCommit);
  }
};

var performTask = function performTask(deadline) {
  /**
   * 执行任务
   */
  workLoop(deadline);
};

var render = function render(element, dom) {
  console.log('render', element);
  /**
   * 1. add task queue
   * 2. 空闲执行任务
   */

  /**
   * 任务就是通过 vdom 对象 构建 fiber 对象
   */

  taskQueue.push({
    dom: dom,
    props: {
      children: element
    }
  });
  /**
   * 指定在浏览器空闲的时间去执行任务
   */

  requestIdleCallback(performTask);
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _react_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./react/index */ "./src/react/index.ts");

var tsx = _react_index__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('div', null, _react_index__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('div', null, 'hello'), _react_index__WEBPACK_IMPORTED_MODULE_0__["default"].createElement('div', null, 'world'), 'react');
var tsx1 = /*#__PURE__*/_react_index__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", null, "Hello");
var root = document.getElementById('root');
(0,_react_index__WEBPACK_IMPORTED_MODULE_0__.render)(tsx, root);
console.log('fiber', tsx);
console.log('fiber', tsx1);
}();
/******/ })()
;
//# sourceMappingURL=app.bundle.js.map