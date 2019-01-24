import React,{Component} from 'react';
import PropTypes from 'prop-types'
import { Table,Card,Tabs, Button } from 'antd';
import TreeCheck from '@/components/TreeCheck'; // aware of the relative path
const TabPane = Tabs.TabPane;

export default class Components extends Component {
    constructor(props){
        super(props);

        this.newTabIndex = 0;
        const panes = [
            { title: 'Tab 1', content: (<div >Content of Tab Pane 1</div>), key: '1' },
            { title: 'Tab 2', content: 'Content of Tab Pane 2', key: '2' },
        ];
        const columns = [{
            title: '参数	',
            dataIndex: 'Param',
            key: 'Param',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '说明',
            dataIndex: 'explain',
            key: 'explain',
        }, {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            render: (text,record) => {
                return <a href="https://github.com/kuhami/react-ant-pro/blob/master/src/components/TreeCheck/index.js"  style={{color:'#c41d7f'}}>{text}</a>
            },
        }, {
            title: '默认值',
            key: 'Default',
            dataIndex: 'Default',
        }];
        const dataSource = [{
            key: '1',
            Param: 'spanName', //参数
            explain: 'TreeCheck 选择器头部添加span标签', //说明
            type: 'string', //类型
            Default: '-', //默认值
        }, {
            key: '2',
            Param: 'treeData',
            explain: 'treeData 为 TreeCheck的JSON格式',
            type: 'array',
            Default: '[ ]',
        }, {
            key: '3',
            Param: 'isShowSearch',
            explain: '是否显示搜索框',
            type: 'bool',
            Default: 'false',
        }, {
            key: '4',
            Param: 'placeholder',
            explain: '搜索框的placeholder值',
            type: 'string',
            Default: 'Search...',
        }, {
            key: '5',
            Param: 'getAllNodes',
            explain: '是否选取所有节点，true：选取所有的节点，false：只选子节点',
            type: 'bool',
            Default: 'false',
        }, {
            key: '6',
            Param: 'divWidth',
            explain: 'TreeCheck 选择器的宽度',
            type: 'string',
            Default: '300px',
        },{
            key: '7',
            Param: 'divHeight', //参数
            explain: 'TreeCheck 选择器的高度', //说明
            type: 'string', //类型
            Default: '50px', //默认值
        }, {
            key: '8',
            Param: 'selectTop',
            explain: '下拉选框的距离button的高度',
            type: 'string',
            Default: '36px',
        }, {
            key: '9',
            Param: 'maxHeight',
            explain: '下拉选框的最大高度',
            type: 'string',
            Default: '400px',
        }, {
            key: '10',
            Param: 'checkedKeys',
            explain: '下拉选框默认选种的节点',
            type: 'array',
            Default: '[ ]',
        }, {
            key: '11',
            Param: 'LabelAndValue',
            explain: 'treeData中需要label和value两个值，若没有label和value，则该属性可以转化',
            type: 'array',
            Default: '["label","value"]',
        }, {
            key: '12',
            Param: 'onCheckedKeyChange',
            explain: 'TreeCheck 被选中节点时的回调',
            type: 'function(checkedArrs)',
            Default: '-',
        }, {
            key: '13',
            Param: 'dropdownMatchSelectWidth',
            explain: '下拉菜单和选择器同宽',
            type: 'bool',
            Default: 'false',
        }, {
            key: '14',
            Param: 'multiple',
            explain: '下拉选框是否多选',
            type: 'bool',
            Default: 'true',
        }];

        this.state = {
            activeKey: panes[0].key,
            panes,
            dataSource,
            columns
        };
    }
    componentDidMount() {

    }

    onChange = (activeKey) => {
        this.setState({ activeKey });
    }

    onEdit = (targetKey, action) => {
        console.log(this,targetKey, action,this[action](targetKey));
        this[action](targetKey);
    }

    add = () => {
        const panes = this.state.panes;
        const treeData = [{
            label: '全部',
            value: 'all',
            children:[{
                label: '0-0',
                value: '00',
                children: [{
                    label: '0-0-0',
                    value: '000',
                    children: [
                        { label: '0-0-0-0-0-0-0-0-0-0-0', value: '0000' },
                        { label: '0-0-0-1', value: '0001' },
                        { label: '0-0-0-2', value: '0002' },
                    ],
                }, {
                    label: '0-0-1',
                    value: '001',
                    children: [
                        { label: '0-0-1-0', value: '0010' },
                        { label: '0-0-1-1', value: '0011' },
                        { label: '0-0-1-2', value: '0012' },
                    ],
                }, {
                    label: '0-0-2',
                    value: '002',
                }],
            }, {
                label: '0-1',
                value: '01',
                children: [
                    { label: '0-1-0-0', value: '0100' },
                    { label: '0-1-0-1', value: '0101' },
                    { label: '0-1-0-2', value: '0102' },
                ],
            }, {
                label: '0-2',
                value: '02',
            }]
        }];
        console.log(this.newTabIndex);
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: 'New Tab ' + this.newTabIndex , content: (<Card title="多选SelectTree"  bordered={false}>
            <TreeCheck
                treeData={treeData}
                isShowSearch={true}
                spanName={'多选Select：'}
                getAllNodes={true}
                //LabelAndValue={['title','key']}
                //checkedKeys={['00','01']}
                multiple={true}
                onCheckedKeyChange={(checkedArrs) => this.onCheckedKeyChange(checkedArrs)}/>
            <h3>API</h3>
            <p>TreeCheck 为多选SelectTree，本组件为适应特殊场景而封装。</p>
            <Table columns={this.state.columns} dataSource={this.state.dataSource} pagination={false} />
        </Card>), key: activeKey });
        this.setState({ panes, activeKey });
    }

    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    }



    onCheckedKeyChange = (checkedArrs)=>{
        console.log(checkedArrs);
    }

    render() {

        const treeDatas = [{
            title: '0-0',
            key: '0-0',
            children: [{
                title: '0-0-0',
                key: '0-0-0',
                children: [
                    { title: '0-0-0-0', key: '0-0-0-0' },
                    { title: '0-0-0-1', key: '0-0-0-1' },
                    { title: '0-0-0-2', key: '0-0-0-2' },
                ],
            }, {
                title: '0-0-1',
                key: '0-0-1',
                children: [
                    { title: '0-0-1-0', key: '0-0-1-0' },
                    { title: '0-0-1-1', key: '0-0-1-1' },
                    { title: '0-0-1-2', key: '0-0-1-2' },
                ],
            }, {
                title: '0-0-2',
                key: '0-0-2',
            }],
        }, {
            title: '0-1',
            key: '0-1',
            children: [
                { title: '0-1-0-0', key: '0-1-0-0' },
                { title: '0-1-0-1', key: '0-1-0-1' },
                { title: '0-1-0-2', key: '0-1-0-2' },
            ],
        }, {
            title: '0-2',
            key: '0-2',
        }];
        const treeData = [{
            label: '全部',
            value: 'all',
            children:[{
                label: '0-0',
                value: '00',
                children: [{
                    label: '0-0-0',
                    value: '000',
                    children: [
                        { label: '0-0-0-0-0-0-0-0-0-0-0', value: '0000' },
                        { label: '0-0-0-1', value: '0001' },
                        { label: '0-0-0-2', value: '0002' },
                    ],
                }, {
                    label: '0-0-1',
                    value: '001',
                    children: [
                        { label: '0-0-1-0', value: '0010' },
                        { label: '0-0-1-1', value: '0011' },
                        { label: '0-0-1-2', value: '0012' },
                    ],
                }, {
                    label: '0-0-2',
                    value: '002',
                }],
            }, {
                label: '0-1',
                value: '01',
                children: [
                    { label: '0-1-0-0', value: '0100' },
                    { label: '0-1-0-1', value: '0101' },
                    { label: '0-1-0-2', value: '0102' },
                ],
            }, {
                label: '0-2',
                value: '02',
            }]
        }];

        return (
            <div>
                <div style={{ marginBottom: 16 }}>
                    <Button onClick={this.add}>ADD</Button>
                </div>
                <Tabs
                    hideAdd
                    onChange={this.onChange}
                    activeKey={this.state.activeKey}
                    type="editable-card"
                    onEdit={this.onEdit}
                    tabBarGutter={-2}
                >
                    {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>)}
                </Tabs>

                <Card title="多选SelectTree"  bordered={false}>
                    <TreeCheck
                        treeData={treeData}
                        isShowSearch={true}
                        spanName={'多选Select：'}
                        getAllNodes={true}
                        //LabelAndValue={['title','key']}
                        //checkedKeys={['00','01']}
                        multiple={true}
                        onCheckedKeyChange={(checkedArrs) => this.onCheckedKeyChange(checkedArrs)}/>

                    <h3>API</h3>
                    <p>TreeCheck 为多选SelectTree，本组件为适应特殊场景而封装。</p>
                    <Table columns={this.state.columns} dataSource={this.state.dataSource} pagination={false} />
                </Card>
            </div>
        );
    }
}

// 组件必须传递参数
Components.propTypes = {
    bordered:PropTypes.bool,
};

// 设置默认属性
Components.defaultProps = {
    bordered:true,//是否展示外边框和列边框
};
