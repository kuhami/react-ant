(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[46],{ZDac:function(t,e,a){"use strict";var n=a("tAuX"),r=a("g09b");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("IzEo");var u=r(a("bx4M")),i=r(a("2Taf")),o=r(a("vZ4D")),c=r(a("MhPg")),l=r(a("l4Ni")),f=r(a("ujKo")),d=n(a("q1tI")),s=r(a("yEr3"));function h(t){var e=p();return function(){var a,n=(0,f.default)(t);if(e){var r=(0,f.default)(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return(0,l.default)(this,a)}}function p(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(t){return!1}}a("Lzxq");var v=function(t){(0,c.default)(a,t);var e=h(a);function a(t){var n;return(0,i.default)(this,a),n=e.call(this,t),n.handleChange=function(t){n.setState({editorState:t,outputHTML:t.toHTML()})},n.setEditorContentAsync=function(){n.isLivinig&&n.setState({editorState:s.default.createEditorState("<p>\u4f60\u597d\uff0c<b>\u4e16\u754c!</b><p>")})},n.state={editorState:s.default.createEditorState('<p>Hello <b>World!</b><br/><br/><a href="https://github.com/kuhami/react-ant" target="_blank" >MY Github \u6b22\u8fce Star\uff08https://github.com/kuhami/react-ant\uff09</a>\ud83d\ude09</p>'),outputHTML:"<p></p>"},n}return(0,o.default)(a,[{key:"componentDidMount",value:function(){this.isLivinig=!0}},{key:"componentWillUnmount",value:function(){this.isLivinig=!1}},{key:"render",value:function(){var t=this.state,e=t.editorState,a=t.outputHTML,n=d.default.createElement("a",{href:"https://github.com/margox/braft-editor",target:"_blank"},"\u5bcc\u6587\u672c\u7f16\u8bd1\u5668\uff08braft-editor\uff09");return d.default.createElement(u.default,{title:n,bordered:!1},d.default.createElement("div",{className:"editor-wrapper"},d.default.createElement(s.default,{value:e,onChange:this.handleChange})),d.default.createElement("h5",null,"\u8f93\u51fa\u5185\u5bb9"),d.default.createElement("div",{className:"output-content"},a))}}]),a}(d.Component);e.default=v}}]);