import React, { Component } from 'react';
import { Card, Divider } from 'antd';
import DescriptionList from '@/components/DescriptionList';

const { Description } = DescriptionList;

class Edit extends Component {
  constructor(props){
    super(props)

  }
  componentDidMount() {
    console.log(this.props.location)
  }

  render() {

    return (
        <Card bordered={false} title="基础详情页">
          <DescriptionList size="large" title="退款申请" style={{ marginBottom: 32 }}>
            <Description term="取货单号">1000000000</Description>
            <Description term="状态">已取货</Description>
            <Description term="销售单号">1234123421</Description>
            <Description term="子订单">3214321432</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <DescriptionList size="large" title="用户信息" style={{ marginBottom: 32 }}>
            <Description term="用户姓名">付小小</Description>
            <Description term="联系电话">18100000000</Description>
            <Description term="常用快递">菜鸟仓储</Description>
            <Description term="取货地址">浙江省杭州市西湖区万塘路18号</Description>
            <Description term="备注">无</Description>
          </DescriptionList>
        </Card>
    );
  }
}

export default Edit;
