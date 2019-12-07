import React,{PureComponent} from "react";
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";

const defaultColumnProperties = {
  resizable: true,
  // width: 120
};

class Editable extends PureComponent {
  constructor(props){
    super(props);
    console.log(props);
    this.state = {
      textValue: '',
      selectIndex: 0,
      newValue: "",
      candidateRows: [],
      page:1,
      page_size: 10,
      isLoad: false,
      columnsCandidate: [
        { key: "fsMaterialId", name: "物料代码" },
        { key: "fsMaterialName", name: "存货名称" },
        { key: "code", name: "助记码" },
        { key: "extended_information", name: "规格型号" },
        { key: "last_price", name: "上次采购价" },
        { key: "stock_num", name: "现存量" },
        { key: "freeze_num", name: "冻结数量" },
      ].map(c => ({ ...c, ...defaultColumnProperties })),
    };
  }
  componentDidMount() {

  }
  getValue() {
    const selectIndex = this.state.selectIndex;

    if(this.state.candidateRows.length-1<selectIndex){
      return false;
      return { [this.props.column.key]:'',fsMaterialName: this.state.value,goods_id, unit , purchase_price:last_price, extended_information, goods_short_name, code };
    }
    const selectedRow = this.state.candidateRows[selectIndex]

    if(!selectedRow){
      return false;
      return { [this.props.column.key]:'',fsMaterialName: this.state.value,goods_id, unit , purchase_price:last_price, extended_information, goods_short_name, code};
    }



    const textValue = selectedRow.fsMaterialName;
    const last_price = selectedRow.last_price;
    const extended_information = selectedRow.extended_information;
    const goods_short_name = selectedRow.goods_short_name;
    const code = selectedRow.code;
    const unit = selectedRow.unit;
    const goods_id = selectedRow.goods_id;
    const fsMaterialId = selectedRow.fsMaterialId;
    return { [this.props.column.key]: textValue, goods_id, unit, purchase_price:last_price, extended_information, goods_short_name, code,fsMaterialId };
  }

  getInputNode() {
    const inputBox = ReactDOM.findDOMNode(this).getElementsByTagName(
      "input"
    )[0];
    inputBox.selectionStart = inputBox.selectionEnd = -1;
    return inputBox;
  }
  onScroll = event =>{
    const { page, page_size, textValue, isLoad } = this.state;
    const cellHeight = 35;
    const scrollType = event.scrollDirection;
    const scrollTop = event.scrollTop
    const scrollHeight = page * page_size * cellHeight;
    console.log(scrollHeight - scrollTop);
    if (scrollType === "downwards" && scrollHeight - scrollTop < 1000 && isLoad===false ) {
      this.setState({
        isLoad: true
      })

    }
  };

  onChange = event => {
    const value = event.target.value;
    this.state.page = 1;
    this.setState({
      candidateRows: [
        {
          "fsMaterialId": "654326",
          "fsMaterialName": "测试SPU20191203-002黄16",
          "unit": "根",
          "goods_id": "59650",
          "extended_information": "黄16",
          "buy_price": "8.00",
          "code": "csSPU20191203-002h16",
          "last_price": 8,
          "stock_num": null,
          "freeze_num": null
        },
        {
          "fsMaterialId": "654325",
          "fsMaterialName": "测试20191203-001绿16",
          "unit": "根",
          "goods_id": "59641",
          "extended_information": "绿16",
          "buy_price": "8.00",
          "code": "cs20191203-001l16",
          "last_price": 8,
          "stock_num": null,
          "freeze_num": null
        },
        {
          "fsMaterialId": "000001",
          "fsMaterialName": "测试20191203绿16",
          "unit": "根",
          "goods_id": "59621",
          "extended_information": "绿16",
          "buy_price": "8.00",
          "code": "cs20191203l16",
          "last_price": 8,
          "stock_num": null,
          "freeze_num": null
        },
        {
          "fsMaterialId": "000001",
          "fsMaterialName": "测试SPU20191202-01金黄16",
          "unit": "根",
          "goods_id": "59613",
          "extended_information": "金黄16",
          "buy_price": "8.00",
          "code": "csSPU20191202-01jh16",
          "last_price": 8,
          "stock_num": null,
          "freeze_num": null
        },
        {
          "fsMaterialId": "000001",
          "fsMaterialName": "测试SPU20191126土黄1米",
          "unit": "根",
          "goods_id": "59572",
          "extended_information": "土黄1米",
          "buy_price": "8.00",
          "code": "csSPU20191126th1m",
          "last_price": 8,
          "stock_num": null,
          "freeze_num": null
        },
        {
          "fsMaterialId": "002902",
          "fsMaterialName": "伟星冷热水管 20*2.8 桔 4米",
          "unit": "根",
          "goods_id": "59570",
          "extended_information": "20*2.8 桔 4米",
          "buy_price": "1.00",
          "code": "wxlrsg20*2.8j4m",
          "last_price": 1,
          "stock_num": null,
          "freeze_num": null
        },
        {
          "fsMaterialId": "002901",
          "fsMaterialName": "伟星冷热水管 32*4.4 绿 4米",
          "unit": "根",
          "goods_id": "59569",
          "extended_information": "32*4.4 绿 4米",
          "buy_price": "1.00",
          "code": "wxlrsg32*4.4l4m",
          "last_price": 1,
          "stock_num": null,
          "freeze_num": null
        },
        {
          "fsMaterialId": "000200",
          "fsMaterialName": "伟星冷热水管 25*3.5 绿 4米",
          "unit": "根",
          "goods_id": "59568",
          "extended_information": "25*3.5 绿 4米",
          "buy_price": "1.00",
          "code": "wxlrsg25*3.5l4m/g",
          "last_price": 1,
          "stock_num": null,
          "freeze_num": null
        },
        {
          "fsMaterialId": "000199",
          "fsMaterialName": "伟星冷热水管 20*2.8 绿 4米",
          "unit": "根",
          "goods_id": "59567",
          "extended_information": "20*2.8 绿 4米",
          "buy_price": "1.00",
          "code": "wxlrsg20*2.8l4m",
          "last_price": 1,
          "stock_num": null,
          "freeze_num": null
        },
        {
          "fsMaterialId": "007467",
          "fsMaterialName": "飞利浦三通 20 绿 ",
          "unit": "个",
          "goods_id": "58865",
          "extended_information": "20",
          "buy_price": "1.00",
          "code": "flpst20l",
          "last_price": 1,
          "stock_num": null,
          "freeze_num": null
        }
      ],
      page: 1,
      textValue: value,
      isLoad: false
    });

  };
  onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
    this.setState(state => {
      const rows = this.state.rows.slice();
      for (let i = fromRow; i <= toRow; i++) {
        rows[i] = { ...rows[i], ...updated };
      }
      return { rows };
    });
  };
  render() {
    const RowRenderer = ({ renderBaseRow, ...props }) => {
      const color =
        props.idx === this.state.selectIndex ? "darkorange" : "blue";
      return <div style={{ color }}>{renderBaseRow(props)}</div>;
    };
    const arrowDown = 40;
    const arrowUp = 38;
    const arrowLeft = 39;
    const calcNewIndex = keyCode => {
      const oldIndex = this.state.selectIndex;
      const maxIndex = this.state.candidateRows.length - 1;
      if (typeof oldIndex === "undefined") {
        return 0;
      }
      if (typeof maxIndex === "undefined") {
        return 0;
      }

      if (keyCode === arrowDown) {
        if (oldIndex >= maxIndex) {
          return 0;
        }
        return oldIndex + 1;
      }
      if (keyCode === arrowUp) {
        if (oldIndex <= 0) {
          return maxIndex;
        }
        return oldIndex - 1;
      }
      return oldIndex;
    };
    const handleKeyDown = event => {
      const keyCode = event.keyCode;
      if (keyCode === arrowDown) {
        event.preventDefault();
        event.stopPropagation();

        const selectIndex = calcNewIndex(keyCode);
        this.setState({ selectIndex });
        return false;
      }
      if (keyCode === arrowUp) {
        event.preventDefault();
        event.stopPropagation();

        const selectIndex = calcNewIndex(keyCode);
        this.setState({ selectIndex });
        return false;
      }
      if (arrowLeft === keyCode) {
        // event.preventDefault();
      }
      return false;
    };

    const handleCellSelected = ({ rowIdx, idx }) => {
      const selectIndex = rowIdx;
      this.setState({ selectIndex },() => this.props.onCommit() )
      console.log("handleCellSe11lected", rowIdx, idx);
    }

    return (
      <div>
        <input
          onChange={this.onChange}
          defaultValue={this.props.value}
          style={{ width: "100%", height: "35px" }}
          onKeyDown={handleKeyDown}
        />
        <div
          style={{
            position: "absolute",
            width: "800px",
            left: "0px",
            zIndex: 1000,
            color: "red",
            overflow: "auto",
            overflowY: "scroll"
          }}
        >
          <ReactDataGrid
            scrollToRowIndex={this.state.selectIndex}
            rowRenderer={RowRenderer}
            onGridKeyDown={this.handleGridKeyDown}
            onCellSelected={handleCellSelected}
            columns={this.state.columnsCandidate}
            rowGetter={i => this.state.candidateRows[i]}
            rowsCount={this.state.candidateRows.length}
            onGridRowsUpdated={this.onGridRowsUpdated}
            onScroll={this.onScroll}
            enableCellAutoFocus={false}
            enableCellSelect={true}
          />
        </div>
      </div>
    );
  }
}

export default Editable
