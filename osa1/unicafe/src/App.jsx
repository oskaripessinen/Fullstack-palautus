import { useState } from 'react'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine  = ({score, text}) => (
  <tr>
    <td>{text}</td>
    <td>{score}</td>
  </tr>
)





const Stats = ({good, neutral, bad}) => {

  if (good+neutral+bad > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine score={good} text={"good"}/>
          <StatisticLine score={neutral} text={"neutral"}/>
          <StatisticLine score={bad} text={"bad"}/>
          <StatisticLine score={good+neutral+bad} text={"all"}/>
          <StatisticLine score={(good+bad*(-1))/(good+neutral+bad)} text={"average"}/>
          <StatisticLine score={`${good/(good+bad+neutral)} %`} text={"positive"}/>
          </tbody>
      </table>
  )
  }
  return (
    <div>
      No feedback given
    </div>
  )
  
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good+1)} text={"good"}/>
      <Button handleClick={() => setNeutral(neutral+1)} text={"neutral"}/>
      <Button handleClick={() => setBad(bad+1)} text={"bad"}/>
      <h2>statistics</h2>
      <Stats good={good} neutral={neutral} bad={bad}/>
      
    </div>
  )
}

export default App
