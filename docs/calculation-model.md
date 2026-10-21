# Calculation Model and Assumptions

[简体中文](calculation-model.zh-CN.md) · [Project README](../README.md)

This document describes the behavior implemented in `pages/index/index.js`. It is a technical description of the current code, not a claim that the model is financially complete or empirically validated.

## 1. Time horizon and units

The model creates `max(0, targetAge - startingAge)` annual cash-flow rows. Row `i` represents calendar year `currentYear + i` and age `startingAge + i`. The balance series contains the initial balance plus one balance after each modeled year, so its final point corresponds to the target age.

Internally, balance and most annual income/expense values are represented in **CNY 10,000s** (`万元`). Individual inputs use the units shown in the interface:

| Input | Unit |
| --- | --- |
| Initial balance, target balance, starting annual income | CNY 10,000s |
| Utilities, fuel/charging, parking, rent, property fee, pet, custom items | CNY per month |
| Broadband and communications | CNY per year |
| Daily spending | CNY per person per month, multiplied by household count |
| Family support, travel, education, insurance/medical | CNY 10,000s per year |
| Car and mortgage payments | CNY per month |
| Housing fund and social-security amounts | CNY per month |
| Growth, inflation, usable/inclusion ratios | Percent in the UI; converted to decimals internally |

Mixing monthly yuan and annual `万元` is an easy source of input errors. Always follow the on-screen unit labels.

## 2. Annual income

For modeled year index `i`, the source computes:

```text
steps = min(i, max(0, growthYears - 1))
annualIncome(i) = startingAnnualIncome × (1 + incomeGrowthRate)^steps
```

`growthYears` includes the starting year. Income grows by the configured rate until the growth duration is exhausted, then remains flat. The model does not independently inflate income or apply taxes, bonuses, unemployment, or salary volatility.

## 3. Expenses and inflation

The annual expense groups are assembled as follows (all converted to `万元`):

- **A — Fixed costs:** 12 months of utilities, fuel/charging and parking, plus annual broadband/communications.
- **B — Daily spending:** monthly spending per person × household count × 12.
- **C — Annual items:** family support + travel per person × traveler count.
- **D — Car loan:** monthly payment × modeled payment months for a year inside the configured start/end-year interval.
- **E — Housing:** mortgage payment plus rent/property fee. Rent and property fees are treated as inflation-sensitive; mortgage payments are not.
- **F — Other costs:** 12 months of pet costs + annual education + insurance/medical.
- **G — Custom costs:** 12 months of each custom monthly item.

For expense groups A, B, C, F and G, and for rent/property fees in group E, the model applies:

```text
inflationFactor(i) = (1 + annualInflationRate)^i
inflatedExpense(i) = baseExpense × inflationFactor(i)
```

Car and mortgage payments are not inflated. The income model is nominal and does not grow automatically with inflation.

### Loan date behavior

A loan payment is counted only in calendar years between the configured start and end years, inclusive. All included years before the final year count as 12 payments; the final year counts up to the configured end month. There is no start-month control, so the start year is treated as a full payment year. The implementation does not amortize principal and interest separately, model early repayment, or calculate a lender's actual repayment schedule.

## 4. Extra savings offsets

The model can add user-defined portions of housing-fund and social-security contributions to annual savings:

```text
annualHousingFundOffset = monthlyHousingFund × 12 × usableRatio
annualSocialSecurityOffset = monthlySocialSecurity × 12 × retirementInclusionRatio
extraSavings = (annualHousingFundOffset + annualSocialSecurityOffset) / 10,000
```

The configured inflation factor is applied to this extra-savings amount in each modeled year. These ratios are assumptions supplied by the user; they are not calculations of legal eligibility, account ownership, withdrawal rules, pension benefits, or statutory treatment.

The yearly surplus is:

```text
annualSurplus = annualIncome - totalAnnualExpenses + extraSavings
```

A negative surplus is permitted and reduces the modeled balance.

## 5. Balance projection

For annual return `r` and annual surplus `s[i]`, the implementation uses:

```text
balance[0] = initialBalance
balance[i + 1] = balance[i] × (1 + r) + s[i]
```

This convention grows the prior balance for the year and then adds the year's surplus. It is not a monthly contribution model and does not give each year's savings intra-year investment growth. Returns are deterministic: the same rate is applied every year, with no volatility, drawdown, sequence risk, fees, taxes, or rebalancing.

## 6. Calculation modes

### Mode A — solve for the required return

A binary search repeatedly projects the ending balance and narrows the rate interval until the interval width is below `1e-7`, or the maximum iteration count is reached. The search interval is **−0.50 to +1.00** (−50% through +100%) per year.

Special cases in the code:

- A target at or below zero returns a rate of zero.
- If the initial balance already meets/exceeds the target and every projected annual surplus is non-negative, the solver returns zero.
- The solver is bounded. A displayed boundary result should not be interpreted as proof that the target is attainable under the chosen assumptions.

The interface's inflation-adjusted rate annotation uses the simple approximation `nominalRate - inflationRate`, not the exact Fisher relation. Treat it as an indicative label only.

### Mode B — project the final balance

The main annual return is taken from a slider ranging from 0% to 15%. The app calculates the ending balance using that rate and can add comparison curves for 3%, 5%, 7%, 10%, and 12% when selected.

The displayed “today's purchasing power” is estimated by dividing the projected final balance by `(1 + inflationRate)^years`. This adjusts the nominal final balance with the selected inflation assumption; it does not model category-specific changes in lifestyle, taxes, or asset returns.

## 7. Planning score and peer percentile

The source calculates a score capped between 0 and 100 across five dimensions:

| Dimension | Maximum |
| --- | ---: |
| Savings rate | 25 |
| Return feasibility | 25 |
| Income-growth assumptions | 20 |
| Expense profile | 15 |
| Target size relative to starting annual income | 15 |

The score uses fixed threshold rules in source code. Text insights identify the strongest and weakest normalized dimensions and select a preset suggestion. The peer percentile is calculated from hard-coded age-band means and standard deviations using an approximate normal cumulative distribution function.

Important caveats:

- The percentile is **not** calculated from a live or cited survey, bank dataset, or representative cohort.
- Score sub-calculations use a simplified current expense estimate and need not be identical to the detailed year-by-year cash-flow model. For example, the helper used in score calculation does not include car-loan payments.
- A high score or percentile must not be interpreted as a guarantee of financial independence or as a validated comparison with real peers.

## 8. Assumptions and omissions

The current model does not explicitly include:

- income tax, social-insurance deductions from take-home pay, or changing tax rules;
- investment fees, transaction costs, tax on investment returns, or portfolio volatility;
- asset allocation, dividend/coupon schedules, cash drag, rebalancing, and sequence-of-returns risk;
- irregular income, unemployment, major unexpected expenses, or changing household composition;
- a full mortgage/car-loan amortization schedule, early repayment, or intra-year cash-flow dates;
- a separate post-retirement spending and withdrawal phase;
- empirical validation of the score or peer-comparison assumptions.

Use FIRE to ask “what happens if these assumptions hold?” rather than “what will happen?”. Prefer conservative scenarios and stress-test important inputs.
