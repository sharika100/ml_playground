import confetti from 'canvas-confetti';

export function triggerCelebration() {
  try {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#0c8de4', '#10b981', '#f59e0b', '#8b5cf6'],
    });
  } catch (e) {
    console.log('Celebration triggered', e);
  }
}
