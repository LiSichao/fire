# Contributing to FIRE

[简体中文](CONTRIBUTING.zh-CN.md) · [Project README](README.md)

Thanks for considering a contribution. Clear, narrowly scoped changes and reproducible reports make this project easier to maintain.

## Before opening an issue

- Search existing [issues](https://github.com/LiSichao/fire/issues) to avoid duplicates.
- For calculation questions, include a minimal example with synthetic values, the selected mode, relevant assumptions, the observed result, and the result you expected.
- Do not share real financial records, personal identifiers, AppIDs, credentials, or private device information.

## Development setup

1. Install WeChat DevTools.
2. Import the repository root (the directory containing `app.json`).
3. Configure your own development AppID if needed.
4. Make and verify changes in the simulator; use a real device for rendering or touch behavior that the simulator may not represent accurately.

The current repository does not provide a package-manager manifest, automated test runner, or CI workflow. Do not document commands that are not present in the tree. When practical, propose automated tests alongside changes to the calculation engine.

## Suggested validation checklist

- Both calculation modes work with representative inputs.
- Income growth duration, inflation, loan years/end months, custom expenses, and extra-savings ratios are checked.
- Comparison-rate toggles update the balance chart correctly.
- All four charts still render after repeated input changes and Reset All.
- No unexpected network requests or persistence behavior was introduced.
- Documentation reflects any changes to formulas, units, privacy behavior, or known limitations.

## Pull request guidelines

- Explain the user-visible behavior or defect being addressed.
- Keep pull requests focused; separate unrelated refactors where possible.
- Describe the assumptions used to reproduce a calculation issue.
- Include screenshots only when UI changes need visual review, and use synthetic example data.
- Call out any behavior change that could affect previous calculations.
- Preserve third-party license/copyright notices when updating bundled libraries.

## Documentation and language

Update both `README.md` and `README.zh-CN.md` when changing the product's public behavior. Update both calculation-model guides whenever formulas, units, date handling, scoring, or assumptions change. Keep the two languages semantically aligned; do not translate a heuristic into a factual promise.

## Contribution license and project license

The repository snapshot reviewed for this guide does not contain a project `LICENSE` file. The maintainer should choose and add a license before granting clear reuse, modification, and redistribution permissions. Do not assume that the presence of a public GitHub repository means the code is licensed for arbitrary reuse.
