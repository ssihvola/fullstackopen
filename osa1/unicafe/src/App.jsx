import { useState } from 'react'

const Button = ({ clickType, text }) => {
  return <button onClick={clickType}>{text}</button>
}

const StatisticLine = ({ text, value }) => {
  return <div>{text} {value}</div>
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = (good - bad) / all || 0
  const positive = (good / all) * 100 || 0

  if (all === 0) {
    return <div>No feedback given</div>
  }

  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={all} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)
  

  return (
    <div>
      <h1>give feedback</h1>

      <Button clickType={handleGoodClick} text="good" />
      <Button clickType={handleNeutralClick} text="neutral" />
      <Button clickType={handleBadClick} text="bad" />

      <h1>statistics</h1>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App