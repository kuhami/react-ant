import React,{Component} from 'react';
import {render} from 'react-dom';
import { Row,Card,Col } from 'antd';
import Basic from './Basic.js'//DragHandle.js
import Collections from './Collections.js'
import DragHandle from './DragHandle.js'

export default class Drag extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
    }
  }
  componentDidMount() {

  }

  render() {

    return (<Row gutter={24}>
      <Col xl={6} lg={24} sm={24} xs={24}>
        <Basic/>
      </Col>
      <Col xl={12} lg={12} sm={24} xs={24}>
        <Collections/>
      </Col>
      <Col xl={6} lg={12} sm={24} xs={24}>
        <DragHandle/>
      </Col>
    </Row>);
  }
}

