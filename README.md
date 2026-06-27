# 初星育成

学园偶像大师同人育成前端原型。

## 运行方式

直接用浏览器打开 `index.html` 即可运行。

## 酒馆助手脚本入口

新增了可被 `import` 的悬浮球脚本入口：

- `dist/hatsu-launcher/index.js`

示例（按你的仓库地址替换）：

```js
import 'https://testingcf.jsdelivr.net/gh/<your-user>/<your-repo>@<tag-or-branch>/dist/hatsu-launcher/index.js'
```

可选全局配置（在 `import` 前设置）：

```js
window.HatsuLauncherConfig = {
  frontendUrl: '/hatsu-produce-local/st.html',
  launcherText: '初',
  launcherSize: 44
};
```

## 当前功能

- 担当偶像选择
- 18 天 First Live 育成日程
- 每日 3 次普通行动与 1 次额外行动
- 上课、训练、休息、外出、交流
- SP 训练候选与随机互动事件
- 前端数值结算
- P 手账提示词、育成日志与结算明细
- 行动后全屏事件描述页
- 内部通知与模态框
