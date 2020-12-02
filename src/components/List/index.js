import './index.css';

export default ({props}) => {
  /**
   * @param columns    // 表格列的配置描述
   * @param dataSource // 数据源
   */
  let {columns, dataSource} = props
  // columns 数据类型必须是 Array
  if (Object.prototype.toString.call(columns) !== '[object Array]') {
    throw new Error('columns type Array!')
  }
  // dataSource 数据类型必须为 Object
  if (Object.prototype.toString.call(dataSource) !== '[object Object]') {
    throw new Error('columns type Object!')
  }

  // 处理数据
  let tableData = [];

  for (var i = 0; i < columns.length; i += 3) {
    let tabItem = {
      th: [],
      td: []
    };
    tabItem.th = columns.slice(i, i + 3);
    tabItem.th.map((item) => {
      console.log()
      tabItem.td.push({name: dataSource[`${item.dataIndex}`]});
    });
    tableData.push(tabItem);
  }


  /**
   * @name 渲染List
   */
  function renderList() {
    // 接收table 渲染Table组件
    let tableRender = [];
    for (let i = 0; i < tableData.length; i++) {
      tableRender.push(
        <table id='_self_table_'>
          <tr>{tableData[i].th.map(xl => {
            return <th id='_s_table_th'>
              {xl.title}</th>
          })}</tr>
          < tr>{tableData[i].td.map(xxl => {
            return <td id='_s_table_td'>
              {xxl.name}</td>
          })}</tr>
        </table>
      )
    }
    return tableRender;
  }

  return <div>{renderList()}</div>
}
