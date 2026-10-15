# ty-mods

Ty 自己的 Claude Code mod（plugin）集合，同时是本地的 mod 制作目录。

## 安装

```
/plugin marketplace add Ty-Stev/ty-mods
/plugin install <mod>@ty-mods
```

## mod 列表

| mod | 说明 |
| --- | --- |
| `context-bar` | 在输入框上方用一条堆叠条显示 context window 占用，每个类别一种颜色，带 token 数、占比和自动压缩阈值。`/context-bar` 显示或隐藏，选择跨会话保留。fork 自 [hamzafer/claude-code-mods](https://github.com/hamzafer/claude-code-mods)，把过长的类别名改短。 |
| `speaker-colours-rosepine` | Rosé Pine 配色：你的消息用 foam 色条，Claude 的回复用 rose 色条。fork 自 Herman Chan 的 speaker-colours。 |

## 开发

改完 mod 源码**不会自动生效**——Claude Code 会把 plugin 复制到
`~/.claude/plugins/cache/ty-mods/<mod>/<version>/`，必须重装一次：

```
claude plugin install <mod>@ty-mods -y
```

改完顺手 bump `plugin.json` 里的 `version`，否则缓存目录名不变，很难判断是否刷新了。
用 `claude plugin list --json` 对比 `version` 和 `folderVersion` 能查出来。

写新 mod 的完整流程见 Claude Code 的 `plugin-authoring` skill。
