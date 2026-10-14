import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ScenarioFrame, PredictionChallenge } from './ScenarioFrame';
import { triggerCelebration } from '../common/Celebration';
import { Users, Shuffle, Target, Compass, Sparkles, CheckCircle2 } from 'lucide-react';

interface Point2D {
  id: string;
  x: number;
  y: number;
  cluster: number; // 0, 1, 2
}

interface Centroid {
  x: number;
  y: number;
  color: string;
}

const CLUSTER_COLORS = ['#38bdf8', '#f59e0b', '#ec4899', '#10b981'];

const INITIAL_POINTS: Point2D[] = [
  // Group A (Low spending, high visits)
  { id: 'p1', x: 2, y: 7, cluster: -1 },
  { id: 'p2', x: 2.5, y: 7.5, cluster: -1 },
  { id: 'p3', x: 3, y: 6.8, cluster: -1 },
  { id: 'p4', x: 1.8, y: 6.2, cluster: -1 },
  // Group B (High spending, low visits)
  { id: 'p5', x: 7, y: 2, cluster: -1 },
  { id: 'p6', x: 7.8, y: 2.5, cluster: -1 },
  { id: 'p7', x: 6.9, y: 3.1, cluster: -1 },
  { id: 'p8', x: 8.2, y: 1.8, cluster: -1 },
  // Group C (High spending, high visits - VIP)
  { id: 'p9', x: 7.2, y: 7.5, cluster: -1 },
  { id: 'p10', x: 7.8, y: 8.2, cluster: -1 },
  { id: 'p11', x: 8.4, y: 7.1, cluster: -1 },
  { id: 'p12', x: 6.5, y: 7.8, cluster: -1 },
  // Group D (Moderate middle)
  { id: 'p13', x: 4.5, y: 4.5, cluster: -1 },
  { id: 'p14', x: 5.2, y: 4.8, cluster: -1 },
  { id: 'p15', x: 4.2, y: 5.1, cluster: -1 },
];

export const ClusteringScenario: React.FC = () => {
  const [k, setK] = useState<number>(3);
  const [points, setPoints] = useState<Point2D[]>(INITIAL_POINTS);
  const [centroids, setCentroids] = useState<Centroid[]>([
    { x: 3, y: 3, color: CLUSTER_COLORS[0] },
    { x: 5, y: 5, color: CLUSTER_COLORS[1] },
    { x: 7, y: 7, color: CLUSTER_COLORS[2] },
  ]);
  const [iteration, setIteration] = useState<number>(0);
  const [phase, setPhase] = useState<'assign' | 'update'>('assign');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [isConverged, setIsConverged] = useState<boolean>(false);
  const [userPrediction, setUserPrediction] = useState<string | null>(null);
  const [currentActionDesc, setCurrentActionDesc] = useState<string>(
    'Initial centroids seeded. Click Run or Step to begin clustering.'
  );

  // SVG Mapping (Width 400, Height 260, Margins 40)
  const mapX = (x: number) => 40 + (x / 10) * 320;
  const mapY = (y: number) => 220 - (y / 10) * 180;

  // Single Step: Alternates between Assignment and Centroid Update
  const stepClustering = useCallback(() => {
    if (phase === 'assign') {
      // Phase 1: Assign each point to the closest centroid
      let changes = 0;
      const nextPoints = points.map((pt) => {
        let minDist = Infinity;
        let bestCluster = 0;
        centroids.forEach((c, cIdx) => {
          const dist = Math.hypot(pt.x - c.x, pt.y - c.y);
          if (dist < minDist) {
            minDist = dist;
            bestCluster = cIdx;
          }
        });
        if (pt.cluster !== bestCluster) changes++;
        return { ...pt, cluster: bestCluster };
      });

      setPoints(nextPoints);
      setPhase('update');
      setCurrentActionDesc(
        `Assignment Phase: All ${points.length} points colored to match their closest centroid.`
      );

      if (changes === 0 && iteration > 0) {
        setIsConverged(true);
        setIsRunning(false);
        triggerCelebration();
        setCurrentActionDesc('✨ Convergence Reached! Centroid locations and cluster assignments are stable.');
      }
    } else {
      // Phase 2: Update centroid coordinates to the mean of assigned points
      let maxShift = 0;
      const nextCentroids = centroids.map((c, cIdx) => {
        const assigned = points.filter((p) => p.cluster === cIdx);
        if (assigned.length === 0) return c;
        const meanX = assigned.reduce((acc, p) => acc + p.x, 0) / assigned.length;
        const meanY = assigned.reduce((acc, p) => acc + p.y, 0) / assigned.length;
        const shift = Math.hypot(c.x - meanX, c.y - meanY);
        if (shift > maxShift) maxShift = shift;
        return { ...c, x: Number(meanX.toFixed(2)), y: Number(meanY.toFixed(2)) };
      });

      setCentroids(nextCentroids);
      setPhase('assign');
      setIteration((i) => i + 1);
      setCurrentActionDesc(
        `Update Phase: Centroids moved to the spatial center (mean) of their assigned points (Iteration ${iteration + 1}).`
      );

      if (maxShift < 0.05 && iteration > 0) {
        setIsConverged(true);
        setIsRunning(false);
        triggerCelebration();
        setCurrentActionDesc('✨ Convergence Reached! Within-cluster variation minimized.');
      }
    }
  }, [centroids, iteration, phase, points]);

  // Animation Loop
  useEffect(() => {
    if (!isRunning) return;
    const intervalTime = 1200 / speed;
    const interval = setInterval(() => {
      stepClustering();
    }, intervalTime);
    return () => clearInterval(interval);
  }, [isRunning, speed, stepClustering]);

  const handleReset = () => {
    setIsRunning(false);
    setIsConverged(false);
    setIteration(0);
    setPhase('assign');
    setPoints(INITIAL_POINTS.map((p) => ({ ...p, cluster: -1 })));

    // Re-seed centroids
    if (k === 2) {
      setCentroids([
        { x: 3, y: 3, color: CLUSTER_COLORS[0] },
        { x: 7, y: 7, color: CLUSTER_COLORS[1] },
      ]);
    } else if (k === 3) {
      setCentroids([
        { x: 3, y: 3, color: CLUSTER_COLORS[0] },
        { x: 5, y: 5, color: CLUSTER_COLORS[1] },
        { x: 7, y: 7, color: CLUSTER_COLORS[2] },
      ]);
    } else {
      setCentroids([
        { x: 2, y: 2, color: CLUSTER_COLORS[0] },
        { x: 3, y: 7, color: CLUSTER_COLORS[1] },
        { x: 7, y: 3, color: CLUSTER_COLORS[2] },
        { x: 8, y: 8, color: CLUSTER_COLORS[3] },
      ]);
    }
    setCurrentActionDesc('Reset K-Means state.');
  };

  const handleKChange = (newK: number) => {
    setK(newK);
    setIsRunning(false);
    setIsConverged(false);
    setIteration(0);
    setPhase('assign');
    setPoints(INITIAL_POINTS.map((p) => ({ ...p, cluster: -1 })));

    const seeds = [
      { x: 3, y: 3, color: CLUSTER_COLORS[0] },
      { x: 7, y: 7, color: CLUSTER_COLORS[1] },
      { x: 5, y: 5, color: CLUSTER_COLORS[2] },
      { x: 7, y: 3, color: CLUSTER_COLORS[3] },
    ].slice(0, newK);

    setCentroids(seeds);
    setCurrentActionDesc(`Number of clusters set to k = ${newK}.`);
  };

  const predictionChallenge: PredictionChallenge = {
    question:
      'What makes K-Means an UNSUPERVISED learning algorithm rather than a supervised classifier?',
    options: [
      {
        id: 'opt-unsupervised',
        label: 'No ground-truth target labels are provided in the data. The algorithm discovers natural clusters based purely on spatial proximity.',
        isCorrect: true,
        explanation:
          'Unsupervised learning finds latent pattern groupings without teacher supervision. Points do not have "Customer Type" tags; they are clustered by geometric distance.',
      },
      {
        id: 'opt-fast',
        label: 'Because it runs faster than supervised learning algorithms.',
        isCorrect: false,
        explanation: 'Speed does not define the learning paradigm; presence/absence of teacher labels does.',
      },
      {
        id: 'opt-linear',
        label: 'Because it only works on straight lines.',
        isCorrect: false,
        explanation: 'K-Means partitions multidimensional space into Voronoi cells based on distance metrics.',
      },
    ],
  };

  return (
    <ScenarioFrame
      title="Scenario D: Interactive K-Means Clustering (Unsupervised Learning)"
      badge="Unsupervised Learning • K-Means Clustering"
      badgeColor="bg-purple-100 text-purple-800 dark:bg-purple-950/70 dark:text-purple-300 border-purple-300 dark:border-purple-800"
      story="Watch customer profile data points group themselves without any human labels. Observe the two alternating phases of K-Means: assigning data points to their nearest centroid, and centroids migrating to the geometric center of their assigned points."
      isRunning={isRunning}
      onTogglePlay={() => setIsRunning(!isRunning)}
      onStep={stepClustering}
      onReset={handleReset}
      speed={speed}
      onSpeedChange={setSpeed}
      prediction={predictionChallenge}
      userPrediction={userPrediction}
      onSelectPrediction={setUserPrediction}
      currentStepDescription={currentActionDesc}
      scientificExplanation="K-Means (MacQueen, 1967) alternates between two steps: 1) Assignment step: $\\operatorname{arg\\,min}_k \\|\\mathbf{x}_i - \\boldsymbol{\\mu}_k\\|^2$; 2) Update step: $\\boldsymbol{\\mu}_k = \\frac{1}{|S_k|} \\sum_{\\mathbf{x}_i \\in S_k} \\mathbf{x}_i$. This iteratively minimizes the within-cluster sum of squares (WCSS). Notice that clusters depend on initialization and chosen $k$!"
      formalConcept="Module 5 Form of Learning #2: Unsupervised Learning. The learner discovers patterns and clusters in the input without explicit target output values $y$ provided in the training examples."
      followUpChallenge="Switch $k$ between 2, 3, and 4 clusters using the buttons below to see how geometric partition boundaries reorganize!"
      telemetry={
        <>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-400">Clusters (k)</span>
            <span className="font-bold text-purple-400 text-sm">{k}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-400">Iteration</span>
            <span className="font-bold text-slate-200 text-sm">#{iteration}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-400">Phase</span>
            <span className="font-bold text-emerald-400 text-sm capitalize">{phase}</span>
          </div>
        </>
      }
    >
      {/* 2D Coordinate Viewport */}
      <div className="p-6 sm:p-8 flex flex-col items-center select-none space-y-4">
        {/* K Selector */}
        <div className="flex items-center gap-3 text-xs">
          <span className="font-bold text-slate-400">Number of Clusters (k):</span>
          <div className="inline-flex rounded-xl bg-slate-900 border border-slate-800 p-1">
            {[2, 3, 4].map((num) => (
              <button
                key={num}
                onClick={() => handleKChange(num)}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  k === num ? 'bg-purple-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                k = {num}
              </button>
            ))}
          </div>
          {isConverged && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> Converged!
            </span>
          )}
        </div>

        {/* SVG Scatter Plot */}
        <div className="w-full flex justify-center py-2">
          <svg viewBox="0 0 400 260" className="w-full max-w-lg h-auto">
            {/* Grid & Axes */}
            <line x1="40" y1="220" x2="370" y2="220" stroke="#334155" strokeWidth="1.5" />
            <line x1="40" y1="30" x2="40" y2="220" stroke="#334155" strokeWidth="1.5" />
            <text x="375" y="224" fontSize="9" fill="#64748b">Spending →</text>
            <text x="35" y="22" fontSize="9" fill="#64748b">Visits ↑</text>

            {/* Dotted Lines from points to their assigned centroid */}
            {points.map((pt) => {
              if (pt.cluster === -1) return null;
              const c = centroids[pt.cluster];
              if (!c) return null;
              return (
                <line
                  key={`line-${pt.id}`}
                  x1={mapX(pt.x)}
                  y1={mapY(pt.y)}
                  x2={mapX(c.x)}
                  y2={mapY(c.y)}
                  stroke={c.color}
                  strokeWidth="1"
                  strokeDasharray="2,2"
                  opacity="0.35"
                />
              );
            })}

            {/* Customer Points */}
            {points.map((pt) => {
              const ptColor = pt.cluster === -1 ? '#94a3b8' : CLUSTER_COLORS[pt.cluster];
              return (
                <circle
                  key={pt.id}
                  cx={mapX(pt.x)}
                  cy={mapY(pt.y)}
                  r="5"
                  fill={ptColor}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  className="transition-all duration-500"
                />
              );
            })}

            {/* Centroid Stars μ_k */}
            {centroids.map((c, idx) => (
              <g key={`cent-${idx}`} className="transition-all duration-700">
                {/* Outer Pulse Ring */}
                <circle
                  cx={mapX(c.x)}
                  cy={mapY(c.y)}
                  r="12"
                  fill="none"
                  stroke={c.color}
                  strokeWidth="1.5"
                  strokeDasharray="3,3"
                  className="animate-spin"
                />
                {/* Centroid Diamond */}
                <polygon
                  points={`
                    ${mapX(c.x)},${mapY(c.y) - 7}
                    ${mapX(c.x) + 7},${mapY(c.y)}
                    ${mapX(c.x)},${mapY(c.y) + 7}
                    ${mapX(c.x) - 7},${mapY(c.y)}
                  `}
                  fill={c.color}
                  stroke="#ffffff"
                  strokeWidth="2"
                />
                <text
                  x={mapX(c.x)}
                  y={mapY(c.y) - 12}
                  fontSize="8"
                  fontWeight="bold"
                  fill={c.color}
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  μ{idx + 1}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="flex items-center justify-between w-full max-w-md text-xs text-slate-400 pt-2 border-t border-slate-800">
          <span>• Circles: Unlabeled customer samples</span>
          <span>• Diamonds (μ): Cluster centers</span>
        </div>
      </div>
    </ScenarioFrame>
  );
};
