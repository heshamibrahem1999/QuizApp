// src/App.jsx
import React, { useEffect, useState } from 'react';
import './App.css';
import { fetchQuestions } from './api/quizApi';
import ThemeToggle from './components/ThemeToggle';
import Loader from './components/Loader';
import QuestionCard from './components/QuestionCard';
import ResultScreen from './components/ResultScreen';
import StartScreen from './components/StartScreen';

const QUESTION_TIME = 30; // seconds per question

function App() {
  const [phase, setPhase] = useState('start'); // 'start' | 'quiz' | 'result'
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [localError, setLocalError] = useState('');
  const [theme, setTheme] = useState('light');
  const [quizConfig, setQuizConfig] = useState(null); // category/difficulty/tags/limit

  // Apply theme to body
  useEffect(() => {
    document.body.className =
      theme === 'light' ? 'bg-light text-dark' : 'bg-dark text-light';
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleStartQuiz = (config) => {
    // Called from StartScreen
    setQuizConfig(config);
  };

  // Fetch questions when quizConfig changes (user pressed Start)
  useEffect(() => {
    if (!quizConfig) return;

    const loadQuestions = async () => {
      setLoading(true);
      setFetchError('');
      try {
        const data = await fetchQuestions(quizConfig);
        setQuestions(data);
        setCurrentIndex(0);
        setSelectedAnswers([]);
        setScore(0);
        setLocalError('');
        setPhase('quiz');
      } catch (err) {
        setFetchError(err.message || 'Failed to fetch questions');
        setQuestions([]);
        setPhase('quiz'); // still show quiz area, but with error
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [quizConfig]);

  const currentQuestion = questions[currentIndex];

  const isMultiple =
    currentQuestion &&
    currentQuestion.multiple_correct_answers === 'true';

  const toggleAnswer = answerKey => {
    setLocalError('');
    if (isMultiple) {
      setSelectedAnswers(prev =>
        prev.includes(answerKey)
          ? prev.filter(key => key !== answerKey)
          : [...prev, answerKey]
      );
    } else {
      setSelectedAnswers([answerKey]);
    }
  };

  const checkIsSelectionCorrect = (question, selected) => {
    if (!question) return false;

    const allAnswerKeys = Object.entries(question.answers)
      .filter(([, value]) => value !== null && value !== '')
      .map(([key]) => key);

    const correctKeys = allAnswerKeys.filter(
      key => question.correct_answers[`${key}_correct`] === 'true'
    );

    if (selected.length !== correctKeys.length) return false;

    return selected.every(key => correctKeys.includes(key));
  };

  const handleNext = () => {
    if (!currentQuestion) return;

    if (selectedAnswers.length === 0) {
      setLocalError('Please select at least one answer.');
      return;
    }

    const isCorrect = checkIsSelectionCorrect(
      currentQuestion,
      selectedAnswers
    );

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswers([]);
      setLocalError('');
    } else {
      setPhase('result');
    }
  };

  // Called when timer reaches 0
  const handleTimeout = () => {
    if (!currentQuestion || phase !== 'quiz') return;

    // Don't change score, just move to next
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswers([]);
      setLocalError('');
    } else {
      setPhase('result');
    }
  };

  const handleRestart = () => {
    // Restart same quiz (same questions & config)
    setCurrentIndex(0);
    setSelectedAnswers([]);
    setScore(0);
    setLocalError('');
    setPhase('quiz');
  };

  const goToStartPage = () => {
    // Fully reset back to start screen
    setPhase('start');
    setQuizConfig(null);
    setQuestions([]);
    setCurrentIndex(0);
    setSelectedAnswers([]);
    setScore(0);
    setLocalError('');
    setFetchError('');
    setLoading(false);
  };

  const containerThemeClass =
    theme === 'light' ? 'bg-light text-dark' : 'bg-dark text-light';

  // 🔹 PHASE: START — show only the StartScreen
  if (phase === 'start') {
    return (
      <div className={containerThemeClass}>
        <StartScreen onStart={handleStartQuiz} />
      </div>
    );
  }

  // 🔹 PHASE: QUIZ / RESULT — show header + content
  return (
    <div className={`min-vh-100 ${containerThemeClass}`}>
      <div className="container py-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="h3 mb-1">React Quiz</h1>
            <p className="mb-0 text-muted small">
              Questions from <code>quizapi.io</code>
            </p>
          </div>

          <ThemeToggle theme={theme} onToggle={handleToggleTheme} />
        </div>

        {/* Loading */}
        {loading && <Loader />}

        {/* Error */}
        {!loading && fetchError && (
          <div className="alert alert-danger" role="alert">
            {fetchError}
            <div className="mt-2">
              <button
                className="btn btn-sm btn-outline-light"
                onClick={goToStartPage}
              >
                Back to Start Page
              </button>
            </div>
          </div>
        )}

        {/* No questions */}
        {!loading && !fetchError && questions.length === 0 && (
          <div className="alert alert-info mt-4" role="alert">
            No questions returned from the API.
            <div className="mt-2">
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={goToStartPage}
              >
                Back to Start Page
              </button>
            </div>
          </div>
        )}

        {/* Quiz or result */}
        {!loading && !fetchError && questions.length > 0 && (
          <>
            {phase === 'result' ? (
              <ResultScreen
                score={score}
                totalQuestions={questions.length}
                onRestart={handleRestart}
                onGoStart={goToStartPage}
              />
            ) : (
              <QuestionCard
                question={currentQuestion}
                currentIndex={currentIndex}
                totalQuestions={questions.length}
                score={score}
                selectedAnswers={selectedAnswers}
                onToggleAnswer={toggleAnswer}
                isMultiple={isMultiple}
                localError={localError}
                onNext={handleNext}
                onRestart={handleRestart}
                onGoStart={goToStartPage}
                onTimeout={handleTimeout}       // ⏱ when time ends
                questionTime={QUESTION_TIME}    // ⏱ 30 sec per question
                theme={theme}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
