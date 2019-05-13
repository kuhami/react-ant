import React, { Fragment } from 'react';
import { Layout, Icon } from 'antd';
import GlobalFooter from '@/components/GlobalFooter';

const { Footer } = Layout;
const FooterView = () => (
  <Footer style={{ padding: 0 }}>
    <GlobalFooter
      links={[
        {
          key: 'Pro 首页',
          title: 'Pro 首页',
          href: 'https://github.com/kuhami',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <Icon type="github" />,
          href: 'https://github.com/kuhami/react-ant',
          blankTarget: true,
        },
        {
          key: 'Ant Tabs',
          title: 'Ant Tabs',
          href: 'https://github.com/kuhami/react-ant',
          blankTarget: true,
        },
      ]}
      copyright={
        <Fragment>
          Copyright <Icon type="copyright" /> 2018 蚂蚁金服体验技术部出品
        </Fragment>
      }
    />
  </Footer>
);
export default FooterView;
