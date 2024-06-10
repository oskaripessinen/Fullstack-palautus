import { useState } from 'react'


const Button = ({handleClick, text}) => (
  
  <button onClick={handleClick}>
    {text}
  </button>
  
)

const MostVotes = ({mostVotes}) => {
  if (mostVotes) {
    return(
      <div>
        <h1>Anecdote with most votes</h1>
        <div>{mostVotes}</div>
      </div>
    )
  }
  return 
  


}

const Votes = ({selected, points}) => {
  if (points[selected]) {
    return(
      <div>
        has {points[selected]} points
      </div>
    )
  }
  return (
    <div>
     has 0 points
    </div>
  )
  
}

const App = () => {

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [points, setPoints] = useState({});
  const [mostVotes, setMostVotes] = useState();


  const addPoint = (selected) => {
    const copy = { ...points };
    copy[selected] = (copy[selected] || 0) + 1;
    setPoints(copy);
    
    const maxVotes = Math.max(...Object.values(copy));
    const maxVotesKey = Object.keys(copy).find(key => copy[key] === maxVotes);
    setMostVotes(anecdotes[maxVotesKey]);
  }
   
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <Votes points={points} selected={selected}/>
      <div>
        <Button handleClick={() => setSelected(getRandomInt(anecdotes.length))} text={"next anecdote"}/>
        <Button handleClick={() => addPoint(selected)} text={"vote"}/>
      </div>
      <MostVotes mostVotes={mostVotes}/>
    </div>
  )
}

export default App
