import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';

Vue.use(Vuex)

// 不需要 `import app from './modules/app'`
// 自动生成 vuex 中所需的模块 {state、action、mutations} 模块批量导入

/**
 * directory         第一个参数：读取文件的路径
 * useSubdirectories 第二个参数：是否遍历文件的子目录
 * regExp            第三个参数：匹配文件的正则表达式
 */
const modulesFiles = require.context('./modules', true, /\.js$/);

/**
 * @description total        必需 初始值
 * @description currentValue 必需 当前元素
 * reduce(()=> {total, currentValue, currentIndex, arr}, initValue)
 */
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  // 执行modulesFiles函数，返回一个对象{default: {// 文件内容}, _esModule: true}
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default
  return modules
}, {})


const store = new Vuex.Store({
  modules,
  getters
})

export default store
