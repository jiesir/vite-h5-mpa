## 介绍

项目基于`typescript`,`vue3.0`,`vuex4.0`,`vite2.0`实现的 vue3 风格的手机端基础工程，多页面应用。


## 预安装

### 环境要求

- `Node.js`: - 版本最好大于 `12.0.0`
- `yarn` > `npm` > `cnpm`: - 包管理工具.


## 使用

### 开发环境

```bash
yarn dev
```

### 打包

```bash

yarn build
```

### 其他

```bash
yarn clean:cache # 删除缓存

yarn clean:lib # 删除node_modules，兼容window系统
```


## 项目结构

```
├── build (编译模块)
├── config (配置文件)
├── docs (项目文档)
├── mock (模拟数据)
├── plugins (插件)
├── public (存放公共文件)
│   └── favicon.ico
├── src
│   ├── assets (公共图片)
│   │   ├── logo.png
│   │   └── ...
│   ├── components (业务组件)
│   │   └── ...
│   ├── pages (业务模块)
│   │   ├── DM (业务模块1)
│   │   │   ├── DM0 (子模块1)
│   │   │   │   ├── DM0001 (子页面1)
│   │   │   │   │   ├── main.ts (该页面脚本)
│   │   │   │   │   ├── index.less (该页面样式)
│   │   │   │   │   └── index.vue (该页面实体)
│   │   │   │   ├── DM0002 (子页面2)
│   │   │   │   └── ...
│   │   │   ├── DM1 (子模块2)
│   │   │   ├── ...
│   │   │   └── page.json (该业务模块路由信息配置)
│   │   └── ...
│   ├── styles (公共样式文件)
│   │   ├── utils
│   │   └── index.less
│   ├── utils (工具文件)
│   │   ├── component
│   │   ├── console
│   │   ├── loader
│   │   ├── store
│   │   ├── bridge.js
│   │   ├── install.js
│   │   ├── modules.js
│   │   ├── proxy.ts
│   │   ├── tools.js
│   │   └── validate.js
│   └── shims-vue.d.ts (vue类型文件)
├── static (静态资源,外部公共组件等)
├── index.html
├── package.json
├── postcss.config.ts
├── README.md
├── tsconfig.ts
└── vite.config.ts

```




## SPA与MPA区别

                  单页面应用（SinglePage Web Application，SPA）	多页面应用（MultiPage Application，MPA）
组成	          一个外壳页面和多个页面片段组成	             多个完整页面构成
资源共用(css,js)  共用，只需在外壳部分加载	                     不共用，每个页面都需要加载
刷新方式	      页面局部刷新或更改	                         整页刷新
url 模式	      a.com/#/pageone                              a.com/pageone.html
                  a.com/#/pagetwo	                           a.com/pagetwo.html
用户体验	      页面片段间的切换快，用户体验良好	              页面切换加载缓慢，流畅度不够，用户体验比较差
转场动画	      容易实现	                                    无法实现
数据传递	      容易	                                        依赖 url传参、或者cookie 、localStorage等
搜索引擎优化(SEO) 需要单独方案、实现较为困难、不利于SEO检索，可利用服务器端渲染(SSR)优化	实现方法简易
试用范围	      高要求的体验度、追求界面流畅的应用	          适用于追求高度支持搜索引擎的应用
开发成本	      较高，常需借助专业的框架	                      较低 ，但页面重复代码多
维护成本	      相对容易	                                    相对复杂
