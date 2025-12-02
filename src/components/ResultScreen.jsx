// src/components/ResultScreen.jsx
import React from 'react';

function ResultScreen({ score, totalQuestions, onRestart, onGoStart }) {
  const percentage = totalQuestions > 0
    ? ((score / totalQuestions) * 100).toFixed(0)
    : 0;

  return (
    <div className="text-center py-5">
      <h2 className="mb-3">Quiz Finished 🎉</h2>
      <p className="lead mb-1">
        Your score: {score} / {totalQuestions}
      </p>
      <p className="text-muted mb-4">
        {percentage}% correct
      </p>

      <div className="d-flex flex-column align-items-center gap-2">
        <button
          className="btn btn-outline-light"
          onClick={onRestart}
        >
          Restart Quiz (same settings)
        </button>

        <button
          className="btn btn-danger"
          onClick={onGoStart}
        >
          Back to Start Page (choose again)
        </button>
      </div>
    </div>
  );
}

export default ResultScreen;
