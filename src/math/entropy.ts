/**
 * Scientific Mathematical Utilities for Entropy, Information Gain, and Gini Index.
 * Strictly adheres to information-theoretic definitions:
 * - 0 * log2(0) = 0 (by limit as p -> 0)
 * - Pure sets have Entropy = 0
 * - Binary equal split has Entropy = 1.0 bit
 */

export interface StepLog {
  label: string;
  expression: string;
  result: number | string;
}

export interface EntropyResult {
  entropy: number;
  steps: StepLog[];
  formula: string;
  pValues: number[];
}

export interface GainResult {
  parentEntropy: number;
  weightedChildEntropy: number;
  informationGain: number;
  childCalculations: {
    subsetName: string;
    count: number;
    entropy: number;
    weight: number;
    distribution: Record<string, number>;
  }[];
  steps: StepLog[];
}

/**
 * Calculates Shannon Entropy in bits (log base 2).
 * counts: Array of sample frequencies for each class, e.g. [9, 5] for [Yes, No]
 */
export function calculateEntropy(counts: number[]): EntropyResult {
  const total = counts.reduce((sum, c) => sum + Math.max(0, c), 0);
  const steps: StepLog[] = [];

  if (total === 0) {
    return {
      entropy: 0,
      steps: [{ label: 'Empty Set', expression: 'Total samples = 0', result: 0 }],
      formula: 'H(S) = 0',
      pValues: [],
    };
  }

  const pValues: number[] = [];
  let entropy = 0;
  const termStrings: string[] = [];

  counts.forEach((count, idx) => {
    const validCount = Math.max(0, count);
    const p = validCount / total;
    pValues.push(p);

    if (p > 0) {
      const log2p = Math.log2(p);
      const term = p * log2p;
      entropy -= term;
      termStrings.push(`- (${validCount}/${total}) \\cdot \\log_2(${p.toFixed(3)})`);
      steps.push({
        label: `Class ${idx + 1} Term`,
        expression: `- (${validCount}/${total}) * log2(${p.toFixed(4)})`,
        result: (-term).toFixed(4),
      });
    } else {
      termStrings.push(`- (0)`);
      steps.push({
        label: `Class ${idx + 1} (Zero Probability)`,
        expression: 'lim_{p -> 0} (p * log2(p)) = 0',
        result: '0.0000',
      });
    }
  });

  // Handle floating point imprecision
  const roundedEntropy = Math.abs(entropy) < 1e-9 ? 0 : Number(entropy.toFixed(4));

  return {
    entropy: roundedEntropy,
    steps,
    formula: `H(S) = ${termStrings.join(' ')} = ${roundedEntropy.toFixed(4)} \\text{ bits}`,
    pValues,
  };
}

/**
 * Calculates Gini Impurity (used in CART algorithm).
 * Gini(S) = 1 - sum(p_j^2)
 */
export function calculateGini(counts: number[]): { gini: number; steps: StepLog[]; formula: string } {
  const total = counts.reduce((sum, c) => sum + Math.max(0, c), 0);
  if (total === 0) {
    return { gini: 0, steps: [], formula: 'Gini = 0' };
  }

  let sumSquares = 0;
  const steps: StepLog[] = [];
  const termStrings: string[] = [];

  counts.forEach((count, idx) => {
    const p = Math.max(0, count) / total;
    const pSq = p * p;
    sumSquares += pSq;
    termStrings.push(`(${count}/${total})^2`);
    steps.push({
      label: `Class ${idx + 1} Probability Squared`,
      expression: `(${count}/${total})^2`,
      result: pSq.toFixed(4),
    });
  });

  const gini = Number((1 - sumSquares).toFixed(4));
  return {
    gini,
    steps,
    formula: `\\text{Gini}(S) = 1 - [${termStrings.join(' + ')}] = ${gini.toFixed(4)}`,
  };
}

/**
 * Calculates Information Gain:
 * Gain(S, A) = Entropy(S) - sum_v (|S_v| / |S|) * Entropy(S_v)
 */
export function calculateInformationGain(
  parentCounts: number[],
  children: { name: string; counts: number[] }[]
): GainResult {
  const parentResult = calculateEntropy(parentCounts);
  const totalSamples = parentCounts.reduce((sum, c) => sum + Math.max(0, c), 0);
  const steps: StepLog[] = [];

  steps.push({
    label: 'Parent Entropy H(S)',
    expression: 'Shannon entropy of entire parent dataset',
    result: parentResult.entropy.toFixed(4),
  });

  let weightedChildEntropy = 0;
  const childCalculations = children.map((child) => {
    const childTotal = child.counts.reduce((sum, c) => sum + Math.max(0, c), 0);
    const weight = totalSamples > 0 ? childTotal / totalSamples : 0;
    const childEntropyResult = calculateEntropy(child.counts);
    const weightedVal = weight * childEntropyResult.entropy;
    weightedChildEntropy += weightedVal;

    const dist: Record<string, number> = {};
    child.counts.forEach((c, i) => {
      dist[`Class ${i + 1}`] = c;
    });

    steps.push({
      label: `Child Split: ${child.name}`,
      expression: `Weight (${childTotal}/${totalSamples}) * H(${childEntropyResult.entropy.toFixed(4)})`,
      result: weightedVal.toFixed(4),
    });

    return {
      subsetName: child.name,
      count: childTotal,
      entropy: childEntropyResult.entropy,
      weight: Number(weight.toFixed(4)),
      distribution: dist,
    };
  });

  const informationGain = Number(Math.max(0, parentResult.entropy - weightedChildEntropy).toFixed(4));

  steps.push({
    label: 'Final Information Gain',
    expression: `Gain(S, A) = ${parentResult.entropy.toFixed(4)} - ${weightedChildEntropy.toFixed(4)}`,
    result: informationGain.toFixed(4),
  });

  return {
    parentEntropy: parentResult.entropy,
    weightedChildEntropy: Number(weightedChildEntropy.toFixed(4)),
    informationGain,
    childCalculations,
    steps,
  };
}
