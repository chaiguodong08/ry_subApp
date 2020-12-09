import Vue from 'vue';
import VueRouter from 'vue-router';
import App from '@/App.vue';
import store from '@/store';
import animated from 'animate.css';
/**
 * @name ant_design 按需加载
 */
import ant_design from "@/antd";

/**
 * @name 导入主应用与子应用之间的通讯桥梁
 */
import appStore from "@/signal/appStore";


/**
 * @name 子应用路由定义
 */
import selfRoutes from '@/router/routes';

/**
 * @name 导入自定义路由匹配方法
 */
import routeMatch from "@/router/routes-match";

/**
 * @name 声明一个常量存放主应用下发的部分方法
 */
const EMITS = {};

/**
 * @name 为qianKun设置一个全局标识
 */
const __qiankun__ = window.__POWERED_BY_QIANKUN__;

/**
 * @name 初始化 router为null
 * @type {null}
 */
let router = null;

/**
 * @name 初始化实例
 * @type {null}
 */
let instance = null;

Vue.use(VueRouter);
Vue.use(ant_design);
Vue.use(animated);

//-----------------------------------------------------------------
// 子应用生命周期逻辑
// bootstrap - 初始化子应用:
// ① bootstrap 只会在微应用初始化的时候调用一次，
// 下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发。
// ② 通常我们可以在这里做一些全局变量的初始化，
// 比如不会在 unmount 阶段被销毁的应用级别的缓存等。
// mount - 挂载子应用:
// ① 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法。
// unmount - 卸载子应用
//-----------------------------------------------------------------
const lifeCycle = () => {
  return {
    /**
     * @name 微应用初始化
     * @param {Object} props 主应用下发的props
     */
    async bootstrap(props) {
      /**
       * @name 注册主应用下发的工具类
       */
      props?.utils.forEach(i => {
        Vue.use(i);
      });
      /**
       * @name 注册主应用下发的组件
       */
      props?.components.forEach(i => {
        Vue.component(`${i.name}`, i)
      })
      /**
       * @name 导入主应用常用方法类库
       */
      props?.globalUtils.forEach(i => {
        for (let key in i) {
          Vue.prototype[`${key}`] = i[key];
        }
      });
      /**
       * @name 导入主应用与服务器交互的方法
       */
      props?.emits.forEach(i => {
        for (let key in i) {
          EMITS[`${key}`] = i[key]
        }
      });
      /**
       * @name 子应用的加载转态 // 返回false子应用加载完成
       */
      props?.loader(false);
    },
    /**
     * @name 实例化微应用
     * @param {Object} props 主应用下发的props
     */
    async mount(props) {

      // 注册应用间通信
      appStore(props);
      // 注册微应用实例化函数
      render(props);
    },
    /**
     * @name 微应用销毁时 // 注意清空dom ，vue子项目内存泄露问题
     */
    async unmount() {
      instance.$destroy?.();
      // 清空 dom 防止子项目内存泄露
      instance.$el.innerHTML = "";
      instance = null;
      router = null;
    },
    /**
     * @name 手动加载微应用触发的生命周期
     * @param {Object} props 主应用下发的props
     */
    async update(props) {
      console.log("update props", props);
    }
  };
};

const render = ({routes, routerBase, container} = {}) => {
  Vue.config.productionTip = false;
  /**
   * @name 实例化VUE-ROUTER  // 注意与主应用路由保持一致 // history / *
   * @type {VueRouter}
   */
  router = new VueRouter({
    base: __qiankun__ ? routerBase : '/',
    mode: 'history',
    routes: __qiankun__ ? routeMatch(routes, routerBase) : selfRoutes
  });
  /**
   * 实例化Vue
   * @type {Vue | object | Record<never, any>}
   */
  instance = new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount(container ? container.querySelector("#app") : "#app");
}

export {lifeCycle, render, EMITS};

