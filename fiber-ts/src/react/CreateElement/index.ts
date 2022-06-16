export default function createElement(
  type: string,
  props: any,
  ...children: any[]
): {
  type: string;
  props: any;
} {
  // 将原有 children 拷贝一份 不要在原有数组上进行操作
  const childElements = [].concat(...children).reduce((result, child) => {
    // 如果子元素不是 false true null
    if (child !== false && child !== true && child !== null) {
      // 判断 child 是否是对象类型
      if (child instanceof Object) {
        // 如果是 什么都不需要做 直接返回即可
        result.push(child);
      } else {
        // 如果不是对象就是文本 手动调用 createElement 方法将文本转换为 Virtual DOM
        result.push(createElement('text', { textContent: child }));
      }
    }
    return result;
  }, []);

  return {
    type,
    props: Object.assign({ children: childElements }, props),
  };
}
