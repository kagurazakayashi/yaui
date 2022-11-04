![YAUI](favicon.ico)

# YAUI

一个 HTML5 网页外观库，
基于自定义元素（custom elements）提供组件化的原生 TypeScript 开发体验。
需要浏览器支持 ES6 。

**正在开发中...**

## 已完成功能

- [x] 顶部标题栏 `ya-top-app-bar`
- [x] 图标按钮 `ya-icon-button`
  - [x] 和菜单内图标的兼容性
- [x] 等待动画圆圈 `ya-loading-spinner`
- [x] 按钮 `ya-button`
  - [x] 不可用状态
    - [x] 带有 `ya-loading-spinner` 的等待状态
- [x] 弹出式菜单 `ya-menu`
  - [x] 处理屏幕底端溢出的情况
- [x] 可滚动区域 `ya-scroll-view`
  - [ ] 跟随滚动自动隐藏顶部标题栏
- [x] 内容面板 `ya-view`
  - [x] 正文面板
- [x] 对话框
  - [x] 登录对话框 `ya-dialog-login`
    - [x] 响应式布局
  - [x] 可定制对话框 `ya-dialog`
- [x] 文本框 `ya-text-box`
  - [x] 一般文本框
  - [x] 带标题（动画）文本框
  - [x] 支持多个正则表达式过滤和提示错误信息
  - [x] 下拉菜单
- [x] 开关 `ya-switch`
- [x] 临时提示框 `ya-snackbar`
  - [x] 进出动画
  - [x] 同时显示多个
  - [x] 支持四角显示
- [x] 表格 `ya-table`
  - [x] 翻页功能
- [ ] 进度条
  - [ ] 一般进度条
  - [x] 圆形进度条 `ya-circle-progress-bar`
    - [x] 数值显示

# 分支

- `demo`: 测试项目分支，为项目根目录。
- `main`: 可由其他项目引用的主分支，位于 `src/libYAUI` 。

## 克隆和编译

1. 先克隆 demo 分支: `git clone https://github.com/kagurazakayashi/yaui.git -b demo yaui`
2. 进入 src 文件夹: `cd yaui/src`
3. 初始化库分支(主分支): `git submodule init`
4. 更新子模块: `git submodule update --remote`
5. 返回项目根目录: `cd ..`
6. 下载第三方依赖: `npm i`
7. 运行: `npm run start`

## 协议

Copyright (c) 2022 KagurazakaYashi YAUI is licensed under Mulan PSL v2. You can use this software according to the terms and conditions of the Mulan PSL v2. You may obtain a copy of Mulan PSL v2 at: http://license.coscl.org.cn/MulanPSL2 THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT, MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE. See the Mulan PSL v2 for more details.
