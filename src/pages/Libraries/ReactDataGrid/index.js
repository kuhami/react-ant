import React,{Component} from 'react'
import ReactDataGrid from "react-data-grid";
import Editable from './Editable'
import { Card, Col, Row ,Icon,Select} from 'antd';

const { Option } = Select;
/*
*  columns  属性
* @formatter 单元格格式化
* @resizable 可拖拽宽度
* @editable 可编辑 单元格
* @editor 引用组件
* @frozen 固定列
 */
const aa = <Select defaultValue="lucy" style={{ width: 120 }} >
  <Option value="jack">Jack</Option>
  <Option value="lucy">Lucy</Option>
  <Option value="disabled" disabled>
    Disabled
  </Option>
  <Option value="Yiminghe">yiminghe</Option>
</Select>

export default class ReactDataGrids extends Component {
  constructor(props) {
    super(props);

    const Formatter = ({ value }) => {
      return <div style={{textAlign:'center'}}>{value === '+' ? <Icon type="plus" onClick={this.addRow} style={{fontSize:'24px'}}/>:<Icon type="delete" onClick={()=>this.deleteRow(value)} style={{fontSize:'20px'}}/>}</div>;
    };
    const columns = [
      {key: "_ID", width:50, name: "操作",formatter:Formatter,frozen:true },
      {key: "id", width:50, name: "序数",frozen:true },
      { key: "fsMaterialId",width:100, name: "物料代码",editor: Editable},
      { key: "fsMaterialName",width:200, name: "物料名称",editor: Editable,resizable:true},
      { key: "purchase_price", width:100,name: "价格",editable:true,resizable:true },
      { key: "component", width:200,name: "component",formatter:aa }
    ];

    const rows = [
        ...this.createRows(),
      { _ID:'+',id: '4000' }
    ];
    this.state = {
      selectIndex:0,
      rows,
      columns
    }
  }
  createRows = () => {
    let rows = [];
    for (let i = 1; i < 4000; i++) {
      rows.push({
        _ID:i,
        id: i,
        fsMaterialId: `code-${i}`,
        fsMaterialName: `物料名称-${i}`,
        component:i
      });
    }

    return rows;
  };
  //选中表格坐标
  handleCellSelected = (row, idx) =>{
    const {rowIdx} = row;
    this.setState({
      selectIndex:rowIdx
    })
  }
  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState(state => {
      const rows = this.state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  };

  handleGridKeyDown = (e) => {
    const {keyCode} = e;
    const {rows,selectIndex} = this.state;
    const lastRowId = rows[rows.length-1].id;
    if ((keyCode === 40) && +selectIndex === +lastRowId) {
      this.addRow()
    }
  };
  //增加行
  addRow = () => {
    const {rows} = this.state;
      rows.pop();
    const row = { _ID: rows.length,id: rows.length, fsMaterialName: "", component: '' };
    const addRow = { _ID:'+',id: rows.length +1 }
    this.setState({
      rows:[...rows,row,addRow]
    })
  }

  // 删除行
  deleteRow = (rowId) =>{
    console.log('删除行的id',rowId)
    const {rows} = this.state;
    console.log(rows);
    const newRow = rows.filter((v) =>{
      return +v.id !== +rowId
    });
    console.log(newRow);
    this.setState({
      rows:newRow.map((v,index)=> {
        v.id = index
        if(v._ID !== '+'){
          v._ID = index
        }
        return v
      })
    })
  }

  getCellActions = (column, row) => {

    const IdActions = [
      {
        icon: <div><Icon type="delete" style={{fontSize:'22px'}}/></div> ,
        callback: () => {
          alert("Deleting");
        }
      }
    ];
    const cellActions = {
      id: IdActions
    };

    //return row.id !== '+' ? cellActions[column.key] : null;
  }

  render () {
    const title = <a href="https://adazzle.github.io/react-data-grid/docs/examples/simple-grid" target={'_blank'}>React Data Grid</a>
    const {rows, columns} = this.state;
    return (
      <Card title={title} bordered={true} style={{minHeight:'calc(100vh)'}}>
        <div style={{width:'100%'}}>
          <ReactDataGrid
            columns={columns}
            rowGetter={i => rows[i]} //行
            rowsCount={rows.length} //行数
            onCellSelected={this.handleCellSelected} //选中的行
            onGridRowsUpdated = {this.onGridRowsUpdated}
            onGridKeyDown={this.handleGridKeyDown} //键盘按下事件
            getCellActions={this.getCellActions}
            enableCellSelect={true} //可下拉数据
            dragable={true}
            minHeight={500}
          />
        </div>
      </Card>
    )

  }

}
