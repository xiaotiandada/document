/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _react_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./react/index */ \"./src/react/index.ts\");\n\nvar tsx = _react_index__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createElement('div', null, _react_index__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createElement('div', null, 'hello'), _react_index__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createElement('div', null, 'world'), 'react');\nvar root = document.getElementById('root');\n(0,_react_index__WEBPACK_IMPORTED_MODULE_0__.render)(tsx, root);\nconsole.log('fiber', tsx);\n\n\n//# sourceURL=webpack://my-webpack-project/./src/index.ts?");

/***/ }),

/***/ "./src/react/CreateElement/index.ts":
/*!******************************************!*\
  !*** ./src/react/CreateElement/index.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ createElement; }\n/* harmony export */ });\nfunction createElement(type, props) {\n    var children = [];\n    for (var _i = 2; _i < arguments.length; _i++) {\n        children[_i - 2] = arguments[_i];\n    }\n    // 将原有 children 拷贝一份 不要在原有数组上进行操作\n    var childElements = [].concat.apply([], children).reduce(function (result, child) {\n        // 如果子元素不是 false true null\n        if (child !== false && child !== true && child !== null) {\n            // 判断 child 是否是对象类型\n            if (child instanceof Object) {\n                // 如果是 什么都不需要做 直接返回即可\n                result.push(child);\n            }\n            else {\n                // 如果不是对象就是文本 手动调用 createElement 方法将文本转换为 Virtual DOM\n                result.push(createElement('text', { textContent: child }));\n            }\n        }\n        return result;\n    }, []);\n    return {\n        type: type,\n        props: Object.assign({ children: childElements }, props),\n    };\n}\n\n\n//# sourceURL=webpack://my-webpack-project/./src/react/CreateElement/index.ts?");

/***/ }),

/***/ "./src/react/DOM/createDOMElement.ts":
/*!*******************************************!*\
  !*** ./src/react/DOM/createDOMElement.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ createDOMElement; }\n/* harmony export */ });\n/* harmony import */ var _updateNodeElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./updateNodeElement */ \"./src/react/DOM/updateNodeElement.ts\");\n\nfunction createDOMElement(virtualDOM) {\n    var newElement = null;\n    if (virtualDOM.type === 'text') {\n        newElement = document.createTextNode(virtualDOM.props.textContent);\n    }\n    else {\n        newElement = document.createElement(virtualDOM.type);\n        (0,_updateNodeElement__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(newElement, virtualDOM);\n    }\n    return newElement;\n}\n\n\n//# sourceURL=webpack://my-webpack-project/./src/react/DOM/createDOMElement.ts?");

/***/ }),

/***/ "./src/react/DOM/index.ts":
/*!********************************!*\
  !*** ./src/react/DOM/index.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createDOMElement\": function() { return /* reexport safe */ _createDOMElement__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; },\n/* harmony export */   \"updateNodeElement\": function() { return /* reexport safe */ _updateNodeElement__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; }\n/* harmony export */ });\n/* harmony import */ var _createDOMElement__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createDOMElement */ \"./src/react/DOM/createDOMElement.ts\");\n/* harmony import */ var _updateNodeElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./updateNodeElement */ \"./src/react/DOM/updateNodeElement.ts\");\n\n\n\n\n//# sourceURL=webpack://my-webpack-project/./src/react/DOM/index.ts?");

/***/ }),

/***/ "./src/react/DOM/updateNodeElement.ts":
/*!********************************************!*\
  !*** ./src/react/DOM/updateNodeElement.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ updateNodeElement; }\n/* harmony export */ });\nfunction updateNodeElement(newElement, virtualDOM, oldVirtualDOM) {\n    if (oldVirtualDOM === void 0) { oldVirtualDOM = {}; }\n    var newProps = virtualDOM.props;\n    if (virtualDOM.type === 'text') {\n        virtualDOM.parent.stateNode.appendChild(document.createTextNode(newProps.textContent));\n        return;\n    }\n}\n\n\n//# sourceURL=webpack://my-webpack-project/./src/react/DOM/updateNodeElement.ts?");

/***/ }),

/***/ "./src/react/Misc/CreateTaskQueue/index.ts":
/*!*************************************************!*\
  !*** ./src/react/Misc/CreateTaskQueue/index.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\nvar createTaskQueue = function () {\n    var taskQueue = [];\n    return {\n        push: function (item) { return taskQueue.push(item); },\n        pop: function () { return taskQueue.shift(); },\n        isEmpty: function () { return taskQueue.length === 0; },\n    };\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (createTaskQueue);\n\n\n//# sourceURL=webpack://my-webpack-project/./src/react/Misc/CreateTaskQueue/index.ts?");

/***/ }),

/***/ "./src/react/Misc/arrified/index.ts":
/*!******************************************!*\
  !*** ./src/react/Misc/arrified/index.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\nvar arrified = function (args) {\n    return Array.isArray(args) ? args : [args];\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (arrified);\n\n\n//# sourceURL=webpack://my-webpack-project/./src/react/Misc/arrified/index.ts?");

/***/ }),

/***/ "./src/react/Misc/createStateNode/index.ts":
/*!*************************************************!*\
  !*** ./src/react/Misc/createStateNode/index.ts ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _DOM_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../DOM/index */ \"./src/react/DOM/index.ts\");\n\nvar createStateNode = function (fiber) {\n    if (fiber.tag === 'host_component') {\n        return (0,_DOM_index__WEBPACK_IMPORTED_MODULE_0__.createDOMElement)(fiber);\n    }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (createStateNode);\n\n\n//# sourceURL=webpack://my-webpack-project/./src/react/Misc/createStateNode/index.ts?");

/***/ }),

/***/ "./src/react/Misc/getTag/index.ts":
/*!****************************************!*\
  !*** ./src/react/Misc/getTag/index.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\nvar getTag = function (vdom) {\n    if (typeof vdom.type === 'string') {\n        return 'host_component';\n    }\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (getTag);\n\n\n//# sourceURL=webpack://my-webpack-project/./src/react/Misc/getTag/index.ts?");

/***/ }),

/***/ "./src/react/Misc/index.ts":
/*!*********************************!*\
  !*** ./src/react/Misc/index.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"arrified\": function() { return /* reexport safe */ _arrified_index__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; },\n/* harmony export */   \"createStateNode\": function() { return /* reexport safe */ _createStateNode_index__WEBPACK_IMPORTED_MODULE_3__[\"default\"]; },\n/* harmony export */   \"createTaskQueue\": function() { return /* reexport safe */ _CreateTaskQueue_index__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; },\n/* harmony export */   \"getTag\": function() { return /* reexport safe */ _getTag_index__WEBPACK_IMPORTED_MODULE_2__[\"default\"]; }\n/* harmony export */ });\n/* harmony import */ var _CreateTaskQueue_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateTaskQueue/index */ \"./src/react/Misc/CreateTaskQueue/index.ts\");\n/* harmony import */ var _arrified_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./arrified/index */ \"./src/react/Misc/arrified/index.ts\");\n/* harmony import */ var _getTag_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getTag/index */ \"./src/react/Misc/getTag/index.ts\");\n/* harmony import */ var _createStateNode_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createStateNode/index */ \"./src/react/Misc/createStateNode/index.ts\");\n\n\n\n\n\n\n//# sourceURL=webpack://my-webpack-project/./src/react/Misc/index.ts?");

/***/ }),

/***/ "./src/react/index.ts":
/*!****************************!*\
  !*** ./src/react/index.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* reexport safe */ _reconciliation_index__WEBPACK_IMPORTED_MODULE_1__.render; }\n/* harmony export */ });\n/* harmony import */ var _CreateElement_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CreateElement/index */ \"./src/react/CreateElement/index.ts\");\n/* harmony import */ var _reconciliation_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reconciliation/index */ \"./src/react/reconciliation/index.ts\");\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n    createElement: _CreateElement_index__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n});\n\n\n//# sourceURL=webpack://my-webpack-project/./src/react/index.ts?");

/***/ }),

/***/ "./src/react/reconciliation/index.ts":
/*!*******************************************!*\
  !*** ./src/react/reconciliation/index.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"render\": function() { return /* binding */ render; }\n/* harmony export */ });\n/* harmony import */ var _Misc_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Misc/index */ \"./src/react/Misc/index.ts\");\n\n/**\n * 任务队列\n */\nvar taskQueue = (0,_Misc_index__WEBPACK_IMPORTED_MODULE_0__.createTaskQueue)();\n/**\n * 要执行的子任务\n */\nvar subTask = null;\nvar pendingCommit = null;\nvar getFirstTask = function () {\n    /**\n     * 从任务队列中获取任务\n     */\n    var task = taskQueue.pop();\n    console.log('task', task);\n    /**\n     * 返回最外层节点的 fiber 对象\n     */\n    return {\n        props: task.props,\n        stateNode: task.dom,\n        tag: 'host_root',\n        effects: [],\n        child: null,\n        alternate: task.dom.__rootFiberContainer,\n    };\n};\nvar reconcileChildren = function (fiber, children) {\n    /**\n     * children 可能对象 也可能是数组\n     * 将 children 转换成数组\n     */\n    var arrifiedChildren = (0,_Misc_index__WEBPACK_IMPORTED_MODULE_0__.arrified)(children);\n    var index = 0;\n    var numberOfElements = arrifiedChildren.length;\n    var element = null;\n    var newFiber = null;\n    var prevFiber = null;\n    while (index < numberOfElements) {\n        element = arrifiedChildren[index];\n        // 初始渲染\n        newFiber = {\n            type: element.type,\n            props: element.props,\n            tag: (0,_Misc_index__WEBPACK_IMPORTED_MODULE_0__.getTag)(element),\n            effects: [],\n            effectTag: 'placement',\n            stateNode: null,\n            parent: fiber,\n        };\n        newFiber.stateNode = (0,_Misc_index__WEBPACK_IMPORTED_MODULE_0__.createStateNode)(newFiber);\n        if (index === 0) {\n            fiber.child = newFiber;\n        }\n        index++;\n    }\n};\nvar executeTask = function (fiber) {\n    /**\n     * 构建子级 fiber 对象\n     */\n    reconcileChildren(fiber, fiber.props.children);\n    if (fiber.child) {\n        return fiber.child;\n    }\n    var currentExecutelyFiber = fiber;\n    while (currentExecutelyFiber.parent) {\n        currentExecutelyFiber.parent.effects =\n            currentExecutelyFiber.parent.effects.concat(currentExecutelyFiber.effects.concat([currentExecutelyFiber]));\n        currentExecutelyFiber = currentExecutelyFiber.parent;\n    }\n    pendingCommit = currentExecutelyFiber;\n    console.log('pendingCommit', pendingCommit);\n};\nvar commitAllWork = function (fiber) {\n    fiber.effects.forEach(function (item) {\n        if (item.effectTag === 'placement') {\n            var fiber_1 = item;\n            var parentFiber = item.parent;\n            if (fiber_1.tag === 'host_component') {\n                parentFiber.stateNode.appendChild(fiber_1.stateNode);\n            }\n        }\n    });\n};\nvar workLoop = function (deadline) {\n    /**\n     * 如果子任务不存在 就去获取子任务\n     */\n    if (!subTask) {\n        subTask = getFirstTask();\n        console.log('subTask', subTask);\n    }\n    /**\n     * 如果任务存在并且浏览器有空余的时间就调用\n     * executeTask 方法执行任务 接受任务 返回新的任务\n     */\n    while (subTask && deadline.timeRemaining() > 1) {\n        subTask = executeTask(subTask);\n    }\n    if (pendingCommit) {\n        commitAllWork(pendingCommit);\n    }\n};\nvar performTask = function (deadline) {\n    /**\n     * 执行任务\n     */\n    workLoop(deadline);\n};\nvar render = function (element, dom) {\n    console.log('render', element);\n    /**\n     * 1. add task queue\n     * 2. 空闲执行任务\n     */\n    /**\n     * 任务就是通过 vdom 对象 构建 fiber 对象\n     */\n    taskQueue.push({\n        dom: dom,\n        props: { children: element },\n    });\n    /**\n     * 指定在浏览器空闲的时间去执行任务\n     */\n    requestIdleCallback(performTask);\n};\n\n\n//# sourceURL=webpack://my-webpack-project/./src/react/reconciliation/index.ts?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;