import React, { useEffect, useState } from 'react';

function QuestionCard({
  question,
  currentIndex,
  totalQuestions,
  score,
  selectedAnswers,
  onToggleAnswer,
  isMultiple,
  localError,
  onNext,
  onRestart,
  onGoStart,
  onTimeout,
  questionTime,
  theme,
}) {
  const [timeLeft, setTimeLeft] = useState(questionTime);

  // ✅ Reset & start timer ONLY when the question changes
  useEffect(() => {
    setTimeLeft(questionTime);

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeout(); // time is up
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
    // IMPORTANT: depend only on question.id (and questionTime if you like)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question.id, questionTime]);

  const answerEntries = Object.entries(question.answers).filter(
    ([, value]) => value !== null && value !== ''
  );

  const cardThemeClass =
    theme === 'light' ? 'bg-white text-dark' : 'bg-secondary text-light';

  const formatTime = (seconds) => {
    if (seconds < 0) seconds = 0;
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    if (m > 0) {
      return `${m}:${s.toString().padStart(2, '0')}`;
    }
    return `${s}s`;
  };

  return (
    <div className={`card shadow-sm ${cardThemeClass}`}>
      <div className="card-body">
        {/* Top bar: progress + score + timer */}
        <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <span className="badge bg-primary">
            Question {currentIndex + 1} of {totalQuestions}
          </span>

          <span className="small">
            Score: {score} / {totalQuestions}
          </span>

          <span className={`badge ${timeLeft > 10 ? 'bg-success' : 'bg-danger'}`}>
            Time: {formatTime(timeLeft)}
          </span>
        </div>

        <div className="progress mb-3" style={{ height: '6px' }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{
              width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
            }}
          />
        </div>

        {/* Meta */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="badge bg-info text-dark">
            {question.category || 'General'}
          </span>
          <span className="badge bg-warning text-dark text-capitalize">
            {question.difficulty || 'Medium'}
          </span>
        </div>

        {/* Question text */}
        <h5 className="card-title mb-2">
          {question.question}
        </h5>
        {question.description && (
          <p className="card-subtitle mb-3 small">
            {question.description}
          </p>
        )}

        {/* Answers */}
        <div className="list-group mb-3">
          {answerEntries.map(([key, value]) => {
            const isSelected = selectedAnswers.includes(key);
            return (
              <button
                key={key}
                type="button"
                className={`list-group-item list-group-item-action ${
                  isSelected ? 'active' : ''
                }`}
                onClick={() => onToggleAnswer(key)}
              >
                <strong className="me-2">
                  {key.replace('answer_', '').toUpperCase()}.
                </strong>
                {value}
              </button>
            );
          })}
        </div>

        {/* Validation error */}
        {localError && (
          <div className="alert alert-warning py-2 small" role="alert">
            {localError}
          </div>
        )}

        {/* Note */}
        <p className={`small mb-3`}>
          {isMultiple
            ? 'You can select multiple answers for this question.'
            : 'Select one answer.'}
        </p>

        {/* Footer buttons */}
        <div className="d-flex flex-wrap gap-2 justify-content-between">
          <button
            className={`btn btn-outline-danger btn-danger text-white`}
            onClick={onGoStart}
          >
            Back to Start
          </button>

          <button
            className="btn btn-outline-warning btn-warning text-white"
            onClick={onRestart}
          >
            Restart Quiz
          </button>

          <button
            className="btn btn-primary ms-auto"
            onClick={onNext}
          >
            {currentIndex + 1 === totalQuestions
              ? 'Finish Quiz'
              : 'Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
