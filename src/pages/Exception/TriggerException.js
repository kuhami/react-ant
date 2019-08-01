import React, { PureComponent } from 'react';
import { Button, Spin, Card } from 'antd';
import { connect } from 'dva';
import styles from './style.less';

@connect(state => ({
  isloading: state.error.isloading,
}))
class TriggerException extends PureComponent {
  state = {
    isloading: false,
  };

  triggerError = code => {
    this.setState({
      isloading: true,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'error/query',
      payload: {
        code,
      },
    });
  };

  onChangePage = (key,search) =>{
    const {onHandlePage} = this.props.location;
    onHandlePage({key,search});
  }

  render() {
    const { isloading } = this.state;
    return (
      <Card>
        <Spin spinning={isloading} wrapperClassName={styles.trigger}>
          <Button type="danger" onClick={() => this.triggerError(401)}>
            触发401
          </Button>
          <Button type="danger" onClick={() => this.triggerError(403)}>
            触发403
          </Button>
          <Button type="danger" onClick={() => this.triggerError(500)}>
            触发500
          </Button>
          <Button type="danger" onClick={() => this.triggerError(404)}>
            触发404
          </Button>
          <Button type="danger" onClick={() => this.onChangePage('/libraries/braft-editor','?id=1')}>
            跳转已存在Home页面
          </Button>
          <Button type="danger" onClick={() => this.onChangePage('/home/homessss')}>
            跳转不存在页面
          </Button>
        </Spin>
      </Card>
    );
  }
}

export default TriggerException;
