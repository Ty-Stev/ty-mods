import type { Register } from 'claude-code'

// 配色取自 Rosé Pine（Ghostty 当前主题），色值来自终端截图采样：
// foam #9ccfd8 是日期那个蓝，rose #ebbcba 是文件夹名那个粉。
// 你的消息：实心 foam 蓝气泡压暗一档，仍配深色文字（底色不够浅，浅字反而看不清）。
// Claude 回复：rose 粉调压暗的底，保持默认浅色文字（长回复和代码块需要深底）。
const USER_BG = '#4a8f9b' // Rosé Pine foam 压暗一档，实心气泡不再刺眼
const USER_BORDER = '#9ccfd8' // Rosé Pine foam 原色，比底色亮一档，勾出边框
const USER_TEXT = '#191724' // Rosé Pine base，在压暗后的 foam 上是 4.8:1
const CLAUDE_BORDER = '#ebbcba' // Rosé Pine rose
const CLAUDE_TINT = '#2c1c21'

export const register: Register = on => {
  // 你的输入：引擎会在文字后面自己刷一条灰色底，和 tint 打架。手打的输入是纯文本，
  // 所以这里直接接管绘制。其他来源（任务通知、peer 消息）保持引擎自己的画法。
  on('ui.render', { component: 'UserMessage' }, async ($, e, next) => {
    if (e.props.origin.kind !== 'composer') {
      return next(e)
    }

    const { Box, Text } = $.ui.resolve(e)

    return (
      <Box borderStyle="quote" borderColor={USER_BORDER} backgroundColor={USER_BG}>
        <Text color={USER_TEXT}>{'❯ ' + e.props.text}</Text>
      </Box>
    )
  })

  // Claude 的回复：先拿引擎自己画的结果，再套一层粉色 bar 和淡底。
  on('ui.render', { component: 'AssistantMessage' }, async ($, e, next) => {
    const theirs = await next(e)
    const { Box } = $.ui.resolve(e)

    return (
      <Box borderStyle="quote" borderColor={CLAUDE_BORDER} backgroundColor={CLAUDE_TINT}>
        {theirs}
      </Box>
    )
  })
}
