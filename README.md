# FIRE — Financial Independence, Retire Early Planner

**Explore your path to financial freedom.** FIRE (Financial Independence, Retire Early) is a client-side WeChat Mini Program for modeling income, expenses, savings, inflation, and investment-return scenarios.

[简体中文](README.zh-CN.md) · [Calculation model](docs/calculation-model.md) · [Contributing](CONTRIBUTING.md) · [Code of Conduct](CODE_OF_CONDUCT.md) · [Security policy](SECURITY.md) · [Support](SUPPORT.md) · [License](LICENSE) · [Repository setup](GITHUB_REPOSITORY_SETUP.md)

> **Important:** FIRE is an educational planning tool, not a financial product, investment recommendation, tax calculator, pension calculator, or guarantee of future results. Its outputs depend on user-entered assumptions and simplified annual calculations.

## Overview

FIRE helps users turn a long-term financial goal into an editable annual cash-flow scenario. Set an age range, starting assets, income trajectory, inflation, housing and lifestyle costs, loan periods, and selected housing-fund/social-security assumptions. The app recalculates locally and visualizes how different annual return assumptions affect the projected balance.

### Features

- **Two calculation modes**
  - **Solve for return:** enter a target balance and estimate the annual return required under the current cash-flow assumptions.
  - **Project a balance:** choose an annual return and estimate the balance at the target age.
- **Editable annual cash-flow model:** income growth, inflation, household spending, annual expenses, car loans, mortgages, rent, and property fees.
- **Eight expense groups (A–H), plus planning inputs:** basic assumptions, income, inflation, fixed costs, daily spending, annual items, loans, housing, other costs, custom categories, and optional housing-fund/social-security offsets.
- **Ten presets:** example scenarios for an early-career worker, a young professional saving for a down payment, a DINK household, family planning, parents with children, a mortgage-heavy household, mid-career transition, a two-child household, a senior executive, and pre-retirement planning.
- **Four charts:** annual income versus expenses, expense composition, projected balance under one or more return assumptions, and annual surplus breakdown.
- **Return comparisons:** compare the primary assumption with selectable 3%, 5%, 7%, 10%, and 12% annual-return scenarios.
- **A heuristic 0–100 planning score:** savings rate, target feasibility, income-growth assumptions, expense profile, and target size are summarized, with a model-based age-band percentile estimate.
- **Fast feedback:** input changes are debounced before recalculation; no server is needed for the core calculation.

The presets and score are convenience features, not evidence that any particular target or return is achievable.

## Quick start

### Requirements

- [WeChat DevTools](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- A WeChat Mini Program AppID, or an available test-app option in DevTools
- The repository source code

The repository config currently sets the Mini Program base-library version to `3.17.0` and leaves the AppID empty in `project.config.json`. Use the AppID and developer configuration appropriate for your own environment.

### Run locally

1. Clone or download this repository:

   ```bash
   git clone https://github.com/LiSichao/fire.git
   cd fire
   ```

2. Open WeChat DevTools.
3. Choose **Import Project** and select the repository root—the directory containing `app.json` and `project.config.json`.
4. Configure your AppID in DevTools if required by your environment.
5. Compile and run the Mini Program in the simulator. Verify behavior on a real device before relying on platform-specific rendering or touch interactions.

The current source tree does not include a `package.json`, a Node-based build script, or a separate backend service. The chart bundle is included under `components/ec-canvas/`; no separate service needs to be started for the current implementation.

## How to use it

1. **Start with a preset** to see a complete sample scenario, or enter your own assumptions.
2. **Set the time horizon** by entering a starting age and a target age greater than the starting age.
3. **Enter income and expenses.** Pay attention to the unit labels: some fields are monthly yuan, while others are ten-thousand yuan per year.
4. **Choose a calculation mode.** In return-solving mode, set a target balance. In balance-projection mode, choose the main annual return and optionally enable comparison rates.
5. **Review both headline cards and all four charts.** A plausible-looking chart is not proof that the assumptions are realistic.
6. **Change one assumption at a time** to compare scenarios. Use **Reset All** to restore the default input values.

For definitions, formulas, and model limitations, read [Calculation model and assumptions](docs/calculation-model.md).

## Inputs at a glance

| Section | Inputs | Notes |
| --- | --- | --- |
| Basic | Starting age, target age, initial balance, target balance | Initial and target balances are in CNY 10,000s (`万元`). |
| Income | Starting annual income, annual growth rate, growth duration | Income is modeled annually; growth stops after the configured duration. |
| Inflation | Annual inflation rate | Applied to selected expense categories and the modeled extra-savings offset, not to income or loan repayments. |
| A — Fixed costs | Utilities, fuel/charging, parking, broadband/communications | Monthly yuan for the first three; annual yuan for broadband/communications. |
| B — Daily spending | Monthly spending per person and household count | Monthly yuan. |
| C — Annual items | Family support, travel per person, traveler count | Annual amounts in `万元`. |
| D — Car loan | Monthly payment, start year, end year, end month | No start-month field is available; the start year is modeled as a full payment year. |
| E — Housing | Mortgage payment and dates, rent, property fee | Mortgage payments are modeled by year; rent and property fees rise with modeled inflation. |
| F — Other costs | Pet expenses, education, insurance/medical | Pet costs are monthly yuan; education and insurance/medical are annual `万元`. |
| G — Custom | Two named monthly expense items | Monthly yuan per item. |
| H — Housing fund/social security | Monthly contribution amounts and usable/inclusion percentages | User-selected proportions are counted as an additional annual-savings offset; they are not a statutory benefit calculation. |

## Calculation model

The implementation builds one row per modeled year. In simplified form:

```text
annual surplus = annual income - modeled annual expenses + modeled extra savings
ending balance = prior balance × (1 + annual return) + annual surplus
```

- **Return-solving mode** uses a binary search over an annual-return interval of **−50% to +100%** to find a rate whose projected ending balance approaches the target.
- **Balance-projection mode** applies the selected annual return to the prior balance and then adds that year's modeled surplus.
- **Inflation** increases selected expense categories by `(1 + inflation rate)^year_index`.
- **Heuristic score and peer percentile** use fixed rules and hard-coded age-band distribution parameters in the source. They are not based on a live, cited, or independently validated population dataset.

These simplifications intentionally make the app responsive and easy to explore, but they omit many real-world factors. See the [full model guide](docs/calculation-model.md) before interpreting results.

## Project structure

```text
fire/
├── app.js                         # Mini Program lifecycle and global data
├── app.json                       # App-level page and window configuration
├── app.wxss                       # Global styles
├── project.config.json            # DevTools project settings
├── sitemap.json                  # Mini Program sitemap configuration
├── pages/
│   └── index/
│       ├── index.js               # Inputs, cash-flow engine, scoring, charts
│       ├── index.json             # Page configuration and component registration
│       ├── index.wxml             # Page UI
│       └── index.wxss             # Page styles
└── components/
    └── ec-canvas/
        ├── ec-canvas.js           # ECharts Canvas adapter component
        ├── ec-canvas.json         # Component configuration
        ├── ec-canvas.wxml         # Canvas markup
        ├── ec-canvas.wxss         # Canvas styles
        ├── wx-canvas.js           # WeChat Canvas compatibility adapter
        └── echarts.js              # Bundled ECharts runtime
```

## Privacy and data handling

The calculation and page code contains no custom backend, `wx.request`, or `wx.cloud` calls. Inputs are saved on the device with `wx.setStorageSync` (key `fire_params`, schema version 1) and restored on launch, so a scenario survives closing and reopening the Mini Program. Nothing is uploaded to any server.

The stored record holds the input values, the selected calculation mode, the section expand state, and the last applied preset. **Reset All** overwrites it with default values; clearing the Mini Program's storage or uninstalling the app removes it as well. Data does not sync across devices.

This is a statement about the repository code reviewed, not a guarantee about data handling by WeChat or the device platform itself. Review WeChat's own privacy terms and your Mini Program configuration separately.

## Development and testing

There is no automated test runner or CI workflow in the current source tree. Until automated checks are added, manually validate changes in WeChat DevTools:

- Load all ten presets and confirm values render without errors.
- Test both calculation modes with representative positive, zero, and negative annual surpluses.
- Test target ages, loan start/end years, end-month boundaries, inflation, and custom expense labels.
- Enable and disable each comparison rate and verify the balance chart updates.
- Verify all four charts after repeated edits and after Reset All.
- Check layout and touch interactions in the simulator and on a real device.
- Confirm that changes have not introduced network calls or persistent storage without updating the privacy documentation.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the contribution workflow.

## Limitations and interpretation

- Results are scenarios, not forecasts. Income, spending, inflation, and investment returns may differ substantially from assumptions.
- The model operates annually; it does not simulate intra-year timing, taxes, portfolio volatility, investment fees, asset allocation, or withdrawal strategy.
- Loan modeling has limited date granularity and does not model amortization details or early repayment.
- Housing-fund and social-security inputs are simple user-defined offsets, not calculations of eligibility, balances, benefits, or legal entitlements.
- The financial-freedom score and peer percentile are heuristic indicators, not validated financial-health metrics or representative statistics.
- Return-solving is bounded to −50% through +100%; extreme or infeasible input combinations may not produce a meaningful interpretation at the boundary.

## Contributing, security, and support

- [Contributing guide](CONTRIBUTING.md)
- [Security policy](SECURITY.md)
- [Open an issue](https://github.com/LiSichao/fire/issues)
- [Support guide](SUPPORT.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)

Please avoid posting real personal financial data, credentials, or sensitive device information in issues or screenshots.

## License

Project-owned code in this repository is licensed under the [MIT License](LICENSE), subject to any file-specific notices. Third-party code, bundled dependencies, and other assets retain their respective licenses; the root MIT license does not relicense third-party materials.

## Third-party notices

The repository includes a custom Apache ECharts 6.1.0 build under `components/ec-canvas/echarts.js`, licensed under Apache License 2.0. The bundle contains only the modules this project uses: `BarChart`, `LineChart`, `GridComponent`, `TooltipComponent`, `LegendComponent`, and `CanvasRenderer`. It was produced with esbuild from the npm package; to regenerate it, bundle those modules from `echarts/core` and re-export `init`, `setPlatformAPI`, `registerPreprocessor`, `use`, and `version`. Preserve the license header when changing or redistributing the bundle.
