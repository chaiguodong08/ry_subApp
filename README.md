### 项目开发步骤

* 确认模块划分的微应用
* 全局安装脚手架及创建子应用

```js
npm i ry-cli -g     // 全局安装脚手架
ry                  // 查看脚手架详细信息
ry add              // 添加应用模板 // ry-master ry-subApp 
ry list             // 查看cli脚手架模板列表
ry delete           // 删除列表
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

```js
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
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
1.子应用生命周期分为三个阶段 
1.1）bootstrap 子应用初始化阶段，主要注册主应用下发的工具类、公用组件、公用方法等
1.2）mount 微应用实例化阶段，主要用于注册应用间的动态通讯，微应用实例化
1.3）unmount 微应用销毁阶段，用于销毁实例、路由等防止污染生态
1.4）update 
