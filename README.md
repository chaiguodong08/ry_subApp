### 项目开发步骤

* 确认模块划分的微应用
* 全局安装脚手架及创建子应用

```js
npm i ry-cli -g     // 全局安装脚手架
ry                  // 查看脚手架详细信息
ry add              // 添加应用模板 // ry-master ry-subApp 
ry list             // 查看cli脚手架模板列表
ry delete           // 删除列表
ry init             // 初始化子应用工程项目
```

## 使用脚手架安装子应用注意事项

* 新建子应用时，选择ry-subApp类型，会创建一个子应用项目工程模板
* 新建子应用时会让输入端口号，主要用于微前端应用，端口号必须与主应用中注册表端口号一致
* 在主应用目录`app-configs.js`注册表内新增子应用注册数据结构
* 注意创建子应用工程模板后，按应用注册表在`src/views/`新建路由映射文件
* 微前端模式的子应用需要有一个根路由'/',即子应用`${routerBase}/`

## 项目启动

```js
cd sub-app            // 打开创建子应用项目
yarn i                // 安装项目所需要的依赖
npm run dev           // 项目启动
```

### 创建子应用注意事项

* 注意设置 public-path `区分微前端环境和单独运行机制`
* 端口号必须和注册子应用时的一致，子应用项目名称和注册子应用的名称一致
* 开发时开启headers跨域头信息
* 注意outPut按照规定格式打包
* 所有的资源（图片/音视频等）都应该放到 src 目录，不要放在 public 或 者static资源放 src 目录，会经过 webpack 处理，能统一注入 publicPath。否则在主项目中会404
* 避免 css 污染，组件内样式必须加 css-scoped
* 谨慎使用 position：fixed，在父项目中，这个定位未必准确，应尽量避免使用
* 给 body 、 document 等绑定的事件，一定要在unmount 周期清除，js 沙箱只劫持了 window.addEventListener，使用 document.body.addEventListener 或者 document.body.onClick 添加的事件并不会被沙箱移除会对其他的页面产生影响

```js
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
```

### webpack配置

* 1.headers: {'Access-Control-Allow-Origin': '*'}  // 允许跨域
* 2.打包成 umd 格式,为了让 qiankun 拿到其 export 的生命周期函数

```bash
// 自定义webpack配置
	configureWebpack: {
	output: {
	library: `${name}-[name]`,
	libraryTarget: 'umd',// 把子应用打包成 umd 库格式
	jsonpFunction: `webpackJsonp_${name}`
	}}
```

### 子应用目录结构

```bash
core                  
 |-------life-cycle.js     // 设置子应用生命周期逻辑 // 实例化render
 |-------public-path.js    // 单独环境实例化Vue    
 |
signal
 |-------appStore.js       // 子应用动态通讯机制
```

```bash
1.子应用生命周期分为四个阶段 
1.1）bootstrap 子应用初始化阶段，只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap
1.2）mount 微应用实例化阶段，主要用于注册应用间的动态通讯，微应用实例化
1.3）unmount 微应用销毁阶段，用于销毁实例、路由等防止污染生态
1.4）update 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效，手动加载子应用
```

### 子应用路由处理

* 实例化VUE-ROUTER   注意与主应用路由保持一致  `history` / *
* 路由映射真实视图路径,需要区分两种情况：① 当路由只有一级路由的时候 ② 当路由包括二级路由的时候

### 子应用通讯处理 

*主应用必须注册了通信`initGlobalState`方法
*注册主应用通过props下发`onGlobalStateChange`、`setGlobalState`方法:

```bash
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
```
