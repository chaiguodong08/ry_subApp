//----------------------------------
// 处理路由映射真实路径
// 错误路径重定向至'404'
//----------------------------------
import {DataType} from "wl-core";

/**
 * @name 根据路由匹配地址
 * @param {*} data      // 路由数据
 * @param {*} base      // 路由前缀
 * @param {*} options   // 粗略的配置项
 */
function routeMatch(
  data,
  base,
  options = {url: "url", name: "name", id: "id", permissions: "permissions"}
) {
  // 如果data 不是一个数组则返回一个空数组
  if (!DataType.isArray(data)) return [];
  // 创建路由盒子
  let routerBox = [];

  routerMapFile(data);

  /**
   * @name 路由映射真实视图路径
   * @param {*} data
   * 区分两种情况：
   * ① 当路由只有一级路由的时候
   * ② 当路由包括二级路由的时候
   */
  function routerMapFile(data) {
    data.forEach(item => {
      if (item[options.url]) {
        let _base = base.replace("/", "");
        let _url = item[options.url].replace(`${_base}/`, "");
        try {
          let routerItem = {
            // 路由路径名
            path: `/${_url}`,
            // 路由映射真实视图路径
            component: () => import(`@/views/${_url}/index.vue`)
          };
          routerBox.push(routerItem);
        } catch (err) {
          // TODO 引入消息通知，记得把err通知给客户端
          console.log(err);
        }
      }
      // 处理二级路由
      if (DataType.isArray(item.children)) routerMapFile(item.children);
    });
  }

  return routerBox;
}

export default routeMatch;
