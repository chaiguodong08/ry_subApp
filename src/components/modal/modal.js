/**
 * @name 封装弹窗 async ({ props: any }): any | boolean; 类型的方法
 * @author JackChai
 * @create 2020 - 11
 */
export default {
  name: 'modal-pro',
  props: [
    'title',
    'content',
    'onOk',
    'onCancel',
    'okText',
    'footer',
    'cancelText'],
  data() {
    return {
      // 控制弹窗的显示， 不再放在 props 中， 改为内部控制
      innerVisible: false
    };
  },
  methods: {
    async onAfterClose() {
      // $afterClose 是外部注入的方法
      if (this.$afterClose) this.$afterClose();
    },
    async confirm() {
      // 如果 res 返回最终为 false 将不关闭弹窗
      let res;
      if (this.onOk) {
        res = await this.onOk();
        if (res === false) return;
      }
      // $onOk 是外部注入的方法， res 将会作为 openModal 方法的结果返回
      if (this.$onOk) return this.$onOk(res);
    },
    async cancel() {
      // 如果 res 返回最终为 false 将不关闭弹窗
      let res;
      if (this.onCancel) {
        res = await this.onCancel();
        if (res === false) return;
      }
      // $onCancel 是外部注入的方法
      if (this.$onCancel) return this.$onCancel(res);
    }
  },
  render() {
    let content = this.content;
    if (!content) {
      content = this.$scopedSlots.default ? this.$scopedSlots.default : null;
    }
    return (
      <a-modal
        destroyOnClose={true}
        title={this.title}
        onOk={this.confirm}
        afterClose={this.onAfterClose}
        onCancel={this.cancel}
        visible={this.innerVisible}
        footer={this.footer}
      >
        {typeof content === 'function' ? content() : content}
      </a-modal>
    );
  }
};
