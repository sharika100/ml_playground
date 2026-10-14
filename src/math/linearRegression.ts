export interface Point2D {
  x: number;
  y: number;
  id?: string;
  label?: string;
}

export interface RegressionMetrics {
  slope: number;
  intercept: number;
  mse: number;
  rmse: number;
  r2: number;
  sse: number;
  sst: number;
  points: {
    x: number;
    y: number;
    yPred: number;
    residual: number;
  }[];
}

/**
 * Analytical Ordinary Least Squares (OLS) closed-form solution.
 */
export function computeBestFitLine(points: Point2D[]): { slope: number; intercept: number } {
  const n = points.length;
  if (n < 2) {
    return { slope: 0, intercept: points.length > 0 ? points[0].y : 0 };
  }

  const sumX = points.reduce((acc, p) => acc + p.x, 0);
  const sumY = points.reduce((acc, p) => acc + p.y, 0);
  const meanX = sumX / n;
  const meanY = sumY / n;

  let numerator = 0;
  let denominator = 0;

  for (const p of points) {
    const dx = p.x - meanX;
    const dy = p.y - meanY;
    numerator += dx * dy;
    denominator += dx * dx;
  }

  const slope = denominator === 0 ? 0 : numerator / denominator;
  const intercept = meanY - slope * meanX;

  return {
    slope: Number(slope.toFixed(4)),
    intercept: Number(intercept.toFixed(4)),
  };
}

/**
 * Evaluates metrics for ANY candidate line y = mx + b against a set of points.
 */
export function evaluateLine(points: Point2D[], slope: number, intercept: number): RegressionMetrics {
  const n = points.length;
  if (n === 0) {
    return {
      slope,
      intercept,
      mse: 0,
      rmse: 0,
      r2: 1,
      sse: 0,
      sst: 0,
      points: [],
    };
  }

  const meanY = points.reduce((acc, p) => acc + p.y, 0) / n;
  let sse = 0;
  let sst = 0;

  const pointDetails = points.map((p) => {
    const yPred = slope * p.x + intercept;
    const residual = p.y - yPred;
    sse += residual * residual;
    sst += (p.y - meanY) * (p.y - meanY);
    return {
      x: p.x,
      y: p.y,
      yPred: Number(yPred.toFixed(3)),
      residual: Number(residual.toFixed(3)),
    };
  });

  const mse = sse / n;
  const rmse = Math.sqrt(mse);
  // R2 = 1 - (SSE / SST), clamped reasonably between -1 and 1 for arbitrary manual lines
  const r2 = sst === 0 ? 1 : Math.max(-1, Math.min(1, 1 - sse / sst));

  return {
    slope: Number(slope.toFixed(4)),
    intercept: Number(intercept.toFixed(4)),
    mse: Number(mse.toFixed(4)),
    rmse: Number(rmse.toFixed(4)),
    r2: Number(r2.toFixed(4)),
    sse: Number(sse.toFixed(4)),
    sst: Number(sst.toFixed(4)),
    points: pointDetails,
  };
}
