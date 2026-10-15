import { LessonSection } from '../types';

export const CURRICULUM: LessonSection[] = [
  // TOPIC 1
  {
    id: 'topic-1',
    topicNumber: 1,
    title: 'Learning from Examples',
    subtitle: 'How intelligent agents improve future behaviour through observations and experience',
    estimatedMinutes: 15,
    category: 'core',
    hook: {
      question: 'How does an infant learn to identify a dog without someone writing 10,000 lines of geometry code?',
      scenario: 'Imagine trying to write traditional computer code with IF-ELSE rules to recognize every dog in the world. Between Chihuahuas, Golden Retrievers, and Pugs in various lighting conditions, explicit rules fail completely. Instead, humans learn by observing hundreds of examples!',
    },
    intuition: {
      story: 'Machine Learning flips classical programming on its head. In traditional programming, humans write explicit rules and feed in data to get answers. In Machine Learning, we feed in data and past answers (examples), and the computer induces the rules on its own!',
      keyTakeaway: 'Learning is not merely memorizing past facts—it is discovering patterns from past observations that generalize reliably to unseen situations.',
    },
    formal: {
      definition: 'An agent is learning if it improves its performance on future tasks after making observations about the world (Russell & Norvig; Module 5 Notes).',
      terminology: [
        { term: 'Task (T)', definition: 'The specific problem or objective we wish to resolve, such as image classification, price prediction, or disease screening.' },
        { term: 'Experience (E)', definition: 'The historical observations, training dataset, or environmental interactions provided to the learning agent.' },
        { term: 'Performance (P)', definition: 'A quantitative metric measuring how effectively the agent resolves the task (e.g., accuracy percentage, mean squared error).' },
        { term: 'Generalization', definition: 'The capacity of a learned model to make accurate predictions on novel, unseen data that was not present in the training set.' },
      ],
    },
    visualExplanation: {
      summary: 'Explore how providing consistent vs noisy examples shapes an agent’s internal decision boundary.',
      interactiveType: 'sorter',
    },
    mathsSimple: {
      whyNeeded: 'Tom Mitchell formally defined machine learning mathematically to allow engineers to prove whether an algorithm is truly improving.',
      formulaLatex: 'P(T, E_2) > P(T, E_1) \\quad \\text{where } |E_2| > |E_1|',
      symbols: [
        { symbol: 'T', meaning: 'The machine learning task under evaluation' },
        { symbol: 'E', meaning: 'The volume or quality of experience / training examples' },
        { symbol: 'P', meaning: 'The measured performance score on the evaluation set' },
      ],
      numericalExample: {
        problem: 'A spam filter is evaluated before and after training on 5,000 newly confirmed spam emails.',
        steps: [
          { stepName: 'Baseline Performance', calculation: 'P(T, E_1)', result: '82.4% accuracy', explanation: 'Initial performance on a 1,000 email test set.' },
          { stepName: 'Experience Ingestion', calculation: 'E_2 = E_1 + 5,000 emails', result: '5,000 pairs added', explanation: 'The model extracts new frequency features from spam keywords.' },
          { stepName: 'Post-Training Performance', calculation: 'P(T, E_2)', result: '96.1% accuracy', explanation: 'Performance improved significantly (+13.7%), demonstrating genuine machine learning.' },
        ],
        finalMeaning: 'Because performance on future tasks strictly increased with experience, the system satisfies Mitchell’s definition of learning.',
      },
    },
    tryItYourself: {
      instruction: 'Consider real-world applications mentioned in the source materials: Speech Recognition (voice to text), Medical Diagnosis (CT scans), Self-Driving Cars, and Email Spam Filtering.',
      prompt: 'Why would hard-coded IF-ELSE rules fail for Speech Recognition (e.g., Siri, Google Assistant)?',
      solution: 'Because human voices have infinite variations in pitch, accents, ambient room noise, and speech speed. Only statistical models learning phoneme acoustic patterns from examples can achieve high transcription accuracy.',
    },
    video: {
      title: 'Artificial Intelligence & Machine Learning Overview',
      youtubeUrl: 'https://youtube.com/@sharikatr',
      summary: 'Foundational lecture by Sharika T R introducing agent performance, tasks, and the evolution of learning systems.',
    },
    knowledgeCheck: [
      {
        id: 'q1-1',
        question: 'According to Russell & Norvig and the course notes, when is an intelligent agent said to be learning?',
        options: [
          'When it stores all past training instances in a high-speed database',
          'If it improves its performance on future tasks after making observations about the world',
          'When it generates random responses until one succeeds',
          'Only when it is connected to a live internet connection',
        ],
        correctAnswer: 1,
        explanation: 'Correct! Learning is formally defined by performance improvement on novel tasks through observation, not passive data storage.',
      },
      {
        id: 'q1-2',
        question: 'Which of the following is NOT one of the three foundational aspects of Machine Learning?',
        options: [
          'Task (T)',
          'Experience (E)',
          'Performance (P)',
          'Hardware Clock Speed (H)',
        ],
        correctAnswer: 3,
        explanation: 'Correct! The foundational framework consists of Task, Experience, and Performance.',
      },
    ],
    summary: {
      keyPoints: [
        'Learning replaces brittle manual rule writing with inductive discovery from examples.',
        'The three key pillars of ML are Task (what to solve), Experience (historical observations), and Performance (measured success).',
        'Real-world applications span healthcare diagnosis, speech recognition, traffic routing, product recommendation, and automated translation.',
      ],
      revisionChecklist: [
        'Can I recite the formal definition of learning for an intelligent agent?',
        'Can I distinguish between Task, Experience, and Performance in a given case study?',
        'Can I explain why explicit rule-based systems fail in complex domains?',
      ],
    },
  },

  // TOPIC 2
  {
    id: 'topic-2',
    topicNumber: 2,
    title: 'Forms of Learning',
    subtitle: 'Supervised, Unsupervised, Reinforcement, and Semi-Supervised Learning',
    estimatedMinutes: 20,
    category: 'core',
    hook: {
      question: 'Does a child learn everything with a teacher grading every step, or do they also explore and learn from mistakes?',
      scenario: 'Sometimes a teacher checks every flashcard (Supervised). Sometimes you organize your bookshelf by color without anyone telling you how (Unsupervised). Sometimes you learn to ride a bicycle by falling and finding balance (Reinforcement)!',
    },
    intuition: {
      story: 'Different problems have fundamentally different kinds of feedback. Some have exact ground-truth answer keys; some have only raw observations; others have dynamic reward signals over time.',
      keyTakeaway: 'The type of learning algorithm you choose is dictated by what feedback signal exists in the environment.',
    },
    formal: {
      definition: 'The four fundamental learning paradigms identified in the syllabus differ in the presence, nature, and timing of supervisory feedback.',
      terminology: [
        { term: 'Supervised Learning', definition: 'The machine is trained on labeled input-output pairs (x, y) with the goal of learning a mapping function y = f(x).' },
        { term: 'Unsupervised Learning', definition: 'The machine is provided only with input samples x without target labels y, with the objective to discover hidden structures, clusters, or associations.' },
        { term: 'Reinforcement Learning', definition: 'An active agent explores an environment, takes sequential actions, and receives scalar rewards or penalties to maximize cumulative expected return.' },
        { term: 'Semi-Supervised Learning', definition: 'Combines a small amount of labeled data with a large amount of unlabeled data to overcome high annotation costs.' },
      ],
    },
    visualExplanation: {
      summary: 'Practice sorting real-world scenarios into their correct learning paradigm in our interactive classifier.',
      interactiveType: 'sorter',
    },
    mathsSimple: {
      whyNeeded: 'Mathematically distinguishing the data structures clarifies the learning objective.',
      formulaLatex: '\\begin{aligned} \\text{Supervised:}&\\quad \\mathcal{D} = \\{(x_i, y_i)\\}_{i=1}^N \\\\[4pt] \\text{Unsupervised:}&\\quad \\mathcal{D} = \\{x_i\\}_{i=1}^N \\end{aligned}',
      symbols: [
        { symbol: 'x_i', meaning: 'Feature vector representing the i-th input observation' },
        { symbol: 'y_i', meaning: 'Ground-truth target label (discrete class or continuous value)' },
        { symbol: 'N', meaning: 'Total number of sample instances in the dataset' },
      ],
      numericalExample: {
        problem: 'Contrast the data format for House Price Prediction (Supervised) vs Market Basket Association (Unsupervised).',
        steps: [
          { stepName: 'Supervised Pair', calculation: '(\\mathbf{x}, y) = ([2000\\text{ sqft}, 3\\text{ beds}], \\text{USD } 450{,}000)', result: 'y \\in \\mathbb{R} \\; (\\text{target outcome})', explanation: 'Supervised dataset pairs each input feature vector x with a known ground-truth supervisor y.' },
          { stepName: 'Unsupervised Set', calculation: '\\mathbf{x} = \\{\\text{Bread, Butter, Milk}\\}', result: '\\text{unlabelled observation}', explanation: 'Model discovers hidden item associations directly without any target label y.' },
        ],
        finalMeaning: 'Supervised problems evaluate prediction error against y; unsupervised problems evaluate clustering cohesion or association support.',
      },
    },
    tryItYourself: {
      instruction: 'Test your understanding on the classic age estimation paradox from the notes.',
      prompt: 'If people lie about their age on photos, why is this semi-supervised or unsupervised rather than purely supervised?',
      solution: 'Because the self-reported labels are systematically contaminated with noise. Discovering the true latent distribution requires uncovering structural facial patterns from thousands of unlabeled images alongside the noisy labels.',
    },
    video: {
      title: 'Forms of Learning Explained',
      youtubeUrl: 'https://youtube.com/@sharikatr',
      summary: 'Sharika T R breaks down Supervised vs Unsupervised vs Reinforcement learning with intuitive real-world examples.',
    },
    knowledgeCheck: [
      {
        id: 'q2-1',
        question: 'Which learning paradigm is appropriate when an agent must learn through trial and error by receiving rewards or penalties?',
        options: [
          'Unsupervised Clustering',
          'Reinforcement Learning',
          'Linear Regression',
          'Association Rule Mining',
        ],
        correctAnswer: 1,
        explanation: 'Correct! Reinforcement learning is feedback-based where agents maximize cumulative rewards.',
      },
      {
        id: 'q2-2',
        question: 'Market Basket Analysis (discovering that customers who buy bread also buy butter) is an example of which paradigm?',
        options: [
          'Supervised Classification',
          'Reinforcement Policy Learning',
          'Unsupervised Association',
          'Semi-Supervised Regression',
        ],
        correctAnswer: 2,
        explanation: 'Correct! Association rules uncover relationships between variables without pre-existing target labels.',
      },
    ],
    summary: {
      keyPoints: [
        'Supervised learning requires labeled pairs (x, y) for classification and regression.',
        'Unsupervised learning discovers clusters (K-Means) or association rules (Apriori) without target outputs.',
        'Reinforcement learning optimizes actions to maximize cumulative reward over time.',
        'Semi-supervised learning drastically lowers data annotation costs by leveraging abundant unlabeled data.',
      ],
      revisionChecklist: [
        'Can I give two real-world examples for each of the 4 forms of learning?',
        'Can I explain why unsupervised learning is NOT just supervised learning without a teacher?',
        'Can I identify the role of cumulative rewards in reinforcement learning?',
      ],
    },
  },

  // TOPIC 3
  {
    id: 'topic-3',
    topicNumber: 3,
    title: 'Supervised Learning & Decision Trees',
    subtitle: 'Attribute Selection Measures, Shannon Entropy, Information Gain, and Tree Induction',
    estimatedMinutes: 25,
    category: 'core',
    hook: {
      question: 'How do 20 Questions games guess what you are thinking in under 20 queries?',
      scenario: 'A great 20-Questions player never asks "Is it specifically a golden retriever?" on question 1. That would only eliminate one possibility. Instead, they ask: "Is it alive?"—splitting the entire hypothesis space in half! That is Information Gain in action!',
    },
    intuition: {
      story: 'A Decision Tree is an upside-down tree where the root is at the top. Each internal node tests a feature, each branch represents a possible value, and each leaf node returns a final classification decision.',
      keyTakeaway: 'The goal of decision tree induction is to construct a compact, highly accurate tree by always testing the most informative attribute first.',
    },
    formal: {
      definition: 'A Decision Tree represents a function that takes as input a vector of attribute values and returns a single output decision via recursive partitioning.',
      terminology: [
        { term: 'Root Node', definition: 'The topmost decision node in the tree containing the entire initial dataset.' },
        { term: 'Decision Node', definition: 'An internal node with two or more branches representing an attribute test.' },
        { term: 'Leaf (Terminal) Node', definition: 'A node that makes a final classification prediction and contains no further branches.' },
        { term: 'Shannon Entropy H(S)', definition: 'A thermodynamic-derived metric measuring the impurity, randomness, or disorder of class labels in a dataset.' },
        { term: 'Information Gain IG(S, A)', definition: 'The expected reduction in entropy achieved by partitioning dataset S based on attribute A.' },
        { term: 'Gini Index', definition: 'A measure of impurity used in CART: Gini = 1 - sum(p_j^2). Prefers lower values.' },
        { term: 'Pruning', definition: 'The process of removing unnecessary branches to prevent overfitting (Cost Complexity and Reduced Error Pruning).' },
      ],
    },
    visualExplanation: {
      summary: 'Build your own decision tree and inspect real-time entropy curves and child subsets in our Tree Lab.',
      interactiveType: 'tree',
    },
    mathsSimple: {
      whyNeeded: 'Decision tree algorithms (like ID3 and C4.5) require a rigorous mathematical criterion to decide which attribute should be placed at the root node.',
      formulaLatex: '\\begin{aligned} H(S) &= -\\sum_{i=1}^{c} p_i \\log_2(p_i) \\\\[6pt] \\text{Gain}(S, A) &= H(S) - \\sum_{v \\in \\text{Values}(A)} \\frac{|S_v|}{|S|} H(S_v) \\end{aligned}',
      symbols: [
        { symbol: 'H(S)', meaning: 'Shannon Entropy of dataset S in bits' },
        { symbol: 'p_i', meaning: 'Proportion of samples in S belonging to class i' },
        { symbol: 'c', meaning: 'Number of distinct target classes (c = 2 for binary classification)' },
        { symbol: '\\text{Gain}(S, A)', meaning: 'Information Gain obtained by splitting on attribute A' },
        { symbol: '\\frac{|S_v|}{|S|}', meaning: 'Weight (fraction of total samples) falling into branch v' },
      ],
      numericalExample: {
        problem: 'Play Tennis Dataset: Total 14 days, with 9 "Yes" and 5 "No". Compute H(S).',
        steps: [
          { stepName: 'Calculate Class Probabilities', calculation: 'P(\\text{Yes}) = \\frac{9}{14} \\approx 0.643, \\quad P(\\text{No}) = \\frac{5}{14} \\approx 0.357', result: 'p_1 = 0.643, \\; p_2 = 0.357', explanation: 'Proportions of positive and negative examples in parent dataset S.' },
          { stepName: 'Compute Logarithms base 2', calculation: '\\log_2(9/14) \\approx -0.637, \\quad \\log_2(5/14) \\approx -1.485', result: '-0.637, \\; -1.485', explanation: 'Using base 2 since information uncertainty is measured in binary bits.' },
          { stepName: 'Substitute into Entropy Formula', calculation: 'H(S) = - [0.643 \\cdot (-0.637)] - [0.357 \\cdot (-1.485)]', result: '\\approx 0.4098 + 0.5305 = 0.9403', explanation: 'Intermediate product terms summed together.' },
          { stepName: 'Final Shannon Entropy', calculation: 'H(S) = -\\sum_{i=1}^c p_i \\log_2(p_i)', result: 'H(S) \\approx 0.9403 \\text{ bits} \\; (0.940)', explanation: 'The parent dataset has 0.9403 bits of impurity (randomness).' },
        ],
        finalMeaning: 'Because 0.940 is close to 1.0, there is high uncertainty. Splitting on Outlook yields Information Gain = 0.247 bits (the highest of all attributes), making Outlook the optimal root node.',
      },
    },
    tryItYourself: {
      instruction: 'Inspect what happens when a node is 100% pure (e.g. Overcast has 4 Yes and 0 No).',
      prompt: 'What is the entropy of a pure node where P(\\text{Yes}) = 1.0 and P(\\text{No}) = 0.0?',
      solution: 'H(S) = - (1.0 \\cdot \\log_2(1.0)) - (0 \\cdot \\log_2(0)) = 0.0 \\text{ bits}. By convention, \\lim_{p \\to 0} p \\log_2(p) = 0. Pure nodes have zero uncertainty and immediately become leaf nodes.',
    },
    video: {
      title: '3 INPUT Decision Tree Problem (Module 5)',
      youtubeUrl: 'https://youtube.com/@sharikatr',
      summary: 'Step-by-step numerical derivation by Sharika T R solving a full 3-attribute decision tree problem using entropy and information gain.',
    },
    knowledgeCheck: [
      {
        id: 'q3-1',
        question: 'If a branch receives 8 "Yes" and 0 "No" examples, what is the Shannon Entropy of this subset?',
        options: ['1.0 bits', '0.5 bits', '0.0 bits', '8.0 bits'],
        correctAnswer: 2,
        explanation: 'Correct! When all instances belong to the same class (100% pure), uncertainty is zero, so Entropy = 0.',
      },
      {
        id: 'q3-2',
        question: 'In the ID3 algorithm, which attribute is selected to split a decision node?',
        options: [
          'The attribute with the lowest information gain',
          'The attribute with the highest information gain',
          'The attribute with the highest Gini index',
          'The attribute with the most missing values',
        ],
        correctAnswer: 1,
        explanation: 'Correct! ID3 is a greedy algorithm that chooses the attribute yielding the MAXIMUM reduction in entropy (highest Information Gain).',
      },
      {
        id: 'q3-3',
        question: 'What is the primary purpose of decision tree pruning?',
        options: [
          'To increase the size of the tree so it memorizes the training data',
          'To delete unnecessary nodes and prevent overfitting without sacrificing accuracy',
          'To convert continuous variables into binary integers',
          'To enforce a single branch at every level',
        ],
        correctAnswer: 1,
        explanation: 'Correct! Pruning cuts down noisy or overly specific branches to stop overfitting and enhance generalization.',
      },
    ],
    summary: {
      keyPoints: [
        'Decision trees represent functions via sequences of attribute tests leading to leaf decisions.',
        'Shannon Entropy measures label impurity: 0 for completely pure sets, 1.0 for equally balanced binary sets.',
        'Information Gain is the difference between parent entropy and weighted child subset entropy.',
        'Pruning (Cost Complexity and Reduced Error) keeps decision trees generalizable and prevents overfitting.',
      ],
      revisionChecklist: [
        'Can I calculate binary entropy H(S) given counts of Yes and No?',
        'Can I calculate weighted child entropy for a split and compute Information Gain?',
        'Can I define Root Node, Decision Node, Leaf Node, and Pruning?',
      ],
    },
  },

  // TOPIC 4
  {
    id: 'topic-4',
    topicNumber: 4,
    title: 'Evaluating and Choosing the Best Hypothesis',
    subtitle: 'Hypothesis Spaces, Ockham’s Razor, Generalization, and the Bias-Variance Tradeoff',
    estimatedMinutes: 20,
    category: 'core',
    hook: {
      question: 'If a student memorizes every past exam question with 100% accuracy, why might they fail the final test?',
      scenario: 'Student Y memorized every comma in the textbook. On the test, when the teacher changed a number from 5 to 7, Student Y was lost! Meanwhile, Student Z learned the underlying concept and aced the exam. In ML, Student Y is an overfitted model!',
    },
    intuition: {
      story: 'Given a small set of data points, an infinite number of mathematical curves can pass through them. A degree-1 line might miss some points slightly, while a degree-7 polynomial touches every single point by making wild, spiky loops. Which curve should you trust?',
      keyTakeaway: 'Fitting the training data perfectly is easy; predicting the future accurately requires choosing a hypothesis that captures true structure rather than memorizing random noise.',
    },
    formal: {
      definition: 'Learning is a search through the space of possible hypotheses H for one hypothesis h* that will perform well on new examples beyond the training set (Russell & Norvig).',
      terminology: [
        { term: 'Hypothesis Space (H)', definition: 'The set of all possible candidate functions or models the algorithm is permitted to entertain.' },
        { term: 'Consistent Hypothesis', definition: 'A hypothesis that agrees with all observed training data points without error.' },
        { term: 'Ockham’s Razor', definition: 'The philosophical and scientific principle: "Entities should not be multiplied beyond necessity." In ML: prefer the simplest hypothesis consistent with the data.' },
        { term: 'Realizability', definition: 'A learning problem is realizable if the true target function f is contained within the hypothesis space H.' },
        { term: 'Overfitting', definition: 'When a model captures noise and idiosyncrasies in the training data, exhibiting low training error (low bias) but catastrophic test error (high variance).' },
        { term: 'Train / Test Split', definition: 'Dividing dataset (typically 80% train, 20% test) to detect overfitting before deploying the model.' },
      ],
    },
    visualExplanation: {
      summary: 'Adjust polynomial complexity from degree 1 to 6 in our hypothesis lab to watch the generalization gap explode.',
      interactiveType: 'hypothesis',
    },
    mathsSimple: {
      whyNeeded: 'Bayesian formulation explains why simple hypotheses should be prioritized mathematically through prior probabilities.',
      formulaLatex: 'h^* = \\arg\\max_{h \\in H} P(h \\mid \\mathcal{D}) = \\arg\\max_{h \\in H} \\left[ P(\\mathcal{D} \\mid h) \\cdot P(h) \\right]',
      symbols: [
        { symbol: 'h^*', meaning: 'The most probable optimal hypothesis given the dataset' },
        { symbol: 'P(\\mathcal{D} \\mid h)', meaning: 'Likelihood: how closely hypothesis h fits the observed data' },
        { symbol: 'P(h)', meaning: 'Prior probability: assigns higher prior probability to simpler models and low probability to sharp, wild curves' },
      ],
      numericalExample: {
        problem: 'Compare a straight line (Degree 1) vs a Degree 6 polynomial fitted to 7 training points with 3 unseen test points.',
        steps: [
          { stepName: 'Train Error (Degree 1)', calculation: '\\text{MSE}_{\\text{train}} = \\frac{1}{7} \\sum_{i=1}^7 (y_i - \\hat{y}_i)^2', result: '0.082', explanation: 'Slight residual error on training data (underfitting is minimal).' },
          { stepName: 'Train Error (Degree 6)', calculation: '\\text{MSE}_{\\text{train}} = \\frac{1}{7} \\sum_{i=1}^7 0^2', result: '0.000', explanation: 'Zero training error! Touches every single point exactly.' },
          { stepName: 'Test Error Comparison', calculation: '\\text{MSE}_{\\text{test}}(\\text{deg 1}) = 0.095 \\quad \\text{vs} \\quad \\text{MSE}_{\\text{test}}(\\text{deg 6}) = 14.82', result: '\\text{Degree 1 wins by } 150\\times', explanation: 'The Degree 6 curve oscillates wildly between points, causing immense error on new data.' },
        ],
        finalMeaning: 'Even though Degree 6 had a "perfect" training score, Degree 1 generalizes vastly better. This proves Ockham’s Razor empirically.',
      },
    },
    tryItYourself: {
      instruction: 'List 3 practical techniques taught in the source notes to prevent overfitting.',
      prompt: 'What are the main remedies against overfitting discussed in page 20 of the notes?',
      solution: '1. Early Stopping (halt training before learning noise), 2. Train with more data (helps discover true relationships), 3. Feature Selection (remove irrelevant noise features), 4. Cross-Validation (K-fold), 5. Data Augmentation, and 6. Ensemble Methods (Bagging and Boosting).',
    },
    video: {
      title: 'Evaluating Hypotheses & Overfitting',
      youtubeUrl: 'https://youtube.com/@sharikatr',
      summary: 'Sharika T R explains hypothesis spaces, polynomial fitting, and strategies to prevent overfitting in machine learning.',
    },
    knowledgeCheck: [
      {
        id: 'q4-1',
        question: 'What is Ockham’s Razor in the context of Machine Learning hypothesis selection?',
        options: [
          'Always choose the algorithm that uses the most computational memory',
          'Prefer the simplest hypothesis consistent with the observed data',
          'Discard all training data points that do not fall on an integer line',
          'Never use polynomials under any circumstances',
        ],
        correctAnswer: 1,
        explanation: 'Correct! Ockham’s razor states that simpler models (e.g. degree 1 or 2) generalize better than needlessly convoluted models.',
      },
      {
        id: 'q4-2',
        question: 'An overfitted machine learning model is characterized by which statistical property?',
        options: [
          'High bias and high variance',
          'Low bias and high variance',
          'High bias and low variance',
          'Zero variance and zero bias',
        ],
        correctAnswer: 1,
        explanation: 'Correct! Overfitting exhibits low bias (fits training data too closely) and high variance (sensitive to minor fluctuations).',
      },
    ],
    summary: {
      keyPoints: [
        'Multiple consistent hypotheses can fit the same training dataset.',
        'Ockham’s razor provides a principled heuristic: prefer the simplest model that explains the data.',
        'Overfitting occurs when a model captures random noise rather than true underlying patterns.',
        'Mitigate overfitting with train-test splits, cross-validation, feature selection, early stopping, and ensemble methods.',
      ],
      revisionChecklist: [
        'Can I explain why zero training error does not imply a good machine learning model?',
        'Can I define the bias-variance tradeoff in plain language?',
        'Can I explain the role of prior probabilities P(h) in Bayesian model selection?',
      ],
    },
  },

  // TOPIC 5
  {
    id: 'topic-5',
    topicNumber: 5,
    title: 'Regression & Classification with Linear Models',
    subtitle: 'Linear Equations, Best Fit Line, Mean Squared Error, Gradient Descent, and R²',
    estimatedMinutes: 25,
    category: 'core',
    hook: {
      question: 'How do banks predict the fair market price of a home or decide if a loan will default?',
      scenario: 'If you want to predict a continuous dollar number (like house price based on square footage), you use Regression. If you want to predict a discrete category (like Loan Approved vs Declined), you use Classification! Both can be powered by linear models.',
    },
    intuition: {
      story: 'Imagine drawing a straight rod through a cloud of points on graph paper so that the total distance from the points to the rod is as small as possible. That straight rod is your Linear Regression line!',
      keyTakeaway: 'Linear models use straight lines (or hyperplanes in higher dimensions) to summarize linear relationships between predictors and targets.',
    },
    formal: {
      definition: 'Linear regression models the linear relationship between one or more independent predictor variables (X) and a continuous dependent target variable (Y).',
      terminology: [
        { term: 'Dependent (Target) Variable Y', definition: 'The continuous real value we wish to estimate (e.g., salary, price, sales).' },
        { term: 'Independent (Predictor) Variable X', definition: 'The feature used to make the prediction (e.g., years of experience, engine size).' },
        { term: 'Intercept (a₀ or b)', definition: 'The value of Y where the regression line crosses the vertical axis (value of Y when X = 0).' },
        { term: 'Slope / Coefficient (a₁ or m)', definition: 'The rate of change in Y for every one-unit increase in X.' },
        { term: 'Cost Function (MSE)', definition: 'Mean Squared Error: average of squared differences between actual and predicted values.' },
        { term: 'Gradient Descent', definition: 'Optimization algorithm that iteratively adjusts weights by taking steps proportional to the negative gradient of the cost function.' },
        { term: 'R² (Goodness of Fit)', definition: 'Coefficient of determination (0 to 100%): measures the proportion of variance in Y explained by X.' },
        { term: 'Multiple Linear Regression', definition: 'Extends simple regression to multiple predictor variables: Y = a₀ + a₁x₁ + a₂x₂ + ... + aₙxₙ.' },
        { term: 'Multivariate Regression', definition: 'Models multiple response variables simultaneously with one or more predictor variables.' },
      ],
    },
    visualExplanation: {
      summary: 'Drag slope and intercept sliders in our regression playground to watch the MSE cost surface and R² meter react in real time.',
      interactiveType: 'regression',
    },
    mathsSimple: {
      whyNeeded: 'Finding the best fit line requires minimizing the cost function mathematically.',
      formulaLatex: '\\begin{aligned} y &= a_0 + a_1 x + \\varepsilon \\\\[6pt] \\text{MSE} &= \\frac{1}{N} \\sum_{i=1}^{N} \\left(y_i - (a_1 x_i + a_0)\\right)^2 \\end{aligned}',
      symbols: [
        { symbol: 'y_i', meaning: 'Actual observed target value for instance i' },
        { symbol: '\\hat{y}_i = a_1 x_i + a_0', meaning: 'Predicted value from the regression line' },
        { symbol: '\\varepsilon', meaning: 'Random noise / error term' },
        { symbol: 'N', meaning: 'Total number of sample observations' },
        { symbol: 'R^2', meaning: '1 - (\\text{SSE} / \\text{SST}), coefficient of determination (0-100% goodness of fit)' },
      ],
      numericalExample: {
        problem: 'Given data points (1, 2), (2, 4), (3, 5). Evaluate line y = 1.5x + 0.8.',
        steps: [
          { stepName: 'Compute Predictions ŷ', calculation: '\\hat{y}_1 = 1.5(1)+0.8=2.3, \\; \\hat{y}_2 = 1.5(2)+0.8=3.8, \\; \\hat{y}_3 = 1.5(3)+0.8=5.3', result: '2.3, \\; 3.8, \\; 5.3', explanation: 'Substitute each x coordinate into the linear equation.' },
          { stepName: 'Calculate Residual Errors (y - ŷ)', calculation: 'e_1 = 2 - 2.3 = -0.3, \\; e_2 = 4 - 3.8 = +0.2, \\; e_3 = 5 - 5.3 = -0.3', result: '-0.3, \\; +0.2, \\; -0.3', explanation: 'Vertical distances from empirical points to the fitted line.' },
          { stepName: 'Square the Residuals', calculation: '(-0.3)^2 = 0.09, \\; (0.2)^2 = 0.04, \\; (-0.3)^2 = 0.09', result: '0.09, \\; 0.04, \\; 0.09', explanation: 'Squaring penalizes larger outliers and eliminates sign cancellation.' },
          { stepName: 'Compute Mean Squared Error (MSE)', calculation: '\\text{MSE} = \\frac{0.09 + 0.04 + 0.09}{3} = \\frac{0.22}{3}', result: '0.0733', explanation: 'Average squared deviation across all 3 training samples.' },
        ],
        finalMeaning: 'The MSE of 0.0733 indicates a tight fit. Gradient descent or analytical OLS seeks the unique (a₀, a₁) that minimizes this MSE value to its global minimum.',
      },
    },
    tryItYourself: {
      instruction: 'Test your understanding of positive vs negative linear relationships.',
      prompt: 'If a car’s resale price Y decreases as its total mileage X increases, is this a positive or negative linear relationship?',
      solution: 'This is a Negative Linear Relationship because Y decreases on the vertical axis as X increases on the horizontal axis (slope a₁ is negative).',
    },
    video: {
      title: 'Linear Regression & Cost Function Solved',
      youtubeUrl: 'https://youtube.com/@sharikatr',
      summary: 'Sharika T R explains finding the best fit line, the MSE cost function, and interpreting regression parameters.',
    },
    knowledgeCheck: [
      {
        id: 'q5-1',
        question: 'What is the key difference between Regression and Classification?',
        options: [
          'Regression predicts continuous numeric values, while classification predicts discrete categorical classes',
          'Regression only works on text, while classification only works on images',
          'Classification requires gradient descent, while regression never uses mathematics',
          'Regression is unsupervised, while classification is always reinforcement learning',
        ],
        correctAnswer: 0,
        explanation: 'Correct! Regression models continuous quantities (salary, temperature), whereas classification predicts discrete categories (spam/ham, yes/no).',
      },
      {
        id: 'q5-2',
        question: 'What does a high R-squared (R²) value close to 1.0 (or 100%) signify?',
        options: [
          'The model has severe calculation errors and must be discarded',
          'There is very little difference between predicted and actual values; the model fits the data well',
          'The dataset contains no independent variables',
          'The slope of the line is exactly zero',
        ],
        correctAnswer: 1,
        explanation: 'Correct! R² is the coefficient of determination measuring goodness of fit. Values near 1.0 signify that the model accounts for almost all variance in the data.',
      },
      {
        id: 'q5-3',
        question: 'Why is the Mean Squared Error (MSE) preferred over Mean Absolute Error in standard linear regression optimization?',
        options: [
          'Because squaring makes math impossible',
          'Because squaring penalizes larger errors more heavily and provides a differentiable smooth curve for gradient descent',
          'Because MSE always returns a negative number',
          'Because MSE removes the need for training data',
        ],
        correctAnswer: 1,
        explanation: 'Correct! The squared error function is differentiable everywhere and severely penalizes dangerous large errors.',
      },
    ],
    summary: {
      keyPoints: [
        'Linear regression finds the sloped straight line y = a₀ + a₁x that minimizes prediction error.',
        'The cost function (MSE) measures the average squared error between predictions and ground-truth.',
        'Gradient Descent iteratively updates coefficients (a₀, a₁) in the opposite direction of the gradient to reach minimal cost.',
        'R² measures goodness of fit from 0 to 100%. Multiple linear regression handles multiple predictors x₁, x₂, ..., xₙ.',
      ],
      revisionChecklist: [
        'Can I calculate predictions and residuals for a given linear model?',
        'Can I compute MSE given actual and predicted values?',
        'Can I explain the role of slope, intercept, and error term ε?',
      ],
    },
  },
];
