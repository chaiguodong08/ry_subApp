/**
 * @description 自定义组件 // 方法  // 插件 挂载全局
 * @author  JackChai
 * @create  2020 - 11
 */
import {DetaiModal} from './index';

const util_whole = {
  install: function (Vue) {
    Vue.component('detai-modal', DetaiModal);
  }
}

export default util_whole;
