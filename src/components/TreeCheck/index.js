/**
 * Created by lyl on 2019/1/3.
 * email: 776248185@qq.com
 */
/**
 * 多选树
 * 例：treeData = [{
            label: '全部',
            value: '全部',
            children: [
                {label: "秦小厨", value: "秦小厨", children: [{label: "预入库单测试", value: "2017110602"}]}
                {label: "秦小厨集团", value: "秦小厨集团",…}
            ],
        }];
 *
 */
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Icon, Tree, Input } from 'antd';
import $ from 'jquery';
const TreeNode = Tree.TreeNode;
const Search = Input.Search;

export default class TreeCheck extends Component {
  constructor(props) {
    super(props);
    let { spanName, treeData, isShowSearch,maxHeight } = props;
    const expandedKeys = treeData[0].children.map(n => n.value);

    treeData = this.changeTreeList(treeData, props.LabelAndValue);
    let treeList = this.updateTreeList(treeData);

    this.state = {
      treeData,
      expandedKeys, //默认展开第一级
      autoExpandParent: true,
      checkedKeys: this.props.checkedKeys,
      selectedKeys: this.props.selectedKeys,
      SelectKey: (this.props.checkedKeys.length > 0 && '选中了' + this.props.checkedKeys.length + '项') || '全部',
      searchValue: '',
      isIcon: false,
      spanName,
      isShowSearch,
      treeList,
      maxHeight
    };
  }

  // componentDidMount() {
  //     this.selectTop
  // }

  // componentWillReceiveProps (nextProps) {
  //
  //     // 根据 treeData 判断是否重新渲染结点
  //     if (!ImmutableCompare(Immutable.fromJS(this.props.treeData), Immutable.fromJS(nextProps.treeData))) {
  //
  //         const nextTreeData = nextProps.treeData
  //         const treeList = this.updateTreeList(nextTreeData)
  //         const expandedKeys =  nextTreeData[0].children.map((n)=>n.value)
  //         this.setState({
  //             expandedKeys,
  //             treeData: nextTreeData,
  //             treeList,
  //         })
  //     }
  // }

  handButton = e => {
    e.stopPropagation();
    e.preventDefault();
    let dom = ReactDOM.findDOMNode(this);
      let document = ReactDOM.findDOMNode(this).ownerDocument;
    let isHide = $(dom)
      .find('div.ant-dropdown')
      .hasClass('hide');
    let isScroll = $(document).find('div.frame-head-wrapper-scroll').length;

    let len = $(document).find('div.ant-dropdown').length;
      console.log($(document));
      for (let i = 0; i < len; i++) {
      $(document)
        .find('div.ant-dropdown')
        .eq(i)
        .addClass('hide');
    }

    if (isHide) {
      $(dom)
        .find('div.ant-dropdown')
        .removeClass('hide');
      this.setState({
        isIcon: true,
      });
    } else {
      $(dom)
        .find('div.ant-dropdown')
        .addClass('hide');
      this.setState({
        isIcon: false,
      });
    }

    //解决 下框被覆盖问题
    if (isScroll) {
      if (isHide) {
        $(document)
          .find('div.frame-head-wrapper-scroll')
          .css({
            overflow: 'visible',
          });
      } else {
        $(document)
          .find('div.frame-head-wrapper-scroll')
          .css({
            overflowX: 'auto',
            overflowY: 'hidden',
          });
      }
    }

    $(document)
      .unbind('click')
      .bind('click', e => {
        e.stopPropagation();
        e.preventDefault();
        $(dom)
          .find('div.ant-dropdown')
          .addClass('hide');
        this.setState({
          isIcon: false,
        });
        //解决 下框被覆盖问题
        if (isScroll) {
          $(document)
            .find('div.frame-head-wrapper-scroll')
            .css({
              overflowX: 'auto',
              overflowY: 'hidden',
            });
        }
      });
  };

  handeDown = e => {
    e.stopPropagation();
    e.preventDefault();
    let dom = ReactDOM.findDOMNode(this);
    let {multiple} = this.props
      if(multiple){
          $(dom)
              .find('div.ant-dropdown')
              .removeClass('hide');
      }

    let document = ReactDOM.findDOMNode(this).ownerDocument;
    let isScroll = $(document).find('div.frame-head-wrapper-scroll').length;

    $(document)
      .unbind('click')
      .bind('click', e => {
        e.stopPropagation();
        e.preventDefault();
        $(dom)
          .find('div.ant-dropdown')
          .addClass('hide');
        this.setState({
          isIcon: false,
        });

        //解决 下框被覆盖问题
        if (isScroll) {
          $(document)
            .find('div.frame-head-wrapper-scroll')
            .css({
              overflowX: 'auto',
              overflowY: 'hidden',
            });
        }
      });
  };

    /**
     * 递归更新树列表
     */
    changeTreeList = (treeData,LabelAndValue) =>{
        let getTreeList = (treeData) => {
            return treeData.map((node) => {
                node = Object.assign(node,{'label':node[LabelAndValue[0]]},{'value':node[LabelAndValue[1]]})
                if(node.children && node.children.length > 0) {
                    node = Object.assign(node,{'children':getTreeList(node.children)})
                }
                return node
            })
        }
        //getTreeList(treeData);
        return getTreeList(treeData);
    }

  /**
   * 将树转换成一维数组
   */
  updateTreeList = data => {
    let treeData = data;
    let treeList = [];
    // 递归获取树列表
    const getTreeList = data => {
      data.forEach(node => {
        treeList.push({ value: node.value, label: node.label });
        if (node.children && node.children.length > 0) {
          getTreeList(node.children);
        }
      });
    };
    getTreeList(treeData);
    return treeList;
  };

  onExpand = expandedKeys => {
    //console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onCheckedKeyChange = checkedKeys => {
    this.props.onCheckedKeyChange(checkedKeys);
  };

  onCheck = (checkedKeys, e) => {
      let len = 0,
      lenValue,
      checkedArrs = [];
    this.setState({ checkedKeys });
    if (this.props.getAllNodes) {
      this.onCheckedKeyChange(checkedKeys);
      len = checkedKeys.length;
    } else {
      e.checkedNodes.map(v => {
        if (!v.props.children) {
          len++;
          if (len == '1') {
            lenValue = v.props.title.props.children[2];
          }
          checkedArrs.push(v.key);
        }
      });
      this.onCheckedKeyChange(checkedArrs);
    }

    this.setState({
      SelectKey:
        len == '0'
          ? '全部'
          : len == '1' && !this.props.getAllNodes ? lenValue : '选中' + len + '项',
    });
  };

  onSelect = (selectedKeys,e) => {
    const {multiple} = this.props;

    if(!multiple){
        let dom = ReactDOM.findDOMNode(this);
        $(dom)
            .find('div.ant-dropdown')
            .addClass('hide');

        this.onCheckedKeyChange(selectedKeys);
        this.setState({
            selectedKeys,
            SelectKey:e.selectedNodes[0] ? e.selectedNodes[0].props.title.props.children[2]:'全部'
        });
    }

  }

  onChange = e => {
    const value = e.target.value;
    const { treeList } = this.state;
    let uniqueExpandedKeys = [];

    if (value) {
      // 遍历树列表获取被搜索匹配到的树父id
      treeList.map(item => {
        if (item.label && item.label.indexOf(value) > -1) {
          uniqueExpandedKeys.push(item.value);
        }
      });
    } else {
      treeList.map(item => {
        uniqueExpandedKeys.push(item.value);
      });
    }
      this.setState({
      expandedKeys: uniqueExpandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  };

  renderTreeNodes = data => {
    const { searchValue } = this.state;
    return data.map(item => {
      const index = item.label && item.label.indexOf(searchValue);
      const beforeStr = item.label && item.label.substr(0, index);
      const afterStr = item.label && item.label.substr(index + searchValue.length);
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span style={{ color: '#f50' }}>{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{item.label}</span>
        );
      if (item.children) {
        return (
          <TreeNode title={title} key={item.value}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
        return <TreeNode {...{ title: title, key: item.value }} />;
    });
  };

  render() {
    const linkStyle = {
      width: this.props.divWidth,
      height: this.props.divHeight,
      display: 'inline-block',
    };
    const buttonStyle = {
      display: 'inline-block',
      width: 200,
      minHeight: 32,
      paddingRight: 12,
      verticalAlign: 'middle',
      textAlign: 'left',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    };
    const spanStyle = {
      display: 'inline-block',
      minWidth: 0,
      textAlign: 'right',
    };
    const { treeData } = this.state;
    const { dropdownMatchSelectWidth,multiple } = this.props;
    const minWidth = dropdownMatchSelectWidth ? {width: 200}:{minWidth:200};

    const treeProps = {
      checkable: multiple,
      onExpand: this.onExpand,
      expandedKeys: this.state.expandedKeys,
      autoExpandParent: this.state.autoExpandParent,
      onCheck: this.onCheck,
      checkedKeys: this.state.checkedKeys,
      selectedKeys: this.state.selectedKeys,
      onSelect:this.onSelect
    };

    // const onSelect ={
    //     onSelect:this.onSelect()
    // }


      return (
      <div style={linkStyle}>
        <span style={spanStyle}>{this.state.spanName}</span>
        <span style={{ position: 'relative', display: 'inline-block' }}>
          <Button title={this.state.SelectKey} style={buttonStyle} onClick={this.handButton}>
            {this.state.SelectKey}
            <Icon
              style={{ position: 'absolute', right: 8, top: 10 }}
              type={this.state.isIcon ? 'up' : 'down'}
            />
          </Button>
          <div
            className="ant-dropdown hide"
            onClick={this.handeDown}
            style={{ ...minWidth,top: this.props.selectTop, left: 0 }}
          >
            <div className="ant-dropdown-menu">
              {this.state.isShowSearch && (
                <Search
                  style={{ width: '94%', margin: '2% 3% 0 3%' }}
                  placeholder={this.props.placeholder}
                  onChange={this.onChange}
                />
              )}
              <div style={{ maxHeight: this.state.maxHeight, overflow: 'auto', minHeight: 0 }}>
                <Tree {...treeProps}>{this.renderTreeNodes(treeData)}</Tree>
              </div>
            </div>
          </div>
        </span>
      </div>
    );
  }
}

// 组件必须传递参数
TreeCheck.propTypes = {
  treeData: PropTypes.array,
  isShowSearch: PropTypes.bool,
  placeholder: PropTypes.string,
  spanName: PropTypes.string,
  getAllNodes: PropTypes.bool,
  divWidth: PropTypes.string,
  dropdownMatchSelectWidth:PropTypes.bool,
  divHeight: PropTypes.string,
  selectTop: PropTypes.string,
  maxHeight: PropTypes.string,
  checkedKeys: PropTypes.array, // 多选树默认选中的值
  selectedKeys: PropTypes.array, // 单选树默认选中的值
  LabelAndValue: PropTypes.array, //treeData数据中不是label和value的要转化
  multiple:PropTypes.bool,
};

// 设置默认属性
TreeCheck.defaultProps = {
  treeData: [],
  isShowSearch: false, //默认不显示搜索框
  placeholder: 'Search...',
  spanName: '',
  onCheckedKeyChange: function() {
    //选中节点输出
  },
  getAllNodes: false, //是否选取所有节点 false：只选子节点
  divWidth: '300px',
  dropdownMatchSelectWidth:false,
  divHeight: '50px',
  selectTop: '36px',
  maxHeight: '400px',
  checkedKeys: [],
  selectedKeys:[],
  LabelAndValue:['label','value'],
  multiple:true
};
