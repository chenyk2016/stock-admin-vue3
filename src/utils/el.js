/**
 * @Author: San Feng
 * @Date: 2019/3/11 14:41
 * @Description: 元素相关
 */

const el = {};

/**
 * 判断元素是否为另一个元素的子元素
 * @param $el obj 元素
 * @param $parent obj 父元素
 * @returns {*}
 */
el.isChildOf = function ($el, $parent) {
  while ($el && $el.tagName.toUpperCase() !== 'BODY') {
    if ($el === $parent) return true;
    $el = $el.parentNode;
  }

  return false;
};

/**
 * 判断元素是否为另一个元素的子元素
 * @param $el obj 元素
 * @param className str 类名
 * @returns {*}
 */
el.getClosestByClassName = function ($el, className) {
  while ($el && !(`${$el.className}`).split(' ').includes(className)) {
    $el = $el.parentNode;
  }

  return $el;
};

/**
 * 获取元素相对于窗口的位置, 元素相对于窗口绝对定位，不滚动
 * @param {Node} element
 * @param {Node} outDocumentFlow 元素是否脱离文档流，例如在弹窗中等，需要传true
 * @returns {Object} left, top
 */
el.getElementClientOffset = function (element, outDocumentFlow) {
  let actualTop = element.offsetTop;
  let current = element.offsetParent;
  let actualLeft = element.offsetLeft;
  let elementScrollLeft = document.documentElement.scrollLeft;
  let elementScrollTop = document.documentElement.scrollTop;
  let position = {}

  while (current !== null) {
    actualTop += current.offsetTop - current.scrollTop;
    actualLeft += current.offsetLeft - current.scrollLeft;
    // console.log(current.offsetTop, current.scrollTop, current.offsetLeft, current.scrollLeft)
    current = current.offsetParent;
  }

  // 脱离文档流，需要加上多减去的document的滚动
  if (outDocumentFlow) {
    position = {
      left: actualLeft + elementScrollLeft,
      top: actualTop + elementScrollTop,
    }
  } else {
    position = {
      left: actualLeft,
      top: actualTop,
    }
  }

  // console.log(actualLeft, actualTop, elementScrollLeft, elementScrollTop);

  return position
}

export default el;
export { el };
