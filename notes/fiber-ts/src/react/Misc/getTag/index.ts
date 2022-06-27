/**
 * get tag
 * 通过 vdom type 判断类型返回 tag
 * @param vdom
 * @returns
 */
const getTag = (vdom: { type: string }) => {
  if (typeof vdom.type === 'string') {
    return 'host_component';
  }
};

export default getTag;
