//------------------------------------------
// 区分微前端环境和单独运行的加载机制
//------------------------------------------
/**
 * @name 处理资源
 */
if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
