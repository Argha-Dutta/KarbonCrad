import React, { useEffect, useState } from 'react';
import './Results.css';

function Results() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const data = sessionStorage.getItem('result');
    if (data) {
      setResult(JSON.parse(data));
    }
  }, []);

  if (!result) {
    return (
      <div className="results-container">
        <p className="no-results">No results to display. Please upload a file first.</p>
      </div>
    );
  }

  // Extract the result string and format it for display
  const resultsArray = result.result.split('\n').reduce((acc, line) => {
    const [key, value] = line.split(': ');
    if (key && value) {
      acc[key.trim()] = value.trim(); // Store each key-value pair in the accumulator
    }
    return acc;
  }, {});

  return (
    <div className="results-container">
      <h1>Results of the Analysis</h1>
      <div className="results-box">
        <div className="result-item">
          <p>
            <span className="result-label">Rule 1: Total Revenue 5 Crore Flag:</span>{' '}
            <span className="result-value">{resultsArray["TOTAL_REVENUE_5CR_FLAG"] || "Not evaluated"}</span>
          </p>
        </div>
        <div className="result-item">
          <p>
            <span className="result-label">Rule 2: Borrowing to Revenue Flag:</span>{' '}
            <span className="result-value">{resultsArray["BORROWING_TO_REVENUE_FLAG"] || "Not evaluated"}</span>
          </p>
        </div>
        <div className="result-item">
          <p>
            <span className="result-label">Rule 3: ISCR Flag:</span>{' '}
            <span className="result-value">{resultsArray["ISCR_FLAG"] || "Not evaluated"}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Results;