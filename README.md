简体中文 | [English](./README.zh-CN.md) | [Русский](./README.ru-RU.md)

<h1 align="center">Ant Tabs Pro (多标签tabs)</h1>

<div align="center">

开箱即用的中台前端/设计解决方案。

[![CircleCI Status](https://circleci.com/gh/ant-design/ant-design-pro.svg?style=svg)](https://circleci.com/gh/ant-design/ant-design-pro/)
[![Build status](https://ci.appveyor.com/api/projects/status/67fxu2by3ibvqtat/branch/master?svg=true)](https://ci.appveyor.com/project/afc163/ant-design-pro/branch/master)
[![Dependencies](https://img.shields.io/david/ant-design/ant-design-pro.svg)](https://david-dm.org/ant-design/ant-design-pro)
[![DevDependencies](https://img.shields.io/david/dev/ant-design/ant-design-pro.svg)](https://david-dm.org/ant-design/ant-design-pro?type=dev)
[![Gitter](https://badges.gitter.im/ant-design/ant-design-pro.svg)](https://gitter.im/ant-design/ant-design-pro?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

![](https://raw.githubusercontent.com/kuhami/react-ant/master/public/ant1.jpeg)
![](https://raw.githubusercontent.com/kuhami/react-ant/master/public/ant.jpeg)

</div>

- [Ant Tabs 源码地址](https://github.com/kuhami/react-ant)
- [Ant Tabs 文档地址](https://kuhami.github.io/KroInterview/antTabs.html#/AntTabs)
- [Ant Tabs 更新日志](https://kuhami.github.io/KroInterview/antTabs.html#/AntTabs)

## 特性

- :gem: **优雅美观**：基于 Ant Design 体系精心设计
- :triangular_ruler: **常见设计模式**：提炼自中后台应用的典型页面和场景
- :rocket: **最新技术栈**：使用 React/umi/dva/antd 等前端前沿技术开发
- :iphone: **响应式**：针对不同屏幕大小设计
- :art: **主题**：可配置的主题满足多样化的品牌诉求
- :globe_with_meridians: **国际化**：内建业界通用的国际化方案
- :gear: **最佳实践**：良好的工程实践助您持续产出高质量代码
- :1234: **Mock 数据**：实用的本地数据调试方案
- :white_check_mark: **UI 测试**：自动化测试保障前端产品质量

## 模板

```
- 社区精选组件
  - 拖拽
  - 富文本编译器
  - 拾色器
  - 滚动条
- 组件封装
  - 多功能 table
  - SelectTree
- Dashboard
  - 分析页
  - 监控页
  - 工作台
- 表单页
  - 基础表单页
  - 分步表单页
  - 高级表单页
- 列表页
  - 查询表格
  - 标准列表
  - 卡片列表
  - 搜索列表（项目/应用/文章）
- 详情页
  - 基础详情页
  - 高级详情页
- 结果
  - 成功页
  - 失败页
- 异常
  - 403 无权限
  - 404 找不到
  - 500 服务器出错
  - 触发报错
- 个人页
  - 个人中心
  - 个人设置
```

## 使用

### 使用命令行
```bash
$ git clone https://github.com/kuhami/react-ant.git --depth=1
$ cd react-ant
$ npm install
$ npm start         # 访问 http://localhost:8000
```

### 使用 docker

```bash
# preview 
$ docker pull kuhami/react-ant
$ docker run -p 80:80 kuhami/react-ant
# open http://localhost

# dev 
$ npm run docker:dev

# build 
$ npm run docker:build


# production dev 
$ npm run docker-prod:dev

// production build 
$ npm run docker-prod:build
```

更多信息请参考 [使用文档](http://pro.ant.design/docs/getting-started)。

## 支持环境

现代浏览器及 IE11。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions

## 参与贡献

我们非常欢迎你的贡献，你可以通过以下方式和我们一起共建 :smiley:：

- 在你的公司或个人项目中使用 React Ant。
- 通过 [Issue](https://github.com/kuhami/react-ant/issues) 报告 bug 或进行咨询。
- 提交 [Pull Request](https://github.com/kuhami/react-ant/pulls) 改进 Pro 的代码。