import React,{Component} from 'react'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'
import { Card } from 'antd';

export default class BasicDemo extends Component {
  constructor(props){
    super(props);

    this.state = {
      editorState: BraftEditor.createEditorState('<p>Hello <b>World!</b><br/><br/><a href="https://github.com/kuhami/react-ant-pro" target="_blank" >MY Github 欢迎 Start（https://github.com/kuhami/react-ant-pro）</a>😉</p>'), // 设置编辑器初始内容
      outputHTML: '<p></p>'
    }
  }

  componentDidMount () {
    this.isLivinig = true
    // 3秒后更改编辑器内容
    // setTimeout(this.setEditorContentAsync, 3000)
  }

  componentWillUnmount () {
    this.isLivinig = false
  }

  handleChange = (editorState) => {
    this.setState({
      editorState: editorState,
      outputHTML: editorState.toHTML()
    })
  }

  setEditorContentAsync = () => {
    this.isLivinig && this.setState({
      editorState: BraftEditor.createEditorState('<p>你好，<b>世界!</b><p>')
    })
  }

  render () {

    const { editorState, outputHTML } = this.state
    const title = <a href="https://github.com/margox/braft-editor" target={'_blank'}>富文本编译器（braft-editor）</a>
    return (
      <Card title={title} bordered={false}>
        <div className="editor-wrapper">
          <BraftEditor
            value={editorState}
            onChange={this.handleChange}
          />
        </div>
        <h5>输出内容</h5>
        <div className="output-content">{outputHTML}</div>
      </Card>
    )

  }

}