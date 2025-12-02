import React from 'react';

function Loader() {
  return (
    <div className="text-center mt-5">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3">Fetching questions...</p>
    </div>
  );
}

export default Loader;
