import { useState, useEffect } from 'react'
import personsService from './services/persons'
import axios from 'axios'


const Filterinput = ({filter, handleFilterChange}) => {

  return(
    <div>
      filter shown with <input value={filter} onChange={handleFilterChange}/>
    </div>
  )
}

const Addform = ({addNumber, newNumber, newName, handleNameChange, handleNumberChange }) => (
    <form onSubmit={addNumber}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
          <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
    </form>
)

const Person = ({person}) => (
  <>
    {person.name} {person.number}
  </>
)


const Persons = ({personsToShow, removePerson}) => (
  <div>
    {personsToShow.map((person) => (
      <li key={person.id}> 
        <Person person={person}/>
        <button onClick={() => removePerson(person.id)}>delete</button>
      </li>
    ))}
  </div>
)


const Notification = ({ message, color }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error" style={{color: color}}>
      {message}
    </div>
  )
}



const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [color, setColor] = useState('')


  useEffect(() => {
    personsService
    .getAll()
      .then(initialPersons => {
        setPersons(initialPersons);
      })
  }, [])

  const removePerson = (id) => {
    const person = persons.find(p => p.id === id);
    if (window.confirm(`Delete ${person.name} ?`)) {
    personsService
      .delPer(id)
      .then(() => {
        setPersons(prevPersons => prevPersons.filter(person => person.id !== id));
        setColor("green");
        setMessage("number removed!");
        setTimeout(() => {
          setMessage(null)
        }, 3000);
        
      })

      .catch(error => {
        console.log(error);
        setColor("red");
        setMessage("Error while removing number!")
        setTimeout(() => {
          setMessage(null)
        }, 3000);
      })

    }

      
  }

  

  const handleNameChange = (event) => {
    setNewName(event.target.value);
    
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
    
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    
  }

  

  const addNumber = (event) => {
    event.preventDefault();
    const name = {
      name: newName,
      number: newNumber
    };
    const person = persons.find(p => p.name === newName);
    if (person) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        
          const changedNumber = { ...person, number: newNumber };
          personsService
          .update(person.id, changedNumber)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson));
            setNewNumber('');
            setNewName('');
            setColor("green");
            setMessage("Number changed!");
            setTimeout(() => {
              setMessage(null)
            }, 3000);
            
          })
          .catch(error => {
            console.log(error);
            setColor("red");
            if (error.response && error.response.status === 404) {
              setMessage(`${person.name} has already been removed from server`);
            } else {
              setMessage("Error while removing number!");
            }
            setTimeout(() => {
              setMessage(null)
            }, 3000);
          })
          
      }

    
    } else {
      personsService
        .create(name)
        .then(returnedPer => {
          setPersons(persons.concat(returnedPer));
          setNewName('');
          setColor("green");
            setMessage("Number added!");
            setTimeout(() => {
              setMessage(null)
            }, 3000);
      })
        .catch (error => {
          console.log(error);
            setColor("red");
            setMessage("Error while adding number!")
            setTimeout(() => {
              setMessage(null)
            }, 3000);
        })
    }
    setNewName('');
    setNewNumber('');
    console.log(persons);
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
    
  )
  

  
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} color={color}/>
      <Filterinput filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <Addform addNumber={addNumber} newNumber={newNumber} newName={newName} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} removePerson={removePerson}/>
    </div>
  )

}

export default App
