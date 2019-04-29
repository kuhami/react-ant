import React,{Component} from 'react'
import { SketchPicker } from 'react-color';
import { Card } from 'antd';

export default class BasicDemo extends Component {
  constructor(props){
    super(props);

  }


  render () {

    const title = <a href="http://casesandberg.github.io/react-color/" target={'_blank'}>拾色器（react-color）</a>
    return (
      <Card title={title} bordered={false}>
        <SketchPicker />
      </Card>
    )

  }

}