// pages/index/index.js
import * as echarts from '../../components/ec-canvas/echarts';

// 颜色常量
const COLORS = {
  income: '#10B981',
  expense: '#EF4444',
  expA: '#3B82F6',
  expB: '#F59E0B',
  expC: '#8B5CF6',
  expD: '#EF4444',
  expE: '#0EA5E9',
  expF: '#EC4899',
  expG: '#14B8A6',
  savings: '#059669',
  indigo: '#6366F1',
  target: '#DC2626',
};

const COMPARE_LINE_COLORS = ['#94A3B8', '#A78BFA', '#FB923C', '#06B6D4', '#84CC16'];

const CURRENT_YEAR = new Date().getFullYear();

// 同龄人分布数据
const PEER_DISTRIBUTION = {
  '22-25': { mean: 45, stdDev: 18 },
  '26-30': { mean: 50, stdDev: 16 },
  '31-35': { mean: 55, stdDev: 15 },
  '36-40': { mean: 55, stdDev: 14 },
  '41-45': { mean: 52, stdDev: 14 },
  '46-50': { mean: 50, stdDev: 15 },
  '51-55': { mean: 48, stdDev: 16 },
  '55+': { mean: 45, stdDev: 18 },
};

// 预设场景
const PRESETS = {
  freshgrad: {
    key: 'freshgrad',
    label: '🎓 22岁应届生·一线起步',
    description: '月薪8k，租房通勤，想35岁不被迫上班',
    startAge: 22, endAge: 35, initial: 2, target: 100,
    incomeStart: 9.6, growthRate: 15, growthYears: 5,
    utilities: 200, charging: 100, parking: 0, broadband: 1000,
    dailyPerPerson: 5000, dailyPersons: 1,
    filial: 0, travelPerPerson: 1, travelPersons: 1,
    rent: 3000, propertyFee: 0,
    petMonthly: 0, education: 0, insurance: 0.3,
  },
  junior: {
    key: 'junior',
    label: '💼 25岁初入职场·攒首付',
    description: '二线城市单身，目标30岁付50万首付',
    startAge: 25, endAge: 31, initial: 10, target: 50,
    incomeStart: 18, growthRate: 10, growthYears: 4,
    utilities: 250, charging: 150, parking: 200, broadband: 1200,
    dailyPerPerson: 4500, dailyPersons: 1,
    filial: 0.5, travelPerPerson: 1.5, travelPersons: 1,
    rent: 2800, propertyFee: 0,
    petMonthly: 0, education: 0, insurance: 0.5,
  },
  dink: {
    key: 'dink',
    label: '💑 28岁筹备婚礼·DINK',
    description: '双职工合计月入3w，准备结婚买房',
    startAge: 28, endAge: 36, initial: 50, target: 260,
    incomeStart: 42, growthRate: 8, growthYears: 5,
    utilities: 400, charging: 300, parking: 400, broadband: 2000,
    dailyPerPerson: 4200, dailyPersons: 2,
    filial: 2, travelPerPerson: 2.5, travelPersons: 2,
    rent: 4500, propertyFee: 0,
    petMonthly: 0, education: 0, insurance: 1.2,
  },
  prebaby: {
    key: 'prebaby',
    label: '🍼 30岁备孕·育儿前夜',
    description: '准备一胎，评估育儿成本',
    startAge: 30, endAge: 42, initial: 80, target: 420,
    incomeStart: 48, growthRate: 6, growthYears: 5,
    utilities: 400, charging: 300, parking: 400, broadband: 2000,
    dailyPerPerson: 5200, dailyPersons: 2,
    filial: 2, travelPerPerson: 2, travelPersons: 2,
    mortgageMonthly: 8000, mortgageStartYear: CURRENT_YEAR, mortgageEndYear: CURRENT_YEAR + 25, mortgageEndMonth: 12,
    rent: 0, propertyFee: 500,
    petMonthly: 0, education: 0, insurance: 1.5,
  },
  parent33: {
    key: 'parent33',
    label: '👶 33岁有娃·育儿压力',
    description: '一线城市育儿，目标50岁财务自由',
    startAge: 33, endAge: 50, initial: 120, target: 700,
    incomeStart: 60, growthRate: 5, growthYears: 5,
    utilities: 500, charging: 400, parking: 500, broadband: 2400,
    dailyPerPerson: 5500, dailyPersons: 3,
    filial: 2.5, travelPerPerson: 2, travelPersons: 3,
    mortgageMonthly: 10000, mortgageStartYear: CURRENT_YEAR - 3, mortgageEndYear: CURRENT_YEAR + 22, mortgageEndMonth: 12,
    rent: 0, propertyFee: 600, education: 3, insurance: 2,
  },
  mortgage35: {
    key: 'mortgage35',
    label: '🏠 35岁房贷重担·月供1.5w',
    description: '兼顾娃和退休',
    startAge: 35, endAge: 55, initial: 150, target: 650,
    incomeStart: 66, growthRate: 4, growthYears: 5,
    utilities: 500, charging: 400, parking: 500, broadband: 2400,
    dailyPerPerson: 6200, dailyPersons: 3,
    filial: 3, travelPerPerson: 2, travelPersons: 3,
    mortgageMonthly: 13000, mortgageStartYear: CURRENT_YEAR - 5, mortgageEndYear: CURRENT_YEAR + 20, mortgageEndMonth: 12,
    rent: 0, propertyFee: 800, education: 4, insurance: 2,
  },
  transition36: {
    key: 'transition36',
    label: '🚀 36岁中年转型·副业筹划',
    description: '想46岁前实现职业自主',
    startAge: 36, endAge: 46, initial: 100, target: 500,
    incomeStart: 17.5, growthRate: 3, growthYears: 10,
    utilities: 100, charging: 0, parking: 0, broadband: 1200,
    dailyPerPerson: 2000, dailyPersons: 1,
    filial: 1, travelPerPerson: 1, travelPersons: 1,
    rent: 0, propertyFee: 450, education: 0, insurance: 0,
  },
  parent42: {
    key: 'parent42',
    label: '👨‍👩‍👧‍👦 42岁双娃父母·教育金压力',
    description: '教育 + 自我养老双重压力',
    startAge: 42, endAge: 57, initial: 300, target: 1000,
    incomeStart: 78, growthRate: 3, growthYears: 5,
    utilities: 600, charging: 500, parking: 600, broadband: 2400,
    dailyPerPerson: 6800, dailyPersons: 4,
    filial: 4, travelPerPerson: 2.5, travelPersons: 4,
    mortgageMonthly: 9000, mortgageStartYear: CURRENT_YEAR - 10, mortgageEndYear: CURRENT_YEAR + 12, mortgageEndMonth: 12,
    rent: 0, propertyFee: 800, education: 5, insurance: 3,
  },
  exec48: {
    key: 'exec48',
    label: '💎 48岁高管·收入高峰',
    description: '想55岁全身而退',
    startAge: 48, endAge: 56, initial: 800, target: 1500,
    incomeStart: 132, growthRate: 5, growthYears: 3,
    utilities: 700, charging: 600, parking: 800, broadband: 3000,
    dailyPerPerson: 9500, dailyPersons: 2,
    filial: 5, travelPerPerson: 5, travelPersons: 3,
    mortgageMonthly: 0, rent: 0, propertyFee: 1000, education: 4, insurance: 4,
  },
  preretire52: {
    key: 'preretire52',
    label: '🎯 52岁临退休·最后冲刺',
    description: '还有8年，最大化养老积累',
    startAge: 52, endAge: 60, initial: 400, target: 800,
    incomeStart: 48, growthRate: 0, growthYears: 1,
    utilities: 600, charging: 400, parking: 600, broadband: 2400,
    dailyPerPerson: 8000, dailyPersons: 2,
    filial: 4, travelPerPerson: 3, travelPersons: 2,
    mortgageMonthly: 0, rent: 0, propertyFee: 800, education: 0, insurance: 3,
  },
};

// 格式化金额（万元）
function formatMoney(w) {
  if (!isFinite(w)) return '—';
  const isNeg = w < 0;
  const abs = Math.abs(w);
  let str;
  if (abs >= 10000) {
    str = (abs / 10000).toFixed(2) + ' 亿';
  } else if (abs >= 100) {
    str = abs.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'w';
  } else {
    str = abs.toFixed(1) + 'w';
  }
  return isNeg ? '亏损 ' + str : str;
}

// 评估收益率等级
function assessRate(rate) {
  const r = rate * 100;
  if (r < 0) return { level: '已超达', badge: 'level-green', emoji: '🎉', hint: '当前本金贡献已超过目标，无需依赖投资增值，可考虑提高生活质量或调高目标' };
  if (r < 3) return { level: '极容易', badge: 'level-green', emoji: '🟢', hint: '货基/银行理财即可达成，目标定得保守，可以更野心一点' };
  if (r < 6) return { level: '适中', badge: 'level-green', emoji: '🟢', hint: '国债/股债平衡型可达，比较稳健的目标' };
  if (r < 10) return { level: '有挑战', badge: 'level-yellow', emoji: '🟡', hint: '略高于股市长期平均（7-8%），需要积极的资产配置，考虑增加权益类占比' };
  if (r < 15) return { level: '困难', badge: 'level-orange', emoji: '🟠', hint: '需要较强的投资能力 + 风险承受度，建议同步降低目标或延长达成年限' };
  if (r < 25) return { level: '极难', badge: 'level-red', emoji: '🔴', hint: '仅顶级投资者长期可达，强烈建议调整：降目标 / 延后年龄 / 增收 / 降支' };
  return { level: '不现实', badge: 'level-red', emoji: '❌', hint: '当前现金流无法支撑目标，需要根本性调整规划' };
}

// 正态分布累积概率
function normCdf(z) {
  if (z === 0) return 0.5;
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp(-z * z / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z > 0 ? 1 - p : p;
}

// 获取年龄段
function getAgeBand(age) {
  if (age < 26) return '22-25';
  if (age < 31) return '26-30';
  if (age < 36) return '31-35';
  if (age < 41) return '36-40';
  if (age < 46) return '41-45';
  if (age < 51) return '46-50';
  if (age < 56) return '51-55';
  return '55+';
}

function getAgeBandLabel(age) {
  return getAgeBand(age) + ' 岁组';
}

// 同龄人对比
function comparePeers(score, age) {
  const band = getAgeBand(age);
  const dist = PEER_DISTRIBUTION[band] || PEER_DISTRIBUTION['26-30'];
  const z = (score - dist.mean) / dist.stdDev;
  const percentile = Math.round(normCdf(z) * 100);
  return Math.max(1, Math.min(99, percentile));
}

// 评分函数
function scoreSavingsRate(income, expense) {
  if (income <= 0) return 0;
  const rate = (income - expense) / income;
  if (rate >= 0.5) return 25;
  if (rate >= 0.4) return 22;
  if (rate >= 0.3) return 18;
  if (rate >= 0.2) return 14;
  if (rate >= 0.1) return 8;
  if (rate >= 0) return 4;
  return 0;
}

function scoreFeasibility(requiredRate) {
  const r = requiredRate * 100;
  if (r < 0) return 25;
  if (r < 3) return 25;
  if (r < 6) return 23;
  if (r < 9) return 20;
  if (r < 12) return 15;
  if (r < 15) return 10;
  if (r < 20) return 5;
  return 0;
}

function scoreGrowth(age, growthRatePct) {
  const g = growthRatePct;
  if (age < 30) {
    if (g >= 12) return 20;
    if (g >= 8) return 17;
    if (g >= 5) return 13;
    return 8;
  }
  if (age < 45) {
    if (g >= 8) return 18;
    if (g >= 5) return 15;
    if (g >= 3) return 10;
    return 5;
  }
  if (g >= 5) return 14;
  if (g >= 3) return 10;
  if (g >= 1) return 6;
  return 3;
}

function scoreExpenseHealth(income, expense, mortgageMonthly) {
  if (income <= 0) return 0;
  const expenseRatio = expense / income;
  const mortgageRatio = mortgageMonthly / income;
  let score = 0;
  if (expenseRatio < 0.5) score += 10;
  else if (expenseRatio < 0.7) score += 7;
  else if (expenseRatio < 0.9) score += 3;
  if (mortgageRatio === 0) score += 5;
  else if (mortgageRatio < 0.3) score += 5;
  else if (mortgageRatio < 0.4) score += 3;
  else if (mortgageRatio < 0.5) score += 1;
  return score;
}

function scoreAmbition(target, annualIncome) {
  if (annualIncome <= 0) return 0;
  const ratio = target / annualIncome;
  if (ratio >= 10 && ratio <= 20) return 15;
  if (ratio >= 5 && ratio < 10) return 12;
  if (ratio > 20 && ratio <= 30) return 10;
  if (ratio >= 3 && ratio < 5) return 8;
  if (ratio > 30 && ratio <= 50) return 6;
  if (ratio >= 1 && ratio < 3) return 5;
  if (ratio > 50) return 3;
  return 0;
}

function estimateMonthlyExpense(p) {
  const annualWan = (p.utilities + p.charging + p.parking + p.propertyFee + p.petMonthly) * 12 / 10000
    + p.broadband / 10000
    + p.filial + (p.travelPerPerson * p.travelPersons)
    + p.education + p.insurance
    + (p.custom1Amount + p.custom2Amount) * 12 / 10000;
  return p.dailyPerPerson * p.dailyPersons + p.mortgageMonthly + p.rent + annualWan * 10000 / 12;
}

// 计算额外储蓄基数（公积金可用 + 社保转养老金），单位：万元/年
function computeExtraSavingsBase(p) {
  const hf = p.housingFundMonthly;
  const ss = p.socialSecurityMonthly;
  const annualHF = hf * 12 / 10000 * (p.housingFundUsableRate || 0);
  const annualSS = ss * 12 / 10000 * (p.socialToRetirementRate || 0);
  return annualHF + annualSS;
}

// 计算第i年的收入（万元）
function computeYearIncome(p, i) {
  const steps = Math.min(i, Math.max(0, p.growthYears - 1));
  return p.incomeStart * Math.pow(1 + p.growthRate, steps);
}

// 计算贷款年度成本（万元）
function computeLoanCost(year, startY, endY, endM, monthly) {
  if (!monthly || year < startY || year > endY) return 0;
  const months = (year === endY) ? Math.min(12, Math.max(0, endM)) : 12;
  return monthly * months / 10000;
}

// 构建现金流
function buildCashflow(p) {
  const years = Math.max(0, p.endAge - p.startAge);
  const baseYear = CURRENT_YEAR;
  const inflation = p.inflationRate || 0;

  const A_base = (p.utilities + p.charging + p.parking) * 12 / 10000 + p.broadband / 10000;
  const B_base = p.dailyPerPerson * p.dailyPersons * 12 / 10000;
  const C_base = p.filial + p.travelPerPerson * p.travelPersons;
  const F_base = p.petMonthly * 12 / 10000 + p.education + p.insurance;
  const G_base = (p.custom1Amount + p.custom2Amount) * 12 / 10000;
  const E_rentBase = (p.rent + p.propertyFee) * 12 / 10000;
  const extraSavingsBase = computeExtraSavingsBase(p);

  const rows = [];
  for (let i = 0; i < years; i++) {
    const year = baseYear + i;
    const age = p.startAge + i;
    const inflFactor = Math.pow(1 + inflation, i);

    const income = computeYearIncome(p, i);
    const A = A_base * inflFactor;
    const B = B_base * inflFactor;
    const C = C_base * inflFactor;
    const F = F_base * inflFactor;
    const G = G_base * inflFactor;
    const D = computeLoanCost(year, p.carStartYear, p.carEndYear, p.carEndMonth, p.carMonthly);
    const mortgageCost = computeLoanCost(year, p.mortgageStartYear, p.mortgageEndYear, p.mortgageEndMonth, p.mortgageMonthly);
    const E = mortgageCost + E_rentBase * inflFactor;
    const totalExpense = A + B + C + D + E + F + G;
    const extraSavings = extraSavingsBase * inflFactor;
    const savings = income - totalExpense + extraSavings;

    rows.push({ year, age, income, A, B, C, D, E, F, G, totalExpense, savings, extraSavings, inflFactor });
  }
  return rows;
}

// 复利模拟
function simulateGrowth(savingsArr, r, initial) {
  const balances = [initial];
  let bal = initial;
  for (const s of savingsArr) {
    bal = bal * (1 + r) + s;
    balances.push(bal);
  }
  return balances;
}

// 二分法求解收益率
function solveRate(savingsArr, initial, target) {
  if (target <= 0) return 0;
  if (initial >= target && savingsArr.every(s => s >= 0)) return 0;
  let lo = -0.5, hi = 1.0;
  for (let i = 0; i < 100; i++) {
    const mid = (lo + hi) / 2;
    const final = simulateGrowth(savingsArr, mid, initial).slice(-1)[0];
    if (final < target) lo = mid; else hi = mid;
    if (Math.abs(hi - lo) < 1e-7) break;
  }
  return (lo + hi) / 2;
}

// 计算财务自由指数
function calculateFreedomIndex(params, result) {
  const annualIncome = params.incomeStart;
  const weightedGrowth = params.growthRate;
  const monthlyIncome = annualIncome * 10000 / 12;
  const monthlyExpense = estimateMonthlyExpense(params);
  const extraMonthlySavings = computeExtraSavingsBase(params) * 10000 / 12;

  const baseSavings = monthlyIncome - monthlyExpense;
  const enhancedSavings = baseSavings + extraMonthlySavings;
  const enhancedIncome = monthlyIncome;

  const s1 = scoreSavingsRate(enhancedIncome, enhancedIncome - enhancedSavings);
  const s2 = scoreFeasibility(result.requiredRate);
  const s3 = scoreGrowth(params.startAge, weightedGrowth * 100);
  const s4 = scoreExpenseHealth(monthlyIncome, monthlyExpense, params.mortgageMonthly);
  const s5 = scoreAmbition(params.target, annualIncome);

  return {
    total: Math.max(0, Math.min(100, Math.round(s1 + s2 + s3 + s4 + s5))),
    breakdown: { s1: s1, s2: s2, s3: s3, s4: s4, s5: s5 },
    monthlyIncome: monthlyIncome,
    monthlyExpense: monthlyExpense,
  };
}

const STRENGTH_HINTS = {
  s1: '储蓄率高于平均，存钱能力强',
  s2: '目标定得合理，达成路径清晰',
  s3: '年龄优势 + 收入增长潜力大',
  s4: '支出结构健康，没有过度负债',
  s5: '目标设定恰到好处',
};

const WEAKNESS_HINTS = {
  s1: '储蓄率偏低，每月攒不下太多钱',
  s2: '所需收益率偏高，目标有难度',
  s3: '收入增长空间有限',
  s4: '支出占比过高，可能有房贷压力',
  s5: '目标偏离合理区间（过低/过高）',
};

const ADVICE_HINTS = {
  s1: '试着把月支出降低 10-15%，或寻找增收渠道',
  s2: '考虑延长达成年限，或适度降低目标存款',
  s3: '关注职业晋升 / 副业发展 / 技能升级',
  s4: '检查房贷占比是否超过收入 35%，必要时考虑置换',
  s5: '调整目标到年收入的 10-20 倍',
};

// 总分等级
function scoreLevel(total) {
  if (total >= 85) return { text: '🟢 优秀', tone: 'green', badgeClass: 'level-green' };
  if (total >= 70) return { text: '🟢 良好', tone: 'green', badgeClass: 'level-green' };
  if (total >= 55) return { text: '🟡 中等', tone: 'yellow', badgeClass: 'level-yellow' };
  if (total >= 40) return { text: '🟠 偏弱', tone: 'orange', badgeClass: 'level-orange' };
  return { text: '🔴 待改善', tone: 'red', badgeClass: 'level-red' };
}

// 单维度配色
function dimTone(score, max) {
  const ratio = max > 0 ? score / max : 0;
  if (ratio >= 0.75) return 'green';
  if (ratio >= 0.5) return 'yellow';
  if (ratio >= 0.25) return 'orange';
  return 'red';
}

function generateInsights(breakdown) {
  const dimensions = [
    { key: 's1', max: 25, score: breakdown.s1 },
    { key: 's2', max: 25, score: breakdown.s2 },
    { key: 's3', max: 20, score: breakdown.s3 },
    { key: 's4', max: 15, score: breakdown.s4 },
    { key: 's5', max: 15, score: breakdown.s5 },
  ];
  const best = dimensions.reduce(function(a, b) { return (a.score / a.max) > (b.score / b.max) ? a : b; });
  const worst = dimensions.reduce(function(a, b) { return (a.score / a.max) < (b.score / b.max) ? a : b; });
  return {
    strength: STRENGTH_HINTS[best.key],
    weakness: WEAKNESS_HINTS[worst.key],
    advice: ADVICE_HINTS[worst.key],
  };
}

Page({
  data: {
    // 模式
    currentMode: 'A',
    currentPreset: '',
    
    // 折叠面板状态
    sections: {
      base: true,
      income: true,
      inflation: true,
      expA: false,
      expB: false,
      expC: false,
      expD: false,
      expE: false,
      expF: false,
      expG: false,
      expH: false,
    },

    // 参数
    params: {
      startAge: 25,
      endAge: 45,
      initial: 0,
      target: 0,
      mainRate: 0,
      compareRates: {},
      incomeStart: 0,
      growthRate: 0,
      growthYears: 1,
      inflationRate: 3,
      utilities: 0,
      charging: 0,
      parking: 0,
      broadband: 0,
      dailyPerPerson: 0,
      dailyPersons: 2,
      filial: 0,
      travelPerPerson: 0,
      travelPersons: 2,
      carMonthly: 0,
      carStartYear: CURRENT_YEAR,
      carEndYear: CURRENT_YEAR,
      carEndMonth: 12,
      mortgageMonthly: 0,
      mortgageStartYear: CURRENT_YEAR,
      mortgageEndYear: CURRENT_YEAR,
      mortgageEndMonth: 12,
      rent: 0,
      propertyFee: 0,
      petMonthly: 0,
      education: 0,
      insurance: 0,
      custom1Name: '',
      custom1Amount: 0,
      custom2Name: '',
      custom2Amount: 0,
      housingFundMonthly: 0,
      housingFundUsableRate: 70,
      socialSecurityMonthly: 0,
      socialToRetirementRate: 0,
    },

    // 预设列表
    presets: [],
    compareRateOptions: [
      { value: '3' },
      { value: '5' },
      { value: '7' },
      { value: '10' },
      { value: '12' },
    ],

    // 结果展示
    hasResult: false,
    mainTitle: '推算收益率 · 看需要多少%',
    timeline: '请填入参数或加载示例',
    card1Label: '所需年化收益率',
    card1Value: '—',
    card1Color: 'indigo',
    card1BadgeShow: false,
    card1BadgeClass: '',
    card1BadgeText: '',
    card1Sub: '',
    card2Label: '投资需要赚多少？',
    card2Value: '—',
    card2Color: 'gray',
    card2BadgeShow: false,
    card2BadgeClass: '',
    card2BadgeText: '',
    card2Sub: '',

    // ECharts 配置
    ecChart1: { lazyLoad: true },
    ecChart2: { lazyLoad: true },
    ecChart3: { lazyLoad: true },
    ecChart4: { lazyLoad: true },

    // 财务自由指数
    freedom: {
      show: false,
      score: 0,
      percentile: 0,
      ageBand: '',
      tone: 'gray',
      badgeClass: 'level-gray',
      levelText: '',
      dims: [],
      strength: '',
      weakness: '',
      advice: '',
    },
  },

  onLoad() {
    // 初始化预设列表
    const presetList = Object.values(PRESETS).map(p => ({
      key: p.key,
      label: p.label,
    }));
    this.setData({ presets: presetList });
    
    // 防抖定时器
    this._recalcTimer = null;
    // 图表实例缓存（每个 canvas 只 init 一次）
    this._charts = {};
    this._chartIniting = {};
  },

  onReady() {
    // 获取图表组件实例
    this.chart1Component = this.selectComponent('#chart1');
    this.chart2Component = this.selectComponent('#chart2');
    this.chart3Component = this.selectComponent('#chart3');
    this.chart4Component = this.selectComponent('#chart4');
  },

  onUnload() {
    if (this._recalcTimer) {
      clearTimeout(this._recalcTimer);
      this._recalcTimer = null;
    }
    if (this._charts) {
      Object.keys(this._charts).forEach(key => {
        const chart = this._charts[key];
        if (!chart || chart.isDisposed()) return;
        try {
          chart.dispose();
        } catch (err) {
          console.warn('释放图表实例失败：', key, err);
        }
      });
      this._charts = {};
    }
    this._chartIniting = {};
  },

  // 输入处理
  onInput(e) {
    const field = e.currentTarget.dataset.field;
    let value = e.detail.value;
    
    // 数字字段转换
    const numericFields = ['startAge', 'endAge', 'initial', 'target', 'mainRate',
      'incomeStart', 'growthRate', 'growthYears', 'inflationRate',
      'utilities', 'charging', 'parking', 'broadband',
      'dailyPerPerson', 'dailyPersons',
      'filial', 'travelPerPerson', 'travelPersons',
      'carMonthly', 'carStartYear', 'carEndYear', 'carEndMonth',
      'mortgageMonthly', 'mortgageStartYear', 'mortgageEndYear', 'mortgageEndMonth',
      'rent', 'propertyFee',
      'petMonthly', 'education', 'insurance',
      'custom1Amount', 'custom2Amount',
      'housingFundMonthly', 'housingFundUsableRate',
      'socialSecurityMonthly', 'socialToRetirementRate'];

    if (numericFields.includes(field)) {
      value = parseFloat(value) || 0;
      if (value < 0) value = 0;
    }

    this.setData({
      [`params.${field}`]: value,
      currentPreset: '',
    });

    this._debounceRecalc();
  },

  // 主收益率滑块变化
  onMainRateChange(e) {
    const value = e.detail.value;
    this.setData({
      'params.mainRate': value,
      currentPreset: '',
    });
    this._debounceRecalc();
  },

  // 切换对比收益率
  toggleCompareRate(e) {
    const rate = e.currentTarget.dataset.rate;
    const current = this.data.params.compareRates[rate];
    this.setData({
      [`params.compareRates.${rate}`]: !current,
    });
    this._debounceRecalc();
  },

  // 切换计算模式
  setMode(e) {
    const mode = e.currentTarget.dataset.mode;
    this.setData({ currentMode: mode });
    this._debounceRecalc();
  },

  // 切换折叠面板
  toggleSection(e) {
    const section = e.currentTarget.dataset.section;
    const current = this.data.sections[section];
    this.setData({
      [`sections.${section}`]: !current,
    });
  },

  // 应用预设
  applyPreset(e) {
    const key = e.currentTarget.dataset.key;
    const preset = PRESETS[key];
    if (!preset) return;

    const defaults = this._getDefaults();
    const newParams = { ...defaults, compareRates: {} };
    
    Object.keys(preset).forEach(k => {
      if (k !== 'key' && k !== 'label' && k !== 'description') {
        newParams[k] = preset[k];
      }
    });

    this.setData({
      params: newParams,
      currentPreset: key,
      currentMode: 'A',
      sections: {
        base: true,
        income: true,
        inflation: true,
        expA: false,
        expB: false,
        expC: false,
        expD: false,
        expE: false,
        expF: false,
        expG: false,
        expH: false,
      }
    });

    wx.showToast({
      title: '已加载：' + preset.label,
      icon: 'none',
      duration: 1500,
    });

    this._debounceRecalc();
  },

  // 全部重置
  resetAll() {
    const defaults = this._getDefaults();
    this.setData({
      params: defaults,
      currentPreset: '',
      currentMode: 'A',
      sections: {
        base: true,
        income: true,
        inflation: true,
        expA: false,
        expB: false,
        expC: false,
        expD: false,
        expE: false,
        expF: false,
        expG: false,
        expH: false,
      }
    });

    wx.showToast({
      title: '已重置所有参数',
      icon: 'none',
      duration: 1500,
    });

    this._debounceRecalc();
  },

  // 获取默认参数
  _getDefaults() {
    return {
      startAge: 25,
      endAge: 45,
      initial: 0,
      target: 0,
      mainRate: 0,
      compareRates: {},
      incomeStart: 0,
      growthRate: 0,
      growthYears: 1,
      inflationRate: 3,
      utilities: 0,
      charging: 0,
      parking: 0,
      broadband: 0,
      dailyPerPerson: 0,
      dailyPersons: 2,
      filial: 0,
      travelPerPerson: 0,
      travelPersons: 2,
      carMonthly: 0,
      carStartYear: CURRENT_YEAR,
      carEndYear: CURRENT_YEAR,
      carEndMonth: 12,
      mortgageMonthly: 0,
      mortgageStartYear: CURRENT_YEAR,
      mortgageEndYear: CURRENT_YEAR,
      mortgageEndMonth: 12,
      rent: 0,
      propertyFee: 0,
      petMonthly: 0,
      education: 0,
      insurance: 0,
      custom1Name: '',
      custom1Amount: 0,
      custom2Name: '',
      custom2Amount: 0,
      housingFundMonthly: 0,
      housingFundUsableRate: 70,
      socialSecurityMonthly: 0,
      socialToRetirementRate: 0,
    };
  },

  // 防抖重新计算
  _debounceRecalc() {
    if (this._recalcTimer) {
      clearTimeout(this._recalcTimer);
    }
    this._recalcTimer = setTimeout(() => {
      this.recalculate();
    }, 80);
  },

  // 核心计算
  recalculate() {
    const p = this._getNormalizedParams();
    const hasAnyData = p.endAge > p.startAge && (p.initial > 0 || p.target > 0 || p.incomeStart > 0 || p.mainRate > 0);

    if (!hasAnyData) {
      this.setData({
        hasResult: false,
        timeline: '请填入参数或加载示例',
        'freedom.show': false,
      });
      return;
    }

    if (p.endAge <= p.startAge) {
      this.setData({
        hasResult: true,
        card1Value: '—',
        card2Value: '—',
        timeline: '请将「目标年龄」设置为大于「起始年龄」',
        'freedom.show': false,
      });
      return;
    }

    const cf = buildCashflow(p);
    const savings = cf.map(r => r.savings);
    const principalContrib = p.initial + savings.reduce((a, b) => a + b, 0);
    const timeline = `${p.startAge} → ${p.endAge} 岁 · ${cf.length} 年`;

    let lines = [];
    let resultMeta = null;
    let card1Label, card1Value, card1Color, card1Sub;
    let card2Label, card2Value, card2Color, card2Sub;
    let card1BadgeShow = false, card1BadgeClass = '', card1BadgeText = '';
    let card2BadgeShow = false, card2BadgeClass = '', card2BadgeText = '';
    let mainTitle;

    if (this.data.currentMode === 'A') {
      mainTitle = '推算收益率 · 看需要多少%';
      const r = solveRate(savings, p.initial, p.target);
      const balances = simulateGrowth(savings, r, p.initial);
      const pct = (r * 100).toFixed(2);

      card1Label = '所需年化收益率';
      card1Value = pct + '%';
      card1Color = r <= 0 ? 'green' : r < 0.07 ? 'green' : r < 0.09 ? 'yellow' : 'red';
      
      if (p.target <= 0) {
        card1Sub = '请设置目标存款金额';
      } else if (r <= 0) {
        card1Sub = '你自己存的钱已超过目标，不用靠投资了 🎉';
      } else if (r < 0.05) {
        card1Sub = '稳健债基即可覆盖';
      } else if (r < 0.07) {
        card1Sub = '股债平衡型可达';
      } else if (r < 0.09) {
        card1Sub = '需偏股型组合';
      } else if (r < 0.11) {
        card1Sub = '需高股票仓位 + 严格定投';
      } else if (r < 0.15) {
        card1Sub = '挑战较大，建议调整目标';
      } else {
        card1Sub = '当前条件下基本无法达成，请调整参数';
      }

      // 追加通胀实际收益率
      if (p.inflationRate > 0 && r > 0 && p.target > 0) {
        const realRate = r - p.inflationRate;
        const realPct = (realRate * 100).toFixed(2);
        card1Sub += ` · 剔除 ${(p.inflationRate * 100).toFixed(1)}% 通胀后实际 ${realPct}%`;
      }

      const gap = p.target - principalContrib;
      card2Label = '投资需要赚多少？';
      
      if (p.target <= 0) {
        card2Value = '—';
        card2Color = 'gray';
        card2Sub = '请先设置目标存款金额';
      } else if (gap <= 0) {
        card2Value = '已达标 🎉';
        card2Color = 'green';
        card2Sub = `光靠自己存 ${formatMoney(principalContrib)} 就超过目标 ${formatMoney(p.target)}，不用靠投资`;
      } else {
        card2Value = formatMoney(gap);
        card2Color = 'gray';
        card2Sub = `目标 ${formatMoney(p.target)} − 你自己能存 ${formatMoney(principalContrib)}`;
      }

      lines = [{ label: `所需 ${pct}%`, rate: r, balances, isMain: true }];
      resultMeta = { requiredRate: r, finalMain: balances.slice(-1)[0], gap: gap };

      // 徽章
      if (p.target > 0) {
        const a = assessRate(r);
        card1BadgeShow = true;
        card1BadgeClass = a.badge;
        card1BadgeText = a.emoji + ' ' + a.level;
        card1Sub = a.hint;
        if (p.inflationRate > 0 && r > 0) {
          const realRate = r - p.inflationRate;
          const realPct = (realRate * 100).toFixed(2);
          card1Sub += ` · 剔除通胀实际 ${realPct}%`;
        }

        const years = Math.max(1, p.endAge - p.startAge);
        const monthlyExtra = Math.round((Math.max(0, gap) * 10000) / (years * 12));
        card2BadgeShow = true;
        if (gap <= 0) {
          card2BadgeClass = 'level-green';
          card2BadgeText = '🎉 超额';
        } else {
          card2BadgeClass = 'level-gray';
          card2BadgeText = '📊 缺口';
          card2Sub += ` · 每月需多存 ¥${monthlyExtra.toLocaleString()}`;
        }
      }

    } else {
      mainTitle = '推算最终存款 · 看 N 年后能存多少';
      const mainRateDecimal = p.mainRate / 100;
      const balancesMain = simulateGrowth(savings, mainRateDecimal, p.initial);
      const finalMain = balancesMain.slice(-1)[0];
      const requiredRate = solveRate(savings, p.initial, p.target);

      card1Label = `${p.endAge} 岁存款`;
      card1Value = formatMoney(finalMain);
      card1Color = p.target > 0 ? (finalMain >= p.target ? 'green' : finalMain >= p.target * 0.85 ? 'yellow' : 'red') : 'indigo';
      
      const diff = finalMain - p.target;
      card1Sub = p.target > 0
        ? (diff >= 0 ? `超过目标 ${formatMoney(diff)} (按收益率 ${p.mainRate.toFixed(2)}%)` : `距目标缺 ${formatMoney(-diff)} (按收益率 ${p.mainRate.toFixed(2)}%)`)
        : `按收益率 ${p.mainRate.toFixed(2)}%（未设目标）`;

      // 追加今天购买力
      if (p.inflationRate > 0 && cf.length > 0) {
        const years = cf.length;
        const todayPower = finalMain / Math.pow(1 + p.inflationRate, years);
        card1Sub += ` · 相当于今天 ${formatMoney(todayPower)} 购买力`;
      }

      const investGain = finalMain - principalContrib;
      const ratio = finalMain > 0 ? (investGain / finalMain * 100) : 0;
      card2Label = '钱生钱占比';
      card2Value = ratio.toFixed(1) + '%';
      card2Color = 'indigo';
      card2Sub = `钱生钱 ${formatMoney(investGain)} / 总 ${formatMoney(finalMain)}`;

      lines.push({ label: `主 ${p.mainRate.toFixed(2)}%`, rate: mainRateDecimal, balances: balancesMain, isMain: true });
      
      // 对比收益率
      Object.keys(p.compareRates).forEach(rateStr => {
        if (p.compareRates[rateStr]) {
          const r = parseFloat(rateStr) / 100;
          lines.push({ label: `${rateStr}%`, rate: r, balances: simulateGrowth(savings, r, p.initial), isMain: false });
        }
      });

      resultMeta = { requiredRate: requiredRate, finalMain: finalMain, gap: p.target - finalMain };

      // 徽章
      if (p.target > 0) {
        const ratio2 = finalMain / p.target;
        let badge, emoji, label, hint;
        if (ratio2 >= 1) {
          badge = 'level-green'; emoji = '🎉'; label = '超达成'; hint = '恭喜，你的规划已超出目标';
        } else if (ratio2 >= 0.85) {
          badge = 'level-yellow'; emoji = '🟡'; label = '接近'; hint = '距目标差一点点，可适度增加权益类配置或调整月支出';
        } else {
          badge = 'level-red'; emoji = '🔴'; label = '差距大'; hint = '当前收益率下达不到目标，需要更高储蓄率、更长时间或重新评估目标';
        }
        card1BadgeShow = true;
        card1BadgeClass = badge;
        card1BadgeText = emoji + ' ' + label;
        card1Sub += ' · ' + hint;
      }
      
      card2BadgeShow = true;
      card2BadgeClass = 'level-gray';
      card2BadgeText = '📊 结构';
    }

    // 计算财务自由指数（未设目标时分数含义不成立，直接不展示）
    let freedom = { show: false };
    if (p.target > 0 && resultMeta && typeof resultMeta.requiredRate === 'number') {
      const index = calculateFreedomIndex(p, { requiredRate: resultMeta.requiredRate });
      freedom = this._buildFreedomView(index, p);
    }

    this.setData({
      hasResult: true,
      mainTitle,
      timeline,
      card1Label, card1Value, card1Color, card1Sub,
      card1BadgeShow, card1BadgeClass, card1BadgeText,
      card2Label, card2Value, card2Color, card2Sub,
      card2BadgeShow, card2BadgeClass, card2BadgeText,
      freedom,
    });

    // 渲染图表
    this._renderCharts(p, cf, lines);
  },

  // 构建财务自由指数的展示数据
  _buildFreedomView(index, p) {
    const insights = generateInsights(index.breakdown);
    const level = scoreLevel(index.total);
    const dims = [
      { key: 's1', name: '储蓄率', score: index.breakdown.s1, max: 25 },
      { key: 's2', name: '目标可行性', score: index.breakdown.s2, max: 25 },
      { key: 's3', name: '收入增长假设', score: index.breakdown.s3, max: 20 },
      { key: 's4', name: '支出结构', score: index.breakdown.s4, max: 15 },
      { key: 's5', name: '目标规模', score: index.breakdown.s5, max: 15 },
    ].map(d => ({ ...d, pct: Math.round(d.score / d.max * 100), tone: dimTone(d.score, d.max) }));

    return {
      show: true,
      score: index.total,
      percentile: comparePeers(index.total, p.startAge),
      ageBand: getAgeBandLabel(p.startAge),
      tone: level.tone,
      badgeClass: level.badgeClass,
      levelText: level.text,
      dims: dims,
      strength: insights.strength,
      weakness: insights.weakness,
      advice: insights.advice,
    };
  },

  // 标准化参数（百分比转小数）
  _getNormalizedParams() {
    const p = { ...this.data.params };
    p.growthRate = p.growthRate / 100;
    p.inflationRate = p.inflationRate / 100;
    p.housingFundUsableRate = p.housingFundUsableRate / 100;
    p.socialToRetirementRate = p.socialToRetirementRate / 100;
    p.growthYears = Math.max(1, p.growthYears);
    p.carEndMonth = Math.min(12, Math.max(1, p.carEndMonth || 12));
    p.mortgageEndMonth = Math.min(12, Math.max(1, p.mortgageEndMonth || 12));
    p.custom1Name = p.custom1Name || '自定义1';
    p.custom2Name = p.custom2Name || '自定义2';
    return p;
  },

  // 渲染所有图表
  _renderCharts(p, cf, lines) {
    const ageLabels = cf.map(r => r.age + '岁');
    const balanceLabels = [];
    for (let i = 0; i <= cf.length; i++) {
      balanceLabels.push((p.startAge + i) + '岁');
    }

    this._renderChart1(cf, ageLabels);
    this._renderChart2(cf, ageLabels, p);
    this._renderChart3(lines, balanceLabels, p);
    this._renderChart4(cf, ageLabels);
  },

  // 统一图表渲染入口：实例只创建一次，之后仅更新配置
  _updateChart(key, option) {
    const comp = this.selectComponent('#' + key);
    if (!comp) return;
    if (!this._charts) this._charts = {};
    if (!this._chartIniting) this._chartIniting = {};

    const cached = this._charts[key];
    // 复用条件：实例未销毁，且仍是当前挂载组件持有的实例（wx:if 重建后 canvas 已换新）
    if (cached && comp.chart === cached && !cached.isDisposed()) {
      cached.setOption(option, true);
      return;
    }

    // 旧 canvas 已销毁但实例还挂着，先释放，避免泄漏
    if (cached && !cached.isDisposed()) {
      try {
        cached.dispose();
      } catch (err) {
        console.warn('释放图表实例失败：', key, err);
      }
      this._charts[key] = null;
    }

    // 首次初始化尚未完成时，只记录最新配置，避免重复 init
    if (this._chartIniting[key]) {
      this._chartIniting[key].option = option;
      return;
    }

    const pending = { option };
    this._chartIniting[key] = pending;
    comp.init((canvas, width, height, dpr) => {
      try {
        const instance = echarts.init(canvas, null, { width, height, devicePixelRatio: dpr });
        canvas.setChart(instance);
        instance.setOption(pending.option, true);
        this._charts[key] = instance;
        return instance;
      } finally {
        // 无论成功与否都解除占位，避免后续渲染被永久阻塞
        this._chartIniting[key] = null;
      }
    });
  },

  // 图表1：收入vs支出
  _renderChart1(cf, labels) {
    const option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(31, 41, 55, 0.95)',
        textStyle: { fontSize: 11, color: '#fff' },
        formatter: function(params) {
          let result = params[0].axisValue + '<br/>';
          params.forEach(item => {
            result += item.marker + item.seriesName + ': ' + item.value.toFixed(2) + 'w<br/>';
          });
          return result;
        }
      },
      legend: {
        top: 0,
        textStyle: { fontSize: 11, color: '#6B7280' },
        itemStyle: { borderRadius: 2 }
      },
      grid: { left: 50, right: 20, top: 40, bottom: 30 },
      xAxis: {
        type: 'category',
        data: labels,
        axisLabel: { fontSize: 10, color: '#9CA3AF', interval: Math.floor(labels.length / 8) },
        axisLine: { lineStyle: { color: '#E5E7EB' } }
      },
      yAxis: {
        type: 'value',
        axisLabel: { fontSize: 10, color: '#9CA3AF', formatter: '{value}w' },
        splitLine: { lineStyle: { color: '#F3F4F6' } }
      },
      series: [
        {
          name: '收入',
          type: 'bar',
          data: cf.map(r => +r.income.toFixed(2)),
          itemStyle: { color: COLORS.income, borderRadius: [4, 4, 0, 0] },
          barWidth: '35%'
        },
        {
          name: '总支出',
          type: 'bar',
          data: cf.map(r => +r.totalExpense.toFixed(2)),
          itemStyle: { color: COLORS.expense, borderRadius: [4, 4, 0, 0] },
          barWidth: '35%'
        }
      ]
    };
    this._updateChart('chart1', option);
  },

  // 图表2：支出结构堆叠
  _renderChart2(cf, labels, p) {
    const c1 = p.custom1Name || '自定义1';
    const c2 = p.custom2Name || '自定义2';
    const gName = (c1 || c2) ? `G ${c1 || ''}${(c1 && c2) ? '+' : ''}${c2 || ''}` : 'G 自定义';

    const option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(31, 41, 55, 0.95)',
        textStyle: { fontSize: 11, color: '#fff' }
      },
      legend: {
        top: 0,
        textStyle: { fontSize: 10, color: '#6B7280' },
        type: 'scroll',
        padding: [0, 10]
      },
      grid: { left: 50, right: 20, top: 50, bottom: 30 },
      xAxis: {
        type: 'category',
        data: labels,
        axisLabel: { fontSize: 10, color: '#9CA3AF', interval: Math.floor(labels.length / 8) },
        axisLine: { lineStyle: { color: '#E5E7EB' } }
      },
      yAxis: {
        type: 'value',
        stack: 'total',
        axisLabel: { fontSize: 10, color: '#9CA3AF', formatter: '{value}w' },
        splitLine: { lineStyle: { color: '#F3F4F6' } }
      },
      series: [
        { name: 'A 刚性', type: 'bar', stack: 'total', data: cf.map(r => +r.A.toFixed(2)), itemStyle: { color: COLORS.expA } },
        { name: 'B 日常', type: 'bar', stack: 'total', data: cf.map(r => +r.B.toFixed(2)), itemStyle: { color: COLORS.expB } },
        { name: 'C 大项', type: 'bar', stack: 'total', data: cf.map(r => +r.C.toFixed(2)), itemStyle: { color: COLORS.expC } },
        { name: 'D 车贷', type: 'bar', stack: 'total', data: cf.map(r => +r.D.toFixed(2)), itemStyle: { color: COLORS.expD } },
        { name: 'E 住房', type: 'bar', stack: 'total', data: cf.map(r => +r.E.toFixed(2)), itemStyle: { color: COLORS.expE } },
        { name: 'F 其他', type: 'bar', stack: 'total', data: cf.map(r => +r.F.toFixed(2)), itemStyle: { color: COLORS.expF } },
        { name: gName, type: 'bar', stack: 'total', data: cf.map(r => +r.G.toFixed(2)), itemStyle: { color: COLORS.expG } },
      ]
    };
    this._updateChart('chart2', option);
  },

  // 图表3：存款累积曲线
  _renderChart3(lines, labels, p) {
    const datasets = lines.map((line, idx) => {
      const color = line.isMain ? COLORS.indigo : COMPARE_LINE_COLORS[(idx - 1) % COMPARE_LINE_COLORS.length];
      return {
        name: line.label,
        type: 'line',
        data: line.balances.map(b => +b.toFixed(1)),
        lineStyle: {
          color: color,
          width: line.isMain ? 3 : 1.8,
          type: line.isMain ? 'solid' : 'dashed',
        },
        itemStyle: { color: color },
        symbolSize: line.isMain ? 6 : 3,
        showSymbol: line.isMain,
        smooth: true,
        areaStyle: line.isMain ? { color: color + '20' } : undefined,
      };
    });

    if (p.target > 0) {
      datasets.push({
        name: `目标 ${formatMoney(p.target)}`,
        type: 'line',
        data: labels.map(_ => p.target),
        lineStyle: { color: COLORS.target, type: 'dashed', width: 1.5 },
        itemStyle: { color: COLORS.target },
        symbol: 'none',
        smooth: false,
      });
    }

    const option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(31, 41, 55, 0.95)',
        textStyle: { fontSize: 11, color: '#fff' }
      },
      legend: {
        top: 0,
        textStyle: { fontSize: 11, color: '#6B7280' },
        type: 'scroll',
        padding: [0, 10]
      },
      grid: { left: 60, right: 20, top: 50, bottom: 30 },
      xAxis: {
        type: 'category',
        data: labels,
        boundaryGap: false,
        axisLabel: { fontSize: 10, color: '#9CA3AF', interval: Math.floor(labels.length / 10) },
        axisLine: { lineStyle: { color: '#E5E7EB' } }
      },
      yAxis: {
        type: 'value',
        axisLabel: { fontSize: 10, color: '#9CA3AF', formatter: '{value}w' },
        splitLine: { lineStyle: { color: '#F3F4F6' } }
      },
      series: datasets
    };
    this._updateChart('chart3', option);
  },

  // 图表4：年度结余分解
  _renderChart4(cf, labels) {
    const option = {
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(31, 41, 55, 0.95)',
        textStyle: { fontSize: 11, color: '#fff' }
      },
      legend: {
        top: 0,
        textStyle: { fontSize: 11, color: '#6B7280' }
      },
      grid: { left: 60, right: 20, top: 40, bottom: 30 },
      xAxis: {
        type: 'category',
        data: labels,
        axisLabel: { fontSize: 10, color: '#9CA3AF', interval: Math.floor(labels.length / 8) },
        axisLine: { lineStyle: { color: '#E5E7EB' } }
      },
      yAxis: {
        type: 'value',
        axisLabel: { fontSize: 10, color: '#9CA3AF', formatter: '{value}w' },
        splitLine: { lineStyle: { color: '#F3F4F6' } }
      },
      series: [
        {
          name: '收入',
          type: 'bar',
          data: cf.map(r => +r.income.toFixed(2)),
          itemStyle: { color: COLORS.income + 'CC', borderRadius: [4, 4, 0, 0] },
          barWidth: '30%',
          z: 2
        },
        {
          name: '总支出',
          type: 'bar',
          data: cf.map(r => -(+r.totalExpense.toFixed(2))),
          itemStyle: { color: '#FCA5A5', borderRadius: [0, 0, 4, 4] },
          barWidth: '30%',
          z: 2
        },
        {
          name: '年结余',
          type: 'line',
          data: cf.map(r => +r.savings.toFixed(2)),
          lineStyle: { color: COLORS.savings, width: 3 },
          itemStyle: { color: COLORS.savings },
          symbolSize: 6,
          smooth: true,
          z: 3
        }
      ]
    };
    this._updateChart('chart4', option);
  },
});
