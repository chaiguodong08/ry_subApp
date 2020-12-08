<template>
  <a-result
    status="success"
    title="子应用加载完成"
    sub-title="文档移步根目录下`README.md`查看！">
    <template #extra>
      <div class="desc">
        <a-list :bordered="true">
          <a-list-item>
            1.注意设置 public-path 区分微前端环境和单独运行机制
          </a-list-item>
          <a-list-item>
            2.端口号必须和注册子应用时的一致，子应用项目名称和注册子应用的名称一致
          </a-list-item>
          <a-list-item>
            3.开发时开启headers跨域头信息
          </a-list-item>
          <a-list-item>
            4.注意outPut按照规定格式打包
          </a-list-item>
          <a-list-item>
            5.所有的资源（图片/音视频等）都应该放到 src 目录
          </a-list-item>
          <a-list-item>
            6.避免 css 污染，组件内样式必须加 css-scoped
          </a-list-item>
          <a-list-item>
            7.谨慎使用 position：fixed，在父项目中，这个定位未必准确，应尽量避免使用
          </a-list-item>
          <div slot="header">
            创建子应用注意事项:
          </div>
        </a-list>
      </div>
    </template>
  </a-result>
</template>

<script>
  export default {
    name: "index"
  }
</script>

<style scoped>
  .desc {
    margin: 0 30%;
    background-color: #fafafa;
  }
</style>
