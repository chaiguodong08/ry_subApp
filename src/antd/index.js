/**
 * @description antd-v 按需加载
 * @author  JackChai
 * @create  2020 - 11
 */
import {
  Button,
  Space,
  Icon,
  Table,
  Tag,
  Row,
  Col,
  Drawer,
  Form,
  Input,
  Alert,
  Radio,
  Select,
  Notification,
  Modal,
  Result,
  Descriptions,
  DatePicker,
  Card,
  List
} from 'ant-design-vue';

const ant_design = {
  install: function (Vue) {
    Vue.use(Button);
    Vue.use(Space);
    Vue.use(Icon);
    Vue.use(Table);
    Vue.use(Tag);
    Vue.use(Row);
    Vue.use(Col);
    Vue.use(Drawer);
    Vue.use(Form);
    Vue.use(Input);
    Vue.use(Alert);
    Vue.use(Radio);
    Vue.use(Select);
    Vue.use(Modal);
    Vue.use(Result);
    Vue.use(Descriptions);
    Vue.use(DatePicker);
    Vue.use(Card);
    Vue.use(List);
    Vue.prototype.$notification = Notification;
    Vue.prototype.$confirm = Modal.confirm
  }
}

export default ant_design;
