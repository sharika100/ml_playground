# 🤖 ML Playground

[![Production Deployment](https://img.shields.io/badge/Vercel-Live_Site-success?logo=vercel&style=for-the-badge)](https://ml-playground-lilac.vercel.app)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black&style=for-the-badge)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white&style=for-the-badge)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?logo=vite&logoColor=white&style=for-the-badge)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwindcss&logoColor=white&style=for-the-badge)](https://tailwindcss.com)

> **Machine Learning made simple. Understanding made interactive.**  
> *Explore concepts. Play with models. Understand the maths. Discover how machines learn.*

🔗 **Live Production Website:** [https://ml-playground-lilac.vercel.app](https://ml-playground-lilac.vercel.app)  
📺 **Official YouTube Channel:** [@sharikatr](https://youtube.com/@sharikatr)

---

## 🌟 About the Project

**ML Playground** is an interactive, open-access machine learning educational platform designed for computer science engineering students and ML practitioners. 

Rather than treating machine learning as a passive digital textbook, **ML Playground** provides:
1. **Interactive Educational Scenarios**: Watch algorithms in action with controllable parameters, animated agents, step-by-step playback, and visible decision boundaries.
2. **Interactive Math & Formula Derivations**: Step-by-step mathematical breakdowns of Shannon Entropy, Information Gain, Least Squares Regression, and Cost Functions using KaTeX notation with zero unexplained jumps.
3. **Rigorous Numerical Solvers**: Real-time calculators that compute exact class distributions, weighted branch entropies, and polynomial fit curves.
4. **Lecture Video Integration**: Curated video lectures aligned with the curriculum created by **Sharika T R**.

---

## 🚀 Key Features

### 1. 🤖 "Teach the Machine: Sorter Bot 3000" (Hero Scenario)
- **Expressive Robot Classifier**: Illustrated SVG robot character that dynamically changes facial expressions (scanning beams, celebratory smile on correct predictions, puzzled reaction on misclassifications).
- **Dual Realistic Datasets**:
  - *Fruit Quality Sorter*: Grade A Apples 🍎 vs Grade B Lemons 🍋 based on sugar sweetness ($^\circ\text{Bx}$).
  - *Smart Spam Filter*: Threat Spam 🚨 vs Legitimate Work 💼 based on suspicion index.
- **Dynamic Decision Boundary**: Interactive threshold slider ($\theta$) that sets the decision rule ($x \ge \theta$).
- **Predictive Pre-Experiment Challenge**: Asks students to deduce consequences (e.g., False Positives / Type I errors) before running the simulation.
- **Formal Theory Bridge**: Explicitly connects the interactive simulation to Feature vectors ($x$), Ground Truth ($y$), Classifier Hypothesis ($\hat{y} = f(x; \theta)$), and 0-1 Loss functions ($L(y, \hat{y})$).

### 2. 🎬 5 Real Animated Learning Scenarios
Located in the dedicated **Animated Scenarios Gallery** (`/scenarios`):
- **🤖 Robot in a Grid (Reinforcement Learning)**: Observe an agent explore a grid world, receive positive/negative rewards, update its Q-table, and discover the optimal policy path.
- **✉️ Spam Classifier Stream (Text Bag-of-Words)**: Watch emails stream onto a conveyor belt, extract word tokens, compute likelihoods, and classify messages.
- **🌲 Decision Tree Forest Journey (ID3 / Information Gain)**: Follow a decision tree as it splits candidates by maximum Information Gain.
- **🎯 2D Customer Clustering (K-Means Centroids)**: Watch centroids iteratively move toward the mean of their assigned data clusters.
- **💬 Aspect-Based Sentiment Analysis (NLP Token Attention)**: Highlight tokens and observe aspect sentiment extraction in natural language reviews.

### 3. 🧪 Interactive Laboratories
- **Shannon Entropy Explorer**: Live 10-token interactive gauge calculating $H(S) = -\sum p_i \log_2(p_i)$ in real time.
- **Information Gain Calculator**: Step-by-step parent entropy and weighted child split calculations.
- **Decision Tree Builder**: Interactive tree construction with live candidate splits on the classic *Play Tennis* dataset.
- **Linear & Polynomial Regression Lab**: Interactive scatter plots, movable regression lines, residual error indicators, and live Mean Squared Error (MSE) / $R^2$ scores.
- **Learning Paradigm Classifier**: Interactive card sorter matching dilemmas to Supervised, Unsupervised, or Reinforcement Learning paradigms.

### 4. 📚 5 Structured Curriculum Modules
1. **Introduction to Machine Learning**: Definitions, paradigms, ML lifecycle, and the classic Play Tennis problem.
2. **Concept Learning & Candidate Elimination**: Hypothesis spaces, Version Space, and Find-S algorithm.
3. **Decision Tree Learning & ID3**: Entropy, Information Gain, ID3 steps, and inductive bias.
4. **Regression, Overfitting & Model Evaluation**: Linear regression, MSE, polynomial fitting, overfitting, and regularization.
5. **Advanced Topics & Review**: Clustering, Naive Bayes, evaluation metrics, and comprehensive revision flashcards.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Math Formatting**: [KaTeX](https://katex.org/)
- **Celebration Animations**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 💻 Local Development Setup

To run ML Playground locally:

```bash
# Clone the repository
git clone https://github.com/sharika100/ml_playground.git

# Navigate into the project directory
cd ml_playground

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

### Building for Production

```bash
# Type check and build optimized bundle
npm run build

# Preview the production build locally
npm run preview
```

---

## 👩‍🏫 Creator & Institutional Attribution

- **Creator & Lead Educator**: **Sharika T R**  
  *Assistant Professor, Department of Computer Science and Engineering*
- **Institution**: **[Adi Shankara Institute of Engineering and Technology (ASIET)](https://www.adishankara.ac.in/)**, Kalady, Kerala, India.
- **Official YouTube Channel**: [https://youtube.com/@sharikatr](https://youtube.com/@sharikatr)

---

## 📄 License

This educational project is open access for students, educators, and lifelong learners.
