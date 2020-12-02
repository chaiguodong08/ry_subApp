const path = require("path");
const {name, port} = require("./package");

/**
 * @name 连接任意多个字符串，连接对路径进行规范化
 * @param dir
 * @returns {string}
 */
function resolve(dir) {
  return path.join(__dirname, dir);
}

// 生产模式
const dev = process.env.NODE_ENV === "development";

/**
 * @name webpack 所有配置
 * @type {{devServer: {disableHostCheck: boolean, headers: {"Access-Control-Allow-Origin": string}, overlay: {warnings: boolean, errors: boolean}, port: number, hot: boolean}, outputDir: string, filenameHashing: boolean, configureWebpack: {output: {jsonpFunction: string, libraryTarget: string, library: string}, resolve: {alias: {"@": string}}}, assetsDir: string, publicPath: string}}
 */
module.exports = {
  // 部署应用包时的基本 URL
  publicPath: dev ? `//localhost:${port}` : "/",
  // 输出文件目录 生成的生产环境构建文件的目录
  outputDir: "dist",
  // 放置生成的静态资源 (js、css、img、fonts) 的目录
  assetsDir: "static",
  // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
  filenameHashing: true,
  // 调整内部网页包配置
  devServer: {
    // host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
    port,
    overlay: {
      warnings: false,
      errors: true
    },
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  // 自定义webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
        store: path.resolve(__dirname, 'src/store/index.js')
      }
    },
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: "umd",
      jsonpFunction: `webpackJsonp_${name}`
    }
  }
};
