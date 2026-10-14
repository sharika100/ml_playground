import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ScenarioFrame, PredictionChallenge } from './ScenarioFrame';
import { triggerCelebration } from '../common/Celebration';
import { Bot, Zap, ShieldAlert, Trophy, Compass, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

const GRID_SIZE = 5;
const START_POS = { x: 0, y: 0 };
const GOAL_POS = { x: 4, y: 4 };

// Action directions
const ACTIONS = [
  { name: 'UP', dx: 0, dy: -1 },
  { name: 'RIGHT', dx: 1, dy: 0 },
  { name: 'DOWN', dx: 0, dy: 1 },
  { name: 'LEFT', dx: -1, dy: 0 },
];

export const RobotMazeScenario: React.FC = () => {
  const [robotPos, setRobotPos] = useState<{ x: number; y: number }>(START_POS);
  const [obstacles, setObstacles] = useState<{ x: number; y: number }[]>([
    { x: 1, y: 1 },
    { x: 1, y: 2 },
    { x: 3, y: 2 },
    { x: 3, y: 3 },
  ]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [episode, setEpisode] = useState<number>(1);
  const [episodeReward, setEpisodeReward] = useState<number>(0);
  const [totalReward, setTotalReward] = useState<number>(0);
  const [currentActionDesc, setCurrentActionDesc] = useState<string>(
    'Robot is ready at start coordinates (0, 0).'
  );
  const [userPrediction, setUserPrediction] = useState<string | null>(null);
  const [showQValues, setShowQValues] = useState<boolean>(true);

  // Q-Table: state index (y * 5 + x) -> Array of 4 Q-values for [UP, RIGHT, DOWN, LEFT]
  const qTableRef = useRef<number[][]>(
    Array.from({ length: GRID_SIZE * GRID_SIZE }, () => [0, 0, 0, 0])
  );

  const isObstacle = useCallback((x: number, y: number) => {
    return obstacles.some((o) => o.x === x && o.y === y);
  }, [obstacles]);

  const toggleObstacle = (x: number, y: number) => {
    if ((x === START_POS.x && y === START_POS.y) || (x === GOAL_POS.x && y === GOAL_POS.y)) {
      return;
    }
    setObstacles((prev) => {
      const exists = prev.some((o) => o.x === x && o.y === y);
      if (exists) {
        return prev.filter((o) => !(o.x === x && o.y === y));
      } else {
        return [...prev, { x, y }];
      }
    });
  };

  // Step function for Reinforcement Learning (Q-Learning)
  const stepEnvironment = useCallback(() => {
    setRobotPos((curr) => {
      // Reached goal in previous step? Reset episode
      if (curr.x === GOAL_POS.x && curr.y === GOAL_POS.y) {
        setEpisode((e) => e + 1);
        setEpisodeReward(0);
        setCurrentActionDesc('Goal reached! Starting new training episode with updated Q-table.');
        return START_POS;
      }

      const s = curr.y * GRID_SIZE + curr.x;
      const qValues = qTableRef.current[s];

      // Epsilon-greedy action selection: explore less as episodes increase
      const epsilon = Math.max(0.05, 0.4 - episode * 0.03);
      let actionIdx = 0;

      if (Math.random() < epsilon) {
        // Explore: random action
        actionIdx = Math.floor(Math.random() * 4);
      } else {
        // Exploit: argmax Q
        let maxQ = -Infinity;
        qValues.forEach((q, idx) => {
          if (q > maxQ) {
            maxQ = q;
            actionIdx = idx;
          }
        });
      }

      const chosen = ACTIONS[actionIdx];
      let nextX = curr.x + chosen.dx;
      let nextY = curr.y + chosen.dy;

      // Wall boundary check
      if (nextX < 0 || nextX >= GRID_SIZE || nextY < 0 || nextY >= GRID_SIZE) {
        // Bumped boundary
        const penalty = -3;
        qTableRef.current[s][actionIdx] += 0.3 * (penalty - qTableRef.current[s][actionIdx]);
        setEpisodeReward((r) => r + penalty);
        setTotalReward((r) => r + penalty);
        setCurrentActionDesc(`Robot bumped perimeter wall moving ${chosen.name}. Penalty: -3.`);
        return curr;
      }

      // Obstacle check
      if (isObstacle(nextX, nextY)) {
        const penalty = -5;
        qTableRef.current[s][actionIdx] += 0.3 * (penalty - qTableRef.current[s][actionIdx]);
        setEpisodeReward((r) => r + penalty);
        setTotalReward((r) => r + penalty);
        setCurrentActionDesc(`Robot struck obstacle at (${nextX}, ${nextY})! Penalty: -5. Q-value lowered.`);
        return curr;
      }

      // Valid move to next cell
      let reward = -1; // standard step cost
      const reachedGoal = nextX === GOAL_POS.x && nextY === GOAL_POS.y;
      if (reachedGoal) {
        reward = +10;
        triggerCelebration();
        setCurrentActionDesc(`🎉 Victory! Reached Goal battery (+10 reward)!`);
      } else {
        setCurrentActionDesc(`Robot moved ${chosen.name} to (${nextX}, ${nextY}). Step penalty: -1.`);
      }

      // Bellman Q-Learning Update
      const nextS = nextY * GRID_SIZE + nextX;
      const maxNextQ = Math.max(...qTableRef.current[nextS]);
      const alpha = 0.3;
      const gamma = 0.85;
      qTableRef.current[s][actionIdx] += alpha * (reward + gamma * maxNextQ - qTableRef.current[s][actionIdx]);

      setEpisodeReward((r) => r + reward);
      setTotalReward((r) => r + reward);

      return { x: nextX, y: nextY };
    });
  }, [episode, isObstacle]);

  // Animation Loop
  useEffect(() => {
    if (!isRunning) return;
    const intervalTime = 600 / speed;
    const interval = setInterval(() => {
      stepEnvironment();
    }, intervalTime);
    return () => clearInterval(interval);
  }, [isRunning, speed, stepEnvironment]);

  const handleReset = () => {
    setIsRunning(false);
    setRobotPos(START_POS);
    setEpisode(1);
    setEpisodeReward(0);
    setTotalReward(0);
    qTableRef.current = Array.from({ length: GRID_SIZE * GRID_SIZE }, () => [0, 0, 0, 0]);
    setCurrentActionDesc('Maze reset. Q-table cleared.');
  };

  const predictionChallenge: PredictionChallenge = {
    question:
      'What happens when the robot encounters a newly placed obstacle directly on its previously learned path?',
    options: [
      {
        id: 'opt-penalize',
        label: 'It strikes the obstacle, receives a -5 penalty, lowers that action Q-value, and learns an alternate path.',
        isCorrect: true,
        explanation:
          'Reinforcement learning updates state-action values dynamically via environmental feedback. Penalties lower the expected return, steering policy away from danger.',
      },
      {
        id: 'opt-freeze',
        label: 'The robot freezes permanently because RL cannot adapt to dynamic changes.',
        isCorrect: false,
        explanation:
          'Incorrect. Reinforcement learning agents continue updating their Q-values through continuous trial and error.',
      },
      {
        id: 'opt-pass',
        label: 'The robot ignores the obstacle and walks through it.',
        isCorrect: false,
        explanation:
          'Incorrect. The environment model enforces collision constraints, penalizing obstacle contact.',
      },
    ],
  };

  return (
    <ScenarioFrame
      title="Scenario A: Robot Learning a Maze (Reinforcement Learning)"
      badge="Reinforcement Learning • Agent & Environment"
      badgeColor="bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300 border-amber-300 dark:border-amber-800"
      story="A mobile rover starts with zero knowledge of the maze. Watch it explore randomly, bump into walls and obstacles, receive feedback penalties, and gradually learn an optimal policy to reach the energy star."
      isRunning={isRunning}
      onTogglePlay={() => setIsRunning(!isRunning)}
      onStep={stepEnvironment}
      onReset={handleReset}
      speed={speed}
      onSpeedChange={setSpeed}
      prediction={predictionChallenge}
      userPrediction={userPrediction}
      onSelectPrediction={setUserPrediction}
      currentStepDescription={currentActionDesc}
      scientificExplanation="The robot implements Q-Learning (Watkins, 1989). An action a taken in state s yields reward R and transition to s'. The Bellman update Q(s, a) ← Q(s, a) + α[R + γ max Q(s', a') - Q(s, a)] propagates value backwards from the goal reward (+10), teaching the agent to avoid step penalties (-1) and obstacle collisions (-5)."
      formalConcept="Module 5 Form of Learning #3: Reinforcement Learning. Unlike supervised learning where teacher labels exist, an RL agent learns purely by active interaction with its environment through numerical rewards and penalties."
      followUpChallenge="Click any empty grid cell to add an obstacle while the robot is running and observe how it redirects its learned path!"
      telemetry={
        <>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-400">Episode</span>
            <span className="font-bold text-amber-500 text-sm">#{episode}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-400">Step Reward</span>
            <span className={`font-bold text-sm ${episodeReward >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
              {episodeReward}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-slate-400">Cumulative</span>
            <span className="font-bold text-blue-500 text-sm">{totalReward}</span>
          </div>
        </>
      }
    >
      {/* 5x5 Maze Canvas */}
      <div className="p-6 sm:p-8 flex flex-col items-center select-none">
        <div className="flex items-center justify-between w-full max-w-md mb-4 text-xs text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <Zap className="w-3.5 h-3.5" /> Start: (0, 0)
          </span>
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
            <input
              type="checkbox"
              checked={showQValues}
              onChange={(e) => setShowQValues(e.target.checked)}
              className="rounded accent-amber-500"
            />
            Show Policy Vectors
          </label>
          <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
            <Trophy className="w-3.5 h-3.5" /> Goal: (4, 4)
          </span>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-5 gap-2.5 p-3 rounded-2xl bg-slate-900 border-2 border-slate-800 shadow-2xl">
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
            const x = idx % GRID_SIZE;
            const y = Math.floor(idx / GRID_SIZE);
            const isRobotHere = robotPos.x === x && robotPos.y === y;
            const isGoalHere = GOAL_POS.x === x && GOAL_POS.y === y;
            const isObstacleHere = isObstacle(x, y);

            // Compute best action arrow for this cell
            const q = qTableRef.current[idx];
            let maxActionIdx = 0;
            let maxQ = -Infinity;
            q.forEach((v, i) => {
              if (v > maxQ) {
                maxQ = v;
                maxActionIdx = i;
              }
            });
            const hasLearnedVector = maxQ > -4 && maxQ !== 0 && !isObstacleHere && !isGoalHere;

            return (
              <div
                key={idx}
                onClick={() => toggleObstacle(x, y)}
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex flex-col items-center justify-center relative cursor-pointer transition-all duration-300 border ${
                  isObstacleHere
                    ? 'bg-rose-950/70 border-rose-700 text-rose-300 shadow-inner'
                    : isGoalHere
                    ? 'bg-amber-950/80 border-amber-500 text-amber-300 animate-pulse'
                    : isRobotHere
                    ? 'bg-brand-950 border-brand-500 text-white'
                    : 'bg-slate-800/60 border-slate-700/60 hover:border-slate-500'
                }`}
                title={`Cell (${x}, ${y}) - Click to toggle obstacle`}
              >
                {/* Cell Coordinates */}
                <span className="absolute top-1 left-1.5 text-[8px] font-mono text-slate-500">
                  {x},{y}
                </span>

                {/* Obstacle Icon */}
                {isObstacleHere && (
                  <ShieldAlert className="w-6 h-6 text-rose-500 animate-bounce" />
                )}

                {/* Goal Icon */}
                {isGoalHere && !isRobotHere && (
                  <div className="flex flex-col items-center">
                    <Trophy className="w-6 h-6 text-amber-400" />
                    <span className="text-[8px] font-black uppercase text-amber-300">+10</span>
                  </div>
                )}

                {/* Policy Arrow */}
                {showQValues && hasLearnedVector && !isRobotHere && (
                  <div className="text-brand-400 opacity-60">
                    {maxActionIdx === 0 && <ArrowUp className="w-4 h-4" />}
                    {maxActionIdx === 1 && <ArrowRight className="w-4 h-4" />}
                    {maxActionIdx === 2 && <ArrowDown className="w-4 h-4" />}
                    {maxActionIdx === 3 && <ArrowLeft className="w-4 h-4" />}
                  </div>
                )}

                {/* Animated Robot Agent SVG */}
                {isRobotHere && (
                  <div className="transform transition-transform duration-300 scale-110 z-20 flex flex-col items-center">
                    <svg viewBox="0 0 36 36" className="w-9 h-9 drop-shadow-lg">
                      {/* Antenna */}
                      <line x1="18" y1="6" x2="18" y2="1" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="18" cy="1" r="2" fill="#38bdf8" className="animate-ping" />
                      {/* Head */}
                      <rect x="6" y="6" width="24" height="20" rx="6" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
                      {/* Eyes */}
                      <circle cx="13" cy="14" r="3" fill="#ffffff" />
                      <circle cx="13" cy="14" r="1.5" fill="#0f172a" />
                      <circle cx="23" cy="14" r="3" fill="#ffffff" />
                      <circle cx="23" cy="14" r="1.5" fill="#0f172a" />
                      {/* Mouth */}
                      <rect x="12" y="20" width="12" height="2" rx="1" fill="#38bdf8" />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 text-[11px] text-slate-400 flex items-center gap-4">
          <span>💡 Click any grid square to insert or remove an obstacle</span>
          <span>• Blue arrows show learned policy direction</span>
        </div>
      </div>
    </ScenarioFrame>
  );
};
