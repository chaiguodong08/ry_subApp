import {DataType} from "wl-core";

/**
 * @name 声明一个常量准备将props内的部分内容储存起来
 */
const STORE = {};

/**
 * @name 启动应用间通信机制
 * @param {Object} props   // 通信函数
 * @description            // 注意：主应用是initGlobalState方法，
 * @description            // 注意：子应用是附加在props上的onGlobalStateChange, setGlobalState方法（只有主应用注册了通信才会有）
 */
const appStore = props => {
  /**
   * @name 监听应用间通信，并存入store
   */
  props?.onGlobalStateChange?.(
    (value, prev) => {
      console.log(value, prev);
    },
    true
  );
  /**
   * @name 改变并全局广播新消息
   */
  props?.setGlobalState?.({});

  /**
   * @name 将你需要的数据存起来
   * @description // 供下面setState方法更新
   */
  STORE.setGlobalState = props?.setGlobalState;

};

/**
 * @name 全局setState方法 // 修改的内容将通知所有微应用
 * @param {Object} data  // 按照你设定的内容格式数据
 */
const setState = (data) => {
  if (!DataType.isObject(data)) throw Error('data必须是对象格式');
  STORE.setGlobalState?.({
    ...data
  })
};

export {
  setState,
  STORE
}


export default appStore;
