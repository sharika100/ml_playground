import { Point2D } from './linearRegression';

/**
 * Fits a polynomial of specified degree to 2D points using Gauss-Jordan elimination on Vandermonde matrix.
 */
export function fitPolynomial(points: Point2D[], degree: number): number[] {
  const n = points.length;
  if (n === 0) return [0];
  const m = Math.max(1, Math.min(degree + 1, n));

  // Build normal equation matrices: (X^T * X) * W = X^T * Y
  const A: number[][] = Array.from({ length: m }, () => Array(m).fill(0));
  const B: number[] = Array(m).fill(0);

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < m; j++) {
      let sum = 0;
      for (const p of points) {
        sum += Math.pow(p.x, i + j);
      }
      A[i][j] = sum;
    }
    let sumY = 0;
    for (const p of points) {
      sumY += p.y * Math.pow(p.x, i);
    }
    B[i] = sumY;
  }

  // Regularize diagonal slightly to avoid singular matrix if collinear
  for (let i = 0; i < m; i++) {
    A[i][i] += 1e-6;
  }

  // Gaussian elimination
  for (let i = 0; i < m; i++) {
    let maxRow = i;
    for (let k = i + 1; k < m; k++) {
      if (Math.abs(A[k][i]) > Math.abs(A[maxRow][i])) {
        maxRow = k;
      }
    }
    [A[i], A[maxRow]] = [A[maxRow], A[i]];
    [B[i], B[maxRow]] = [B[maxRow], B[i]];

    const pivot = A[i][i];
    if (Math.abs(pivot) < 1e-9) continue;

    for (let j = i; j < m; j++) {
      A[i][j] /= pivot;
    }
    B[i] /= pivot;

    for (let k = 0; k < m; k++) {
      if (k !== i) {
        const factor = A[k][i];
        for (let j = i; j < m; j++) {
          A[k][j] -= factor * A[i][j];
        }
        B[k] -= factor * B[i];
      }
    }
  }

  return B; // Coefficients [w0, w1, w2, ...]
}

/**
 * Evaluates polynomial at x given coefficients.
 */
export function evalPoly(coeffs: number[], x: number): number {
  return coeffs.reduce((sum, c, i) => sum + c * Math.pow(x, i), 0);
}

/**
 * Computes mean squared error of polynomial fit on given points.
 */
export function polyMSE(coeffs: number[], points: Point2D[]): number {
  if (points.length === 0) return 0;
  const sse = points.reduce((acc, p) => {
    const err = p.y - evalPoly(coeffs, p.x);
    return acc + err * err;
  }, 0);
  return Number((sse / points.length).toFixed(4));
}
