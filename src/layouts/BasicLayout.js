import React, { Suspense } from 'react';
import router from 'umi/router';
import { Route } from 'react-router-dom';
import { Layout,Tabs,Dropdown,Menu,Icon  } from 'antd';
import DocumentTitle from 'react-document-title';
import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
import { connect } from 'dva';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import pathToRegexp from 'path-to-regexp';
import Media from 'react-media';
import { formatMessage } from 'umi/locale';
import Authorized from '@/utils/Authorized';
import logo from '../assets/logo.svg';
import Footer from './Footer';
import Header from './Header';
import Context from './MenuContext';
import Exception403 from '../pages/Exception/403';
import PageLoading from '@/components/PageLoading';
import SiderMenu from '@/components/SiderMenu';
import styles from './BasicLayout.less';

// lazy load SettingDrawer
const SettingDrawer = React.lazy(() => import('@/components/SettingDrawer'));

const { Content } = Layout;
const { TabPane } = Tabs;
const query = {
  'screen-xs': {
    maxWidth: 575,
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767,
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991,
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199,
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599,
  },
  'screen-xxl': {
    minWidth: 1600,
  },
};

class BasicLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    const {routes} = props.route,routeKey = '/home/home',tabName = '首页'; // routeKey 为设置首页设置 试试 '/dashboard/analysis' 或其他key值
    const tabLists = this.updateTree(routes);
    let tabList=[],tabListArr=[];
    tabLists.map((v) => {
      if(v.key === routeKey){
        if(tabList.length === 0){
          v.closable = false
          v.tab = tabName
          tabList.push(v);
        }
      }
      if(v.key){
        tabListArr.push(v.key)
      }
    });
    //获取所有已存在key值
    this.state = ({
        tabList:tabList,
        tabListKey:[routeKey],
        activeKey:routeKey,
        tabListArr,
        routeKey
    })

    this.getPageTitle = memoizeOne(this.getPageTitle);
    this.matchParamsPath = memoizeOne(this.matchParamsPath, isEqual);
  }

  componentDidMount() {
    this.props.history.push({ pathname : '/'  })
    const {
      dispatch,
      route: { routes, authority },
    } = this.props;
    dispatch({
      type: 'user/fetchCurrent',
    });
    dispatch({
      type: 'setting/getSetting',
    });
    dispatch({
      type: 'menu/getMenuData',
      payload: { routes, authority },
    });
  }

  updateTree = data => {
    const treeData = data;
    const treeList = [];
    // 递归获取树列表
    const getTreeList = data => {
      data.forEach(node => {
        if(!node.level){
          treeList.push({ tab: node.name, key: node.path,locale:node.locale,closable:true,content:node.component });
        }
        if (node.routes && node.routes.length > 0) { //!node.hideChildrenInMenu &&
          getTreeList(node.routes);
        }
      });
    };
    getTreeList(treeData);
    return treeList;
  };

  componentDidUpdate(preProps) {
    // After changing to phone mode,
    // if collapsed is true, you need to click twice to display
    const { collapsed, isMobile } = this.props;
    if (isMobile && !preProps.isMobile && !collapsed) {
      this.handleMenuCollapse(false);
    }
  }

  getContext() {
    const { location, breadcrumbNameMap } = this.props;
    return {
      location,
      breadcrumbNameMap,
    };
  }

  matchParamsPath = (pathname, breadcrumbNameMap) => {
    const pathKey = Object.keys(breadcrumbNameMap).find(key => pathToRegexp(key).test(pathname));
    return breadcrumbNameMap[pathKey];
  };

  getRouterAuthority = (pathname, routeData) => {
    let routeAuthority = ['noAuthority'];
    const getAuthority = (key, routes) => {
      routes.map(route => {
        if (route.path && pathToRegexp(route.path).test(key)) {
          routeAuthority = route.authority;
        } else if (route.routes) {
          routeAuthority = getAuthority(key, route.routes);
        }
        return route;
      });
      return routeAuthority;
    };
    return getAuthority(pathname, routeData);
  };

  getPageTitle = (pathname, breadcrumbNameMap) => {
    const currRouterData = this.matchParamsPath(pathname, breadcrumbNameMap);

    if (!currRouterData) {
      return 'Ant Tabs';
    }
    const pageName = formatMessage({
      id: currRouterData.locale || currRouterData.name,
      defaultMessage: currRouterData.name,
    });

    return `${pageName} - Ant Tabs`;
  };

  getLayoutStyle = () => {
    const { fixSiderbar, isMobile, collapsed, layout } = this.props;
    if (fixSiderbar && layout !== 'topmenu' && !isMobile) {
      return {
        paddingLeft: collapsed ? '80px' : '256px',
      };
    }
    return null;
  };

  handleMenuCollapse = collapsed => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: collapsed,
    });
  };

  renderSettingDrawer = () => {
    // Do not render SettingDrawer in production
    // unless it is deployed in preview.pro.ant.design as demo
    if (process.env.NODE_ENV === 'production' && APP_TYPE !== 'site') {
      return null;
    }
    return <SettingDrawer />;
  };

  onHandlePage =(e)=>{//点击左侧菜单
    let {menuData} = this.props,{key,search=''} = e;
    const tabLists = this.updateTreeList(menuData);
    const {tabListKey,tabList,tabListArr} =  this.state;
    if(tabListArr.includes(key)){
      if(!search){
        router.push(key)
      }else{
        router.push({pathname:key,search})
      }

    }else{
      key = '/exception/404'
      router.push('/exception/404')
    }

    this.setState({
      activeKey:key
    })
    tabLists.map((v) => {
      if(v.key === key){
        if(tabList.length === 0){
          v.closable = false
          this.setState({
            tabList:[...tabList,v]
          })
        }else{
          if(!tabListKey.includes(v.key)){
            this.setState({
              tabList:[...tabList,v],
              tabListKey:[...tabListKey,v.key]
            })
          }
        }
      }
    })
    // this.setState({
    //   tabListKey:this.state.tabList.map((va)=>va.key)
    // })
  }

    // 切换 tab页 router.push(key);
    onChange = key => {
        this.setState({ activeKey:key });
        router.push(key)
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    remove = (targetKey) => {
        let {activeKey} = this.state;
        let lastIndex;
        this.state.tabList.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const tabList = [],tabListKey=[]
        this.state.tabList.map(pane => {
          if(pane.key !== targetKey){
              tabList.push(pane)
              tabListKey.push(pane.key)
          }
        });
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = tabList[lastIndex].key;
        }
        router.push(activeKey)
        this.setState({ tabList, activeKey,tabListKey });
    }

    updateTreeList = data => {
        const treeData = data;
        const treeList = [];
        // 递归获取树列表
        const getTreeList = data => {
            data.forEach(node => {
              if(!node.level){
                treeList.push({ tab: node.name, key: node.path,locale:node.locale,closable:true,content:node.component });
              }
                if (node.children && node.children.length > 0) { //!node.hideChildrenInMenu &&
                    getTreeList(node.children);
                }
            });
        };
        getTreeList(treeData);
        return treeList;
    };

    onClickHover=(e)=>{
    // message.info(`Click on item ${key}`);
    let { key } = e,{activeKey,tabList,tabListKey,routeKey} = this.state;

    if(key === '1'){
      tabList= tabList.filter((v)=>v.key !== activeKey || v.key === routeKey)
      tabListKey = tabListKey.filter((v)=>v !== activeKey || v === routeKey)
      this.setState({
        activeKey:routeKey,
        tabList,
        tabListKey
      })
    }else if(key === '2'){
      tabList= tabList.filter((v)=>v.key === activeKey || v.key === routeKey)
      tabListKey = tabListKey.filter((v)=>v === activeKey || v === routeKey)
      this.setState({
        activeKey,
        tabList,
        tabListKey
      })
    }else if(key === '3'){
      tabList= tabList.filter((v)=>v.key === routeKey)
      tabListKey = tabListKey.filter((v)=>v === routeKey)
      this.setState({
        activeKey:routeKey,
        tabList,
        tabListKey
      })
    }

  }

  render() {
    const {
      navTheme,
      layout: PropsLayout,
      location: { pathname,search },
      isMobile,
      children,
      menuData,
      breadcrumbNameMap,
      route: { routes },
      fixedHeader,
      hidenAntTabs,
    } = this.props;
    let {activeKey,routeKey} = this.state;
    if(pathname === '/'){
          // router.push(routeKey)
          activeKey = routeKey
      }
    const isTop = PropsLayout === 'topmenu';
    const routerConfig = this.getRouterAuthority(pathname+search, routes);
    const contentStyle = !fixedHeader ? { paddingTop: 0 } : {};
    this.props.location.onHandlePage = this.onHandlePage;
    const menu = (
      <Menu onClick={this.onClickHover}>
        <Menu.Item key="1">关闭当前标签页</Menu.Item>
        <Menu.Item key="2">关闭其他标签页</Menu.Item>
        <Menu.Item key="3">关闭全部标签页</Menu.Item>
      </Menu>
    );
    const operations = (
      <Dropdown overlay={menu} >
        <a className="ant-dropdown-link" href="#">
          Hover me<Icon type="down" />
        </a>
      </Dropdown>
    );

    const layout = (
      <Layout>
        {isTop && !isMobile ? null : (
          <SiderMenu
            logo={logo}
            theme={navTheme}
            onCollapse={this.handleMenuCollapse}
            menuData={menuData}
            isMobile={isMobile}
            {...this.props}
            onHandlePage ={this.onHandlePage}
          />
        )}
        <Layout
          style={{
            ...this.getLayoutStyle(),
            minHeight: '100vh',
          }}
        >
          <Header
            menuData={menuData}
            handleMenuCollapse={this.handleMenuCollapse}
            logo={logo}
            isMobile={isMobile}
            {...this.props}
          />
          <Content className={styles.content} style={contentStyle}>
            {hidenAntTabs ?
              (<Authorized authority={routerConfig} noMatch={<Exception403 />}>
              {children}
                </Authorized>) :
              (this.state.tabList && this.state.tabList.length ? (
              <Tabs
                // className={styles.tabs}
                activeKey={activeKey}
                onChange={this.onChange}
                tabBarExtraContent={operations}
                tabBarStyle={{background:'#fff'}}
                tabPosition="top"
                tabBarGutter={-1}
                hideAdd
                type="editable-card"
                onEdit={this.onEdit}
              >
                {this.state.tabList.map(item => (
                  <TabPane tab={item.tab} key={item.key} closable={item.closable}>
                    <Authorized  noMatch={<Exception403 />}>
                      {/*{item.content}*/}
                      <Route key={item.key} path={item.path} component={item.content} exact={item.exact} />
                    </Authorized>
                  </TabPane>
                ))}
              </Tabs>
            ) : null)}
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
    return (
      <React.Fragment>
        <DocumentTitle title={this.getPageTitle(pathname, breadcrumbNameMap)}>
          <ContainerQuery query={query}>
            {params => (
              <Context.Provider value={this.getContext()}>
                <div className={classNames(params)}>{layout}</div>
              </Context.Provider>
            )}
          </ContainerQuery>
        </DocumentTitle>
        <Suspense fallback={<PageLoading />}>{this.renderSettingDrawer()}</Suspense>
      </React.Fragment>
    );
  }
}

export default connect(({ global, setting, menu }) => ({
  collapsed: global.collapsed,
  layout: setting.layout,
  menuData: menu.menuData,
  breadcrumbNameMap: menu.breadcrumbNameMap,
  ...setting,
}))(props => (
  <Media query="(max-width: 599px)">
    {isMobile => <BasicLayout {...props} isMobile={isMobile} />}
  </Media>
));
