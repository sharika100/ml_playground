/**
 * Mathematical Rendering & Calculation Audit Script
 * Validates KaTeX expressions, delimiter balance, and numerical precision across ML Playground.
 */

import katex from 'katex';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ ${message}`);
  } else {
    failedTests++;
    console.error(`  ✗ FAIL: ${message}`);
  }
}

function testKatexRender(expression, label, displayMode = false) {
  totalTests++;
  try {
    const clean = expression
      .replace(/^(\$\$|\$|\\\[|\\\(|\\]|\\\))/, '')
      .replace(/(\$\$|\$|\\\[|\\\(|\\]|\\\))$/, '');
    katex.renderToString(clean, {
      displayMode,
      throwOnError: true,
      strict: false,
    });
    passedTests++;
    console.log(`  ✓ KaTeX OK: [${label}]`);
    return true;
  } catch (err) {
    failedTests++;
    console.error(`  ✗ KaTeX ERROR [${label}]: ${err.message}`);
    return false;
  }
}

console.log('\n=== ML PLAYGROUND MATHEMATICAL AUDIT ===\n');

// 1. Audit Play Tennis Numerical Values
console.log('--- 1. Play Tennis Entropy & Information Gain ---');
function calcEntropy(counts) {
  const total = counts.reduce((a, b) => a + b, 0);
  if (total === 0) return 0;
  let ent = 0;
  for (const c of counts) {
    if (c > 0) {
      const p = c / total;
      ent -= p * Math.log2(p);
    }
  }
  return ent;
}

const hTotal = calcEntropy([9, 5]);
const hSunny = calcEntropy([2, 3]);
const hOvercast = calcEntropy([4, 0]);
const hRain = calcEntropy([3, 2]);
const weightedChild = (5 / 14) * hSunny + (4 / 14) * hOvercast + (5 / 14) * hRain;
const gainOutlook = hTotal - weightedChild;

assert(Math.abs(hTotal - 0.940) < 0.001, `Total H(S) = ${hTotal.toFixed(3)} (Expected ~0.940)`);
assert(Math.abs(hSunny - 0.971) < 0.001, `Sunny H(S_Sunny) = ${hSunny.toFixed(3)} (Expected ~0.971)`);
assert(Math.abs(hOvercast - 0.000) < 0.0001, `Overcast H(S_Overcast) = ${hOvercast.toFixed(3)} (Expected 0.000, pure set)`);
assert(Math.abs(hRain - 0.971) < 0.001, `Rain H(S_Rain) = ${hRain.toFixed(3)} (Expected ~0.971)`);
assert(Math.abs(weightedChild - 0.694) < 0.002, `Weighted Child Entropy = ${weightedChild.toFixed(3)} (Expected ~0.693-0.694)`);
assert(Math.abs(gainOutlook - 0.247) < 0.001, `Information Gain = ${gainOutlook.toFixed(3)} (Expected ~0.247)`);

// 2. Audit Linear Regression OLS Analytical Derivation
console.log('\n--- 2. Linear Regression OLS Analytical Solution ---');
const samplePoints = [
  { x: 1, y: 1.5 },
  { x: 2, y: 2.3 },
  { x: 3, y: 2.8 },
  { x: 4, y: 4.1 },
  { x: 5, y: 4.9 },
  { x: 6, y: 5.5 },
  { x: 7, y: 7.2 },
];
const n = samplePoints.length;
const meanX = samplePoints.reduce((a, p) => a + p.x, 0) / n;
const meanY = samplePoints.reduce((a, p) => a + p.y, 0) / n;
let numerator = 0;
let denominator = 0;
for (const p of samplePoints) {
  numerator += (p.x - meanX) * (p.y - meanY);
  denominator += Math.pow(p.x - meanX, 2);
}
const analyticalSlope = numerator / denominator;
const analyticalIntercept = meanY - analyticalSlope * meanX;

assert(Math.abs(analyticalSlope - 0.9143) < 0.001, `OLS Slope a1 = ${analyticalSlope.toFixed(4)} matches analytical OLS formula (0.9143)`);
assert(Math.abs(analyticalIntercept - 0.3857) < 0.001, `OLS Intercept a0 = ${analyticalIntercept.toFixed(4)} matches analytical OLS formula (0.3857)`);

// 3. Test Core Curriculum Formulas in curriculum.ts
console.log('\n--- 3. KaTeX Parsing of Curriculum Mathematical Formulations ---');
const curriculumPath = path.join(rootDir, 'src', 'data', 'curriculum.ts');
const curriculumContent = fs.readFileSync(curriculumPath, 'utf8');

// Extract formulaLatex strings
const formulaMatches = [...curriculumContent.matchAll(/formulaLatex:\s*['"`]([\s\S]*?)['"`],/g)];
console.log(`Found ${formulaMatches.length} formulaLatex strings in curriculum.ts`);
formulaMatches.forEach((m, idx) => {
  const expr = m[1].replace(/\\n/g, '\n').replace(/\\\\/g, '\\');
  testKatexRender(expr, `Curriculum Topic Formulation #${idx + 1}`, true);
});

// Extract symbol strings
const symbolMatches = [...curriculumContent.matchAll(/symbol:\s*['"`]([\s\S]*?)['"`],/g)];
console.log(`Found ${symbolMatches.length} symbol strings in curriculum.ts`);
symbolMatches.forEach((m, idx) => {
  const expr = m[1].replace(/\\n/g, '\n').replace(/\\\\/g, '\\');
  testKatexRender(expr, `Symbol #${idx + 1} (${expr})`, false);
});

// Extract calculations and results in numerical examples
const calculationMatches = [...curriculumContent.matchAll(/calculation:\s*['"`]([\s\S]*?)['"`],/g)];
console.log(`Found ${calculationMatches.length} calculation strings in numerical examples`);
calculationMatches.forEach((m, idx) => {
  const expr = m[1].replace(/\\n/g, '\n').replace(/\\\\/g, '\\');
  testKatexRender(expr, `Calculation #${idx + 1}`, false);
});

// 4. Test StepByStepSolver Problems
console.log('\n--- 4. KaTeX Parsing of StepByStepSolver Equations ---');
const solverPath = path.join(rootDir, 'src', 'components', 'interactive', 'StepByStepSolver.tsx');
const solverContent = fs.readFileSync(solverPath, 'utf8');
const solverFormulas = [...solverContent.matchAll(/formula:\s*['"`]([\s\S]*?)['"`],/g)];
console.log(`Found ${solverFormulas.length} formulas in StepByStepSolver.tsx`);
solverFormulas.forEach((m, idx) => {
  const expr = m[1].replace(/\\n/g, '\n').replace(/\\\\/g, '\\');
  testKatexRender(expr, `Solver Formula #${idx + 1}`, false);
});

// 5. Test Balanced Aligned Environments in Source Code
console.log('\n--- 5. Delimiter Balance & Environment Verification ---');
const filesToCheck = [
  'src/data/curriculum.ts',
  'src/components/common/MathFormula.tsx',
  'src/components/interactive/StepByStepSolver.tsx',
  'src/components/interactive/InformationGainCalculator.tsx',
  'src/components/interactive/EntropyExplorer.tsx',
  'src/components/interactive/RegressionPlayground.tsx',
  'src/components/interactive/HypothesisPlayground.tsx',
  'src/pages/RevisionStudioPage.tsx',
  'src/pages/LessonViewPage.tsx',
];

filesToCheck.forEach((relPath) => {
  const fullPath = path.join(rootDir, relPath);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    const beginAligned = (content.match(/\\begin\{aligned\}/g) || []).length;
    const endAligned = (content.match(/\\end\{aligned\}/g) || []).length;
    assert(
      beginAligned === endAligned,
      `${relPath}: \\begin{aligned} (${beginAligned}) matches \\end{aligned} (${endAligned})`
    );
  }
});

// 6. Test RevisionStudioPage Formulas
console.log('\n--- 6. KaTeX Parsing of RevisionStudioPage Formulas ---');
const revPath = path.join(rootDir, 'src/pages/RevisionStudioPage.tsx');
const revContent = fs.readFileSync(revPath, 'utf8');
const revFormulas = [...revContent.matchAll(/formula="([^"]+)"/g)];
console.log(`Found ${revFormulas.length} formulas in RevisionStudioPage.tsx`);
revFormulas.forEach((m, idx) => {
  const expr = m[1].replace(/\\\\/g, '\\');
  testKatexRender(expr, `Revision Studio Formula #${idx + 1}`, false);
});

// 7. Test MathText Regex & Escaped Dollar Splitting
console.log('\n--- 7. MathText Tokenizer & Escaped Dollar Safety ---');
const mathRegex = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)|\$\$(?:[\s\S]*?)\$\$|(?<!\\)\$[^\$\n]+?(?<!\\)\$)/g;
const testStr1 = "Cost is \\$450,000 while math is $H(S) = 0.940$ and test \\$10.";
const tokens1 = [...testStr1.matchAll(mathRegex)];
assert(tokens1.length === 1 && tokens1[0][0] === '$H(S) = 0.940$', 'Math regex correctly ignores escaped \\$ in plain text');

console.log(`\n========================================`);
console.log(`AUDIT RESULTS: ${passedTests} PASSED, ${failedTests} FAILED out of ${totalTests} CHECKS.`);
console.log(`========================================\n`);

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
