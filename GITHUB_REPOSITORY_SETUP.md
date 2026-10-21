# GitHub Repository Setup and Project Metadata

[简体中文](GITHUB_REPOSITORY_SETUP.zh-CN.md) · [Project README](README.md)

This is a maintainer checklist for presenting FIRE consistently on GitHub. The suggested text is ready to copy into repository settings. Keep the short repository URL unless there is a compelling reason to change it.

## 1. Project identity

**Repository name (slug):** `fire` — keep the existing URL: <https://github.com/LiSichao/fire>.

**Project name for the README and public materials:**

> FIRE — Financial Independence, Retire Early Planner

**Chinese project name:**

> FIRE 财务自由规划器

**Tagline:**

> Explore your path to financial freedom.

**Chinese tagline:**

> 把财务自由从目标变成可推演的路径。

GitHub repositories have a repository name, description, website field, and topics; do not treat the README display title as a separate repository-name field.

## 2. About description

Use this English-first description for searchability and international readers:

> FIRE (Financial Independence, Retire Early) planner for WeChat Mini Programs. Model income, expenses, savings, inflation, and investment-return scenarios to explore a path to financial freedom.

Chinese alternative when prioritizing Chinese-speaking users:

> FIRE（Financial Independence, Retire Early）财务自由规划器，基于微信小程序模拟收入、支出、储蓄、通胀与投资收益情景，探索财务自由路径。

GitHub has one About description field, so prefer one language there and let the bilingual README serve the other audience. Avoid claims such as “guaranteed financial freedom,” “accurate retirement prediction,” or “financial advice.”

## 3. Topics

Add these repository topics in lowercase, hyphenated form. Topics help people discover projects by subject and technology.

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

Do not add `investment-advice`, `financial-advisor`, `tax-calculator`, or `pension-calculator`: those labels overstate the current implementation.

## 4. Website and social preview

**Website:** leave blank until there is a real public app demo or project website. A GitHub repository URL is already present and does not need to be duplicated as the website.

**Social preview image:** recommended creative brief:

- Canvas: 1280 × 640 px; PNG or JPG under 1 MB.
- Main title: `FIRE`.
- Descriptor: `FINANCIAL INDEPENDENCE, RETIRE EARLY`.
- Chinese line: `把财务自由变成可以模拟的路径`.
- Supporting keywords: `Income · Expenses · Savings · Returns`.
- Visual direction: clear high-contrast typography, an understated indigo base inspired by the app's `#6366F1` navigation color, and a simple balance/projection motif. Keep important text away from the edges and do not imply guaranteed returns.

GitHub recommends at least 640 × 320 px and 1280 × 640 px for best display. Upload the final image in **Repository → Settings → Social preview**.

## 5. Recommended repository labels

Create these labels in **Issues → Labels** before relying on the included issue forms. GitHub does not automatically create a label just because a template references it.

| Label | Purpose |
| --- | --- |
| `bug` | Reproducible defects |
| `enhancement` | New feature proposals |
| `documentation` | Documentation improvements |
| `needs-triage` | Needs maintainer review |
| `good first issue` | Scoped tasks suitable for newcomers |
| `help wanted` | Contributions requested |
| `calculation` | Cash-flow model, formula, or numerical behavior |
| `privacy` | Data-handling and privacy concerns |

The included forms apply `bug`, `needs-triage`, and `enhancement`. Create these exact labels so they are applied automatically.

## 6. Community health files included

- `README.md` and `README.zh-CN.md`: bilingual project landing pages.
- `CONTRIBUTING.md` and `CONTRIBUTING.zh-CN.md`: contribution workflows.
- `CODE_OF_CONDUCT.md` and `CODE_OF_CONDUCT.zh-CN.md`: community expectations.
- `SECURITY.md` and `SECURITY.zh-CN.md`: vulnerability-reporting instructions.
- `SUPPORT.md` and `SUPPORT.zh-CN.md`: support and issue-routing guidance.
- `.github/ISSUE_TEMPLATE/`: structured bug and feature forms.
- `.github/PULL_REQUEST_TEMPLATE.md`: a review checklist tailored to a financial-planning app.

The forms follow GitHub's YAML issue-form structure. They ask for reproduction details without requesting real financial records and remind reporters to remove identifying data from screenshots.

## 7. Release-readiness checklist

- [ ] Choose and add a project `LICENSE` after confirming the rights holder's intent. Do not infer a license from the bundled ECharts license; third-party licensing does not license the project itself.
- [ ] Create the labels listed above.
- [ ] Confirm `SECURITY.md` points to a reporting channel that maintainers actually monitor. If GitHub private vulnerability reporting is enabled for this repository, direct reports there.
- [ ] Review the privacy statement after every change that introduces network requests, analytics, cloud functions, or persistent storage.
- [ ] Before publishing a release, verify both calculation modes and every chart in WeChat DevTools and on a real device where possible.
- [ ] Add CI only after a repeatable automated check or test suite exists. There is no test runner or CI workflow in the inspected source snapshot, so this package intentionally does not add a misleading green-status badge or a nonfunctional workflow.
- [ ] Enable Discussions only if someone will actively moderate and answer them; otherwise, use Issues and `SUPPORT.md`.
- [ ] Upload a social-preview image once the final visual is ready.

**Important licensing note:** this package intentionally does not create a `LICENSE` file. Choosing a license is a maintainer decision with legal consequences. Until a license is added, do not present reuse, modification, or redistribution permissions as settled.

## 8. Applying the metadata

1. Open the repository on GitHub.
2. In the **About** panel, choose the settings/edit control.
3. Paste the selected description, add the topics, and add a website only if there is a real project site.
4. Open **Settings → Social preview** to upload the finished image.
5. Merge the included files into the repository root and commit them to the default branch so GitHub can discover the community templates.
