/**
 * get tag
 * @param vdom
 * @returns
 */
const getTag = (vdom: { type: string }) => {
  if (typeof vdom.type === 'string') {
    return 'host_component';
  }
};

export default getTag;
