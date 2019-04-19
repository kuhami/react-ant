import React,{Component} from 'react';
import PropTypes from 'prop-types'
import { Table,Tooltip,Button,Input,Skeleton,Form, Row, Col, Icon,Select,InputNumber,DatePicker,message } from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
import styles from './AntTableFinder.less';
@Form.create()
export default class AntTableFinder extends Component {
    constructor(props){
      super(props);
      console.log(props)
        const {tableHeight} = this.props;
        this.state={
            count: 3,
            visible:false, //Modal 默认false
            expandForm:false,
            pageSize:10,
            tableHeight
        }
    }
    componentDidMount() {
        let self = this;
        self.initAll();
    }

    componentDidUpdate(prevProps, prevState){

    }

    componentWillReceiveProps(nextProps){
        let self = this;
        if(nextProps.pagination){
            self.setState({
                pagination:nextProps.pagination
            })
        }
    }

    /**
     * AntTableFinder初始化
     */
    initAll=()=>{
        console.log(this);
        let {bordered,finder,extColumnAttr,pagination,columns,rowSelection} = this.props
        let   {colTitle, colContent} = finder,totalWidth=0;
          colTitle = [...colTitle,...columns];
        columns= colTitle.map((v)=>{
            let {name,title,width,place,fixed,render} = v;

            width = Number(Object.prototype.toString.call(width) === "[object String]" ? (width).replace('px','') - 0 : width)

            if(extColumnAttr && extColumnAttr[v.name]){
                width = Object.prototype.toString.call(extColumnAttr[v.name].width) === "[object String]" ? (extColumnAttr[v.name].width).replace('px','') - 0 : extColumnAttr[v.name].width
            }

            return {
                title:title,
                width:width + "px",
                dataIndex:name,
                key: name,
                align:place,//设置列内容的对齐方式
                fixed,
                render:!render ? (text,record) => {
                    return <div style={{width:width-11 +'px'}}>
                        <Tooltip title={record[name]}>
                            <div className={styles.td_ellipsis}>
                                {record[name]}
                            </div>
                        </Tooltip>
                    </div>
                }:render,
                ...extColumnAttr[v.name],
            }
        });

        totalWidth = rowSelection ? (rowSelection.columnWidth ? totalWidth + rowSelection.columnWidth:totalWidth+60) : totalWidth; // 计算 多选框的宽度
        columns.map((v)=>{
            totalWidth = Object.prototype.toString.call(v.width) === "[object String]" ? (v.width).replace('px','') - 0 + totalWidth : v.width + totalWidth
        }) // 计算table总宽度
        let dataSource = colContent.map((v,index)=>{return {key:index,...v}})
        pagination = pagination ? {
            ...pagination,
            className:'defaultSmall',
            size:'small',
        }:false ;

        rowSelection = rowSelection ? {
            ...rowSelection
          }:null;
        this.setState({
            columns,
            dataSource,
            bordered,
            pagination,//false 不显示 分页
            rowSelection,
            totalWidth
        })
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
    // 查询
    handleSearch =(e)=>{
        e.preventDefault();
        const { dispatch, form } = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            console.log(err, fieldsValue);

            let {date,rangeDate,ruleName} = fieldsValue;
            if (!ruleName){
                message.error('请填写规则名称。');return false;
            }

            const values = {
                ...fieldsValue,
                update: date ? moment(date).format('YYYY-MM-DD').valueOf():undefined,
                startRangeDate:rangeDate ? moment(rangeDate[0]).format('YYYY-MM-DD').valueOf():undefined,
                endRangeDate:rangeDate ? moment(rangeDate[1]).format('YYYY-MM-DD').valueOf():undefined,
            };
            console.log(values);
            // this.setState({
            //     formValues: values,
            // });

            // dispatch({
            //     type: 'rule/fetch',
            //     payload: values,
            // });
        });
    }
    toggleForm = () => {
        const { expandForm } = this.state;
        this.setState({
            expandForm: !expandForm,
        });
    };
    renderSimpleForm =()=>{
        const { getFieldDecorator } = this.props.form;
        return <Form onSubmit={this.handleSearch} layout="inline">
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={6} sm={24}>
                    <FormItem label={<span><b style={{color:'red'}}>*</b>规则名称</span>}>
                        {getFieldDecorator('ruleName')(<Input placeholder="请输入" />)}
                    </FormItem>
                </Col>
                <Col md={6} sm={24}>
                    <FormItem label="使用状态">
                        {getFieldDecorator('status')(
                            <Select placeholder="请选择" >
                                <Option value="0">关闭</Option>
                                <Option value="1">运行中</Option>
                            </Select>
                        )}
                    </FormItem>
                </Col>
                <Col md={6} sm={24}>
                    <FormItem label="使用状态">
                        {getFieldDecorator('status')(
                            <Select placeholder="请选择" >
                                <Option value="0">关闭</Option>
                                <Option value="1">运行中</Option>
                            </Select>
                        )}
                    </FormItem>
                </Col>
                <Col md={6} sm={24}>
                    <span className={styles.submitButtons}>
                        <Button type="primary" htmlType="submit">
                            查询
                        </Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                            重置
                        </Button>
                        <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                            展开 <Icon type="down" />
                        </a>
                    </span>
                </Col>
            </Row>
        </Form>
    }
    renderAdvancedForm =()=>{
        const { getFieldDecorator } = this.props.form;
        return <Form onSubmit={this.handleSearch} layout="inline">
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={6} sm={24}>
                    <FormItem label={<span><b style={{color:'red'}}>*</b>规则名称</span>}>
                        {getFieldDecorator('ruleName')(<Input placeholder="请输入" />)}
                    </FormItem>
                </Col>
                <Col md={6} sm={24}>
                    <FormItem label="使用状态">
                        {getFieldDecorator('status')(
                            <Select placeholder="请选择" >
                                <Option value="0">关闭</Option>
                                <Option value="1">运行中</Option>
                            </Select>
                        )}
                    </FormItem>
                </Col>
                <Col md={6} sm={24}>
                    <FormItem label="使用状态">
                        {getFieldDecorator('status')(
                            <Select placeholder="请选择" >
                                <Option value="0">关闭</Option>
                                <Option value="1">运行中</Option>
                            </Select>
                        )}
                    </FormItem>
                </Col>
                <Col md={6} sm={24}>
                    <FormItem label="调用次数">
                        {getFieldDecorator('number')(<InputNumber style={{ width: '100%' }} />)}
                    </FormItem>
                </Col>
            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col md={8} sm={24}>
                    <FormItem label="日期">
                        {getFieldDecorator('date')(
                            <DatePicker style={{ width: '100%' }} placeholder="请输入日期" />
                        )}
                    </FormItem>
                </Col>
                <Col md={8} sm={24}>
                    <FormItem label="日期范围">
                        {getFieldDecorator('rangeDate')(
                            <RangePicker style={{ width: '100%' }}/>
                        )}
                    </FormItem>
                </Col>
                <Col md={8} sm={24}>
                    <span className={styles.submitButtons}>
                        <Button type="primary" htmlType="submit">
                            查询
                        </Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                            重置
                        </Button>
                        <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                            收起 <Icon type="up" />
                        </a>
                    </span>
                </Col>
            </Row>
        </Form>
    }

    renderForm() {
        return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
    }
    render() {
        const {columns,dataSource,pagination,totalWidth,rowSelection,tableHeight} = this.state;
        let len = (dataSource&&pagination) && ((dataSource.length - 1)/(pagination.pageSize) > 1 ? (pagination.pageSize)-1 : dataSource.length - 1)
        return (
            <div>
                <Skeleton loading={false} title = {'我是title'} active={true} avatar={false} paragraph={{ rows: 4 }}>
                        <div className={styles.tableListForm}>
                            {this.renderForm()}
                        </div>
                            <Table
                                   style={{maxWidth:totalWidth + 18 + 'px'}}
                                   rowClassName={(record, index,indent) => index === len ? styles.rowBackground : '' }
                                   size="small"
                                   columns={columns}
                                   dataSource={dataSource}
                                   rowSelection={rowSelection}
                                   loading={false}
                                   pagination={pagination}
                                   bordered={this.state.bordered}
                                   scroll={{ x: totalWidth,y:'calc(100vh - '+tableHeight+'px)' }}

                                   // onHeaderRow={(column) => {
                                   //     return {
                                   //         onClick: () => {
                                   //             console.log(event)
                                   //         },        // 点击表头行
                                   //     };
                                   // }}
                            />
                    </Skeleton>
            </div>
        );
    }
}

// 组件必须传递参数
AntTableFinder.propTypes = {
    bordered:PropTypes.bool,
    extColumnAttr:PropTypes.object,
    pagination:PropTypes.object,
    rowSelection:PropTypes.object,
    columns:PropTypes.array,
    onChangePagination:PropTypes.func,
    onShowSizeChange:PropTypes.func,
    tableHeight:PropTypes.number
};

// 设置默认属性
AntTableFinder.defaultProps = {
    bordered:true,//是否展示外边框和列边框
    extColumnAttr:{}, //扩展可重新渲染title
    pagination:{},// false 不显示分页 true or 不设置 前端分页 ; {}
    rowSelection:null,
    columns:[], //扩展finder 列
    onChangePagination:function() {
        //点击页数回调
    },
    onShowSizeChange:function() {
        //改变每页显示条目数回调
    },
    tableHeight:340, //table 的高度
};
