import React, { PureComponent, Fragment } from 'react';
import { Card, Steps } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import styles from '../style.less';
import Step1 from '../StepForm/Step1';
import Step2 from '../StepForm/Step2';
import Step3 from '../StepForm/Step3';
const { Step } = Steps;

export default class StepForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }
  getCurrentStep() {
    const { location } = this.props;
    const { pathname } = location;
    const pathList = pathname.split('/');
    const current = this.getParam('current');
    this.setState({
      current:current
    })
    return current ?current-1:0

    // switch (pathList[pathList.length - 1]) {
    //   case 'info':
    //     return 0;
    //   case 'confirm':
    //     return 1;
    //   case 'result':
    //     return 2;
    //   default:
    //     return 0;
    // }
  }

   getParam =(name)=> {
    var search = document.location.search;
    var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
    var matcher = pattern.exec(search);
    var items = null;
    if (null != matcher) {
      try {
        items = decodeURIComponent(decodeURIComponent(matcher[1]));
      } catch(e) {
        try {
          items = decodeURIComponent(matcher[1]);
        } catch(e) {
          items = matcher[1];
        }
      }
    }
    return items;
  };

  render() {
    const { location, children } = this.props;
    let {current} = this.state
    current = current ? current :1;
    return (
      <PageHeaderWrapper
        title="分步表单"
        tabActiveKey={location.pathname}
        content="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。"
      >
        <Card bordered={false}>
          <Fragment>
            <Steps current={this.getCurrentStep()} className={styles.steps}>
              <Step title="填写转账信息" />
              <Step title="确认转账信息" />
              <Step title="完成" />
            </Steps>
            {current==1 ? <Step1/> :(current==2 ? <Step2/>:(current==3 ? <Step3/>:<Step1/>))}
          </Fragment>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
