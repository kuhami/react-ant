import React,{Component} from 'react';
import { Card,Button,Modal, Icon,Popover } from 'antd';
import AntTableFinder from '@/components/AntTableFinder/AntTableFinder';
const TableData = require('./TableData.json')
import styles from './Table.less';
export default class Tables extends Component {
    constructor(props){
        super(props);
        console.log(TableData);
        let {colTitle,colContent,page_info} = TableData.data;
        this.state={
            finder:{
                colTitle,
                colContent,
            },
            page:{
                current: 1,
                pageSize: 10,
                total: 373,
            },
        }
    }
    componentDidMount() {

    }
    getPopover = (component) => {
        const content = (
          <div style={{ padding: '8px 0' }}>
              <p>友情提示。</p>
          </div>
        )
        const props = {
            title: '友情提示',
            content,
            // placement: 'topLeft',
        }
        return <Popover {...props}>{component}</Popover>

    }

    finderExtColumn = ()=>{

        return [
            {
                name: "_EDIT_",
                title: "操作",
                place: "center",
                width: 100,
                fixed: 'right',
                render:(text,record)=>{

                    return <Button size={'small'} onClick={()=>this.handleClick(record)}>详情</Button>
                }
            }
        ]
    }
    handleClick = (record)=>{
        console.log(record);
        this.setState({
            visible: true,
            titleKey:record.name
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    onChangePagination=(pageNumber,pageSize)=>{
        this.setState({
            page:{
                current: pageNumber,
                pageSize: pageSize,
                total: 373,
            }
        })
    }
    onShowSizeChange=(current, pageSize)=>{
        this.setState({
            page:{
                current: current,
                pageSize: pageSize,
                total: 373,
            }
        })
    }
    render() {
        const {finder,page} = this.state
        const redTitle = { color: 'red' }
        let dataFinder = {
            finder,
            pagination:{
                total:page.total, //总条数
                current:page.current, //当前页数
                pageSize:page.pageSize, //每页显示条目
                showSizeChanger:true, //是否显示 showTotal
                showTotal:(total, range)=> {
                    return `显示第 ${range[0]} 至 ${range[1]} 项结果，共 ${total} 项`
                },
                // pageSizeOptions:['5','10','20','30','40','50'],
                onChange:this.onChangePagination,
                onShowSizeChange:this.onShowSizeChange,
                pageSizeOptions:['10','20','30','40'], //显示选择条数 默认['10','20','30','40']
            },
            columns: this.finderExtColumn(),
            extColumnAttr: {
                "fsBillTime": {
                    width:190,
                    title: (this.getPopover(<span>重新render的title  <Icon style={redTitle} type='question-circle-o' /></span>)),
                    // fixed: 'left',
                    align:'center', //设置列内容的对齐方式
                    render:text => <a href="javascript:;">{text}</a>,
                },
                "fsMaterialId":{
                    width:'100px',
                    className:styles.aa,
                },
                "fsMaterialName":{
                    width:'150px',
                    filters: [{
                        text: '番茄',
                        value: '番茄',
                    }, {
                        text: '鸡肉',
                        value: '鸡肉',
                    }, {
                        text: '二级物料',
                        value: '二级物料',
                        children: [{
                            text: '牛肉',
                            value: '牛肉',
                        }, {
                            text: '牛肉干',
                            value: '牛肉干',
                        }],
                    }],
                    onFilter: (value, record) => {
                        return record.fsMaterialName.indexOf(value) === 0
                    },
                    // sorter: (a, b) => a.fsMaterialName - b.fsMaterialName,
                    // sortDirections: ['descend'],
                },
                "fsModelno":{
                    width:'200px',
                    align:'center',
                    children: [{
                        title: 'Door No.',
                        dataIndex: 'number',
                        align:'center',
                        key: 'number',
                        width: 100,
                        render:()=>{
                            return 'Door No.'
                        }
                    },
                        {
                            title: 'Door No1.',
                            dataIndex: 'number1',
                            align:'center',
                            key: 'number1',
                            width: 100,
                            render:()=>{
                                return 'Door No1.'
                            }
                        }]
                },
                "fsOrderUnit":{width:'100px'},
                "fsSupplierName":{width:'150px'},
                "fsPurchaseOrderId":{width:'150px'},
                "fdNumber":{
                    width:'150px',
                    defaultSortOrder: 'false',
                    sorter: (a, b) => {
                        return a.fdNumber - b.fdNumber
                    },
                },
                "fdTotalTax":{width:'100px'},
                "fdTax":{width:'100px'},
                // "_EDIT_":{width:'100px',fixed: 'right'}
            },
            rowSelection:{
                // columnWidth:100, //默认 60：number，
                fixed:true,
                type:'checkbox', //checkbox or radio 默认 checkbox
                onChange:(selectedRowKeys, selectedRows)=>{
                    console.log(selectedRowKeys, selectedRows)
                }
            }
        }
        return (
          <Card title="多功能Table-AntTableFinder"  bordered={false}>
              <AntTableFinder
                {...dataFinder}
              />

              <Modal
                title={'Title Modal'}
                width={'1000px'}
                bodyStyle={{minHeight:'500px'}}
                centered = {false}
                closable = {false}
                zIndex={'1055'}
                cancelText={'取消'}
                okText = {'确定'}
                destroyOnClose = {true} // 关闭时销毁Modal
                maskClosable={false}
                visible={this.state.visible}
                onOk={this.handleOk}
                // onCancel={this.handleCancel}
                footer={[
                    <div key="back" style={{textAlign:'center'}}><Button onClick={this.handleCancel}>返回</Button></div>,
                ]}
              >
                  1
              </Modal>
          </Card>
        );
    }
}
