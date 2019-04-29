import React,{Component} from 'react'
import { SketchPicker,TwitterPicker,CompactPicker } from 'react-color';
import reactCSS from 'reactcss'
import { Card, Col, Row } from 'antd';
import DragHandle from './Drag';

export default class BasicDemo extends Component {
  constructor(props){
    super(props);
    this.state = {
      background: '#8699F7',
      displayColorPicker: true,
      color: {
        r: '134',
        g: '153',
        b: '247',
        a: '100',
      },
    };
  }
  handleChangeComplete = (color) => {
    this.setState({
      color: color.rgb,
      background: color.hex });
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({
      color: color.rgb,
      background: color.hex })
  };

  render () {
    const {background} = this.state
    const title = <a href="http://casesandberg.github.io/react-color/" target={'_blank'}>拾色器（react-color）</a>
    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <Card title={title} bordered={false} style={{minHeight:'calc(100vh)',background:background}}>
        <Row gutter={24}>
        <Col xl={6} lg={12} sm={24} xs={24}>
          <SketchPicker
            color={ this.state.background }
            onChangeComplete={ this.handleChangeComplete }
          />
        </Col>
        <Col xl={6} lg={12} sm={24} xs={24}>
          <div style={ styles.swatch } onClick={ this.handleClick }>
            <div style={ styles.color } />
          </div>
          { this.state.displayColorPicker ? <div style={ styles.popover }>
            <div style={ styles.cover } onClick={ this.handleClose }/>
            <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
          </div> : null }
        </Col>
        <Col xl={6} lg={12} sm={24} xs={24}>
          <TwitterPicker
            color={ this.state.background }
            onChangeComplete={ this.handleChangeComplete }
          />
        </Col>
        <Col xl={6} lg={12} sm={24} xs={24}>
          <CompactPicker
            color={ this.state.background }
            onChangeComplete={ this.handleChangeComplete }
          />
        </Col>
          </Row>
      </Card>
    )

  }

}