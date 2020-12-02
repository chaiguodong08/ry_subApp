import Vue from 'vue';
import Modal from './modal';

export function createOpenModal(component) {
  return (data) => {
    // data 通过Object的方式加载出来
    // function 也可以按照Object方式传过来
    let {
      props,
      onOk,
      onCancel,
      parent
    } = data;
    const VueComponent = Vue.extend(component);
    let modalVm = new VueComponent({
      parent,
      propsData: props,
    });
    const rootVm = modalVm;

    rootVm.$mount();
    // 拿到 modal 组件实例
    const options = typeof component === 'function' ? component.options : component;
    if (options.name !== 'modal-pro') {
      const vm = rootVm.$children[0];

      if (vm && vm.$options.name === 'modal-pro') {
        modalVm = vm;
      } else {
        throw new Error('根组件必须是modal');
      }
    }

    modalVm.innerVisible = true;
    // 对获取的的 modal 实例注入 $onOk $onCancel $afterClose 方法
    // 用来控制 promise 的结束时机和返回值
    return new Promise((resolve) => {
      // res 为 该 promise 返回值
      let res = false;
      modalVm.$onOk = async (data) => {
        if (onOk) {
          const res = await onOk(data);
          if (res === false) return;
        }
        modalVm.innerVisible = false;
        res = data || true;
      };
      modalVm.$onCancel = async (data) => {
        if (onCancel) {
          const res = await onCancel(data);
          if (res === false) return;
        }

        modalVm.innerVisible = false;
        res = false;
      };
      // 弹窗关闭后结束 promise 并返回 res
      modalVm.$afterClose = () => {
        resolve(res);
      };
    }).then(value => {
      // 结束时销毁弹窗的实例
      rootVm.$destroy();
      return value;
    });
  };
}

export const modal = createOpenModal(Modal);

