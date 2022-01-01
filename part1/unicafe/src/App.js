import React, { useState } from "react";

const StatisticLine = ({ text, value }) => (
  <div>
    {text} {value}
  </div>
);

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all > 0) {
    return (
      <div>
        <h1>statistics</h1>
        <div>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <div>No feedback given</div>
      </div>
    );
  }
};

const Button = ({ text, handleClick }) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
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
        <Button text="good" handleClick={() => setGood(good + 1)} />
        <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
        <Button text="bad" handleClick={() => setBad(bad + 1)} />
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
