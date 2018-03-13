/**
 * 工具函数
 */

export const noop = () => {}

/**
 *
 * @param {Element} el 页面元素
 * @param {String} type 事件类型
 * @param {Function} fn 事件函数
 * @return {Function} 返回事件解绑
 */
export const addEvent = (el, type, fn = noop) => {
  el.addEventListener(type, fn, false);

  return () => {
    removeEvent(el, type, fn);
  }
}

export const removeEvent = (el, type, fn = noop) => {
  el.removeEventListener(type, fn);
}
