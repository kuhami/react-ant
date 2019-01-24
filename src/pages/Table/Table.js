import React,{Component} from 'react';
import PropTypes from 'prop-types'
import { Table, Tag,Card,Button,Popconfirm,Input,Skeleton } from 'antd';

export default class Tables extends Component {
    constructor(props){
      super(props);
      console.log(props)
        const {bordered} = props
        const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align:'center',//设置列内容的对齐方式
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            align:'center',
        }, {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            align:'center',
            render: (input, record) =>{
                return(
                    <Input value={input} onChange={(e)=>this.changeInput(e,record)}/>
                )
            }
        }, {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            align:'center',
            render: tags => (<span>{tags.map(tag => <Tag color="blue" key={tag}>{tag}</Tag>)}</span>),
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) =>{
                return(
                    this.state.dataSource.length > 1
                        ? (
                        <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(record.key)}>
                            <a href="javascript:;">删除</a>
                        </Popconfirm>
                    ) : null
                )
            },
        }];

        const data = [{
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        }, {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        }, {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        }];

        this.state={
            columns,
            dataSource:data,
            count: 3,
            bordered,
        }
    }
    componentDidMount() {

    }
    //增加行
    handleAdd =()=>{
        const { count, dataSource } = this.state;
        console.log(dataSource);
        const newData = {
            key: count +1,
            name: 'John Brown',
            age: Math.floor(Math.random() * 50),
            address:'张江高科',
            tags: ['nice', 'developer'],
        };
        console.log(newData);
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    }

    //删除行
    handleDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    }
    //修改input
    changeInput = (e,record)=>{
        let {value} = e.target,{key} = record,dataSource = [...this.state.dataSource];
        dataSource = dataSource.map((v)=>{
            if(v.key == key ) v.address = value
            return v
        })
        this.setState({ dataSource: dataSource });
    }
    render() {
        // const [count, setCount] = useState(0)
        // console.log(count);
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            },
            getCheckboxProps: record => ({
                disabled: record.name === 'Joe Black', // Column configuration not to be checked
                name: record.name,
            }),
        };
        const {columns,dataSource} = this.state;
        return (
            <div>
                <Card title="多功能Table"  bordered={false}>
                    <Skeleton loading={false} title = {'我是title'} active={true} avatar={true} paragraph={{ rows: 4 }}>
                            <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                                增加
                            </Button>
                            <Table rowSelection={rowSelection}
                                   size="small"
                                   columns={columns}
                                   dataSource={dataSource}
                                   loading={false}
                                   bordered={this.state.bordered}
                            />
                    </Skeleton>
                </Card>
            </div>
        );
    }
}

// 组件必须传递参数
Tables.propTypes = {
    bordered:PropTypes.bool,
    // isShowSearch: PropTypes.bool,
    // spanName: PropTypes.string,
    // getAllNodes: PropTypes.bool,
    // divWidth: PropTypes.string,
    // divHeight: PropTypes.string,
    // selectTop: PropTypes.string,
    // checkedKeys: PropTypes.array, // 树默认选中的值
    // async: PropTypes.bool
};

// 设置默认属性
Tables.defaultProps = {
    bordered:true,//是否展示外边框和列边框
};
