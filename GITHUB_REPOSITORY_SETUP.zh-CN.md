# GitHub 仓库信息与项目主页配置指南

[English](GITHUB_REPOSITORY_SETUP.md) · [项目主页](README.zh-CN.md)

本文用于统一 FIRE 在 GitHub 上的项目定位、简介、标签和社区协作规范。下列内容可直接复制到仓库设置中。建议保留现有的短仓库地址，除非有充分理由更名。

## 1. 项目身份

**仓库名称（slug）：** `fire`，建议保留现有地址：<https://github.com/LiSichao/fire>。

**README 与对外材料中的项目名称：**

> FIRE — Financial Independence, Retire Early Planner

**中文项目名称：**

> FIRE 财务自由规划器

**英文口号：**

> Explore your path to financial freedom.

**中文口号：**

> 把财务自由从目标变成可推演的路径。

GitHub 仓库有仓库名称、简介、网站和 Topics 等字段；README 标题不是一个独立的仓库名称字段。

## 2. About 简介

推荐将英文版作为 GitHub About 的主简介，以便国际用户搜索与理解：

> FIRE (Financial Independence, Retire Early) planner for WeChat Mini Programs. Model income, expenses, savings, inflation, and investment-return scenarios to explore a path to financial freedom.

如果项目主要面向中文用户，也可以改用以下版本：

> FIRE（Financial Independence, Retire Early）财务自由规划器，基于微信小程序模拟收入、支出、储蓄、通胀与投资收益情景，探索财务自由路径。

GitHub 的 About 只有一个简介字段，建议选择一种语言作为主简介，并通过中英双语 README 覆盖另一种语言的受众。不要使用“保证实现财务自由”“精准预测退休结果”“投资建议”等超出当前项目能力的表述。

## 3. Topics 项目标签

建议在仓库 About 中添加以下小写、连字符风格的 Topics。这些标签有助于按主题和技术栈发现项目。

```text
fire
financial-independence
early-retirement
financial-freedom
personal-finance
financial-planning
retirement-planning
wealth-management
wechat-miniprogram
wechat
echarts
```

不建议添加 `investment-advice`、`financial-advisor`、`tax-calculator` 或 `pension-calculator`，因为这些名称会让用户误以为项目提供当前实现并不具备的专业服务或计算能力。

## 4. 网站与社交预览图

**Website：** 在没有真正可公开访问的在线演示或项目网站之前，建议留空。仓库地址本身已经显示，无需重复填入网站字段。

**Social preview 社交预览图：** 建议采用以下设计需求：

- 画布：1280 × 640 px；PNG 或 JPG，小于 1 MB。
- 主标题：`FIRE`。
- 英文副标题：`FINANCIAL INDEPENDENCE, RETIRE EARLY`。
- 中文文案：`把财务自由变成可以模拟的路径`。
- 辅助关键词：`Income · Expenses · Savings · Returns`。
- 视觉方向：高对比、清晰易读的排版；主色可参考小程序导航栏的靛蓝色 `#6366F1`，搭配简洁的资产余额/趋势图形。重要文字不要贴近边缘，不应暗示投资收益有保证。

GitHub 建议图片至少为 640 × 320 px，最佳显示尺寸为 1280 × 640 px。完成后在 **Repository → Settings → Social preview** 中上传。

## 5. 建议创建的仓库标签

请先在 **Issues → Labels** 中创建下列标签，再依赖随附的 Issue 表单自动添加标签。GitHub 不会因为模板引用了某个标签就自动创建它。

| 标签 | 用途 |
| --- | --- |
| `bug` | 可复现的缺陷 |
| `enhancement` | 新功能提议 |
| `documentation` | 文档改进 |
| `needs-triage` | 等待维护者初步分诊 |
| `good first issue` | 适合新贡献者入门的任务 |
| `help wanted` | 欢迎社区协助的任务 |
| `calculation` | 现金流模型、公式或数值行为 |
| `privacy` | 数据处理与隐私相关问题 |

随附的 Issue 表单会使用 `bug`、`needs-triage` 和 `enhancement`，请确保这三个标签的拼写完全一致。

## 6. 本包提供的社区协作文件

- `README.md` 与 `README.zh-CN.md`：中英文项目主页。
- `CONTRIBUTING.md` 与 `CONTRIBUTING.zh-CN.md`：贡献流程。
- `CODE_OF_CONDUCT.md` 与 `CODE_OF_CONDUCT.zh-CN.md`：社区行为准则。
- `SECURITY.md` 与 `SECURITY.zh-CN.md`：漏洞报告说明。
- `SUPPORT.md` 与 `SUPPORT.zh-CN.md`：支持渠道和问题分类指南。
- `.github/ISSUE_TEMPLATE/`：结构化的 Bug 与功能建议表单。
- `.github/PULL_REQUEST_TEMPLATE.md`：针对财务规划项目的 PR 检查清单。

Issue 表单遵循 GitHub 的 YAML 表单结构；它们会要求提供复现信息，但不会要求用户提交真实财务记录，并会提醒用户从截图中移除个人信息。

## 7. 发布前检查清单

- [ ] 检查本包附带的 MIT `LICENSE`，确认版权声明中的权利人及年份正确，并确认有权对项目自有代码授权后再提交。保留所有第三方许可证声明。
- [ ] 创建上方列出的仓库标签。
- [ ] 检查 `SECURITY.md` 中的漏洞报告渠道是否真实可用，并且有人查看。如果已启用 GitHub 私密漏洞报告功能，应优先引导到该渠道。
- [ ] 每次新增网络请求、分析统计、云函数或持久化存储后，都要重新审查隐私说明。
- [ ] 发布版本前，在微信开发者工具中验证两种计算模式和所有图表；条件允许时也要在真实设备上验证。
- [ ] 只有在存在可重复的自动化检查或测试套件后，再配置 CI。当前检查到的源码快照中没有测试运行器或 CI 工作流，因此本包不会添加虚假的绿色状态徽章或无法运行的工作流。
- [ ] 只有在有人愿意维护和回答的前提下才启用 Discussions；否则使用 Issues 和 `SUPPORT.md` 即可。
- [ ] 准备好正式的社交预览图后再上传。

**许可证说明：** 本包现已包含标准 MIT `LICENSE`，版权声明为 `Li Sichao`。提交前请确认权利人和年份无误。MIT 许可证适用于项目自有代码；ECharts 等第三方组件仍遵循各自的许可证。

## 8. 应用 GitHub 元信息

1. 打开 GitHub 仓库主页。
2. 在 **About** 面板中点击设置/编辑入口。
3. 填入选定的简介并添加 Topics；只有项目确实有网站时才填写 Website。
4. 进入 **Settings → Social preview**，上传完成后的预览图。
5. 将本包中的文件合并到仓库根目录，并提交到默认分支，GitHub 才能发现社区模板。
