function getPropertyName(names: string[], target: object) {
  return names.find(name => name in target);
}

const enterFullScreenName = getPropertyName([
  'requestFullscreen',
  'mozRequestFullScreen',
  'webkitRequestFullScreen',
  'msRequestFullScreen',
], document.documentElement);

/**
 * 进入全屏
 * @param el 
 */
export function enterFullScreen(el = document.documentElement) {
  enterFullScreenName && el[enterFullScreenName]();
}

const exitFullScreenName = getPropertyName([
  'exitFullscreen',
  'mozCancelFullScreen',
  'webkitExitFullScreen',
  'msExitFullScreen',
], document);

console.log(enterFullScreenName, exitFullScreenName)
/**
 * 退出全屏
 */
export function exitFullScreen() {
  exitFullScreenName && document[exitFullScreenName]();
}

const fullScreenName = getPropertyName([
  'fullscreenElement',
  'mozFullScreenElement',
  'webkitFullScreenElement',
  'msFullScreenElement',
], document);

/**
 * 获取当前全屏元素
 * @returns 
 */
export function fullScreenEl() {
  return document[fullScreenName] || null;
}

/**
 * 是否处于全屏状态
 * @returns 
 */
export function isFullScreen() {
  return !!fullScreenEl();
}

/**
 * 进入/退出全屏
 */
export function toggleFullScreen() {
  isFullScreen() ? exitFullScreen() : enterFullScreen();
}
