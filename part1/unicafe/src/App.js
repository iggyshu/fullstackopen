import React, { useState } from "react";

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  return (
    <div>
      <h1>statistics</h1>
      <div>
        <div>good {good}</div>
        <div>neutral {neutral}</div>
        <div>bad {bad}</div>
        <div>all {all}</div>
        <div>average {average}</div>
        <div>positive {positive} %</div>
      </div>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const getTotal = () => {
    return good + neutral + bad;
  };

  const getAverage = () => {
    return (good - bad) / getTotal();
  };

  const getPositive = () => {
    return (good / getTotal()) * 100;
  };

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </div>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={getTotal()}
        average={getAverage()}
        positive={getPositive()}
      />
    </div>
  );
};

export default App;
