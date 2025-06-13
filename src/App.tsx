import React, { useEffect, useState } from 'react'

interface Habit{
  id:string;
  name:string;
}

const App = () => {
  const [input,setInput]=useState('')
  const [habits, setHabits]=useState<Habit[]>(()=>{
    const stored=localStorage.getItem('habits');
    return stored? JSON.parse(stored):[];
  })

  function handleAdd(){
    if (!input.trim()) return;

    const newHabit: Habit= {
      id :Date.now().toString(),
      name: input.trim(),
    }
    setHabits(prev=>[...prev,newHabit])
    setInput('')
  }
  useEffect(()=>{
    const stored= localStorage.getItem('habits')
    if (stored){
      setHabits(JSON.parse(stored))
    }
  },[])

  useEffect(()=>{
    localStorage.setItem('habits',JSON.stringify(habits))
  },[habits]);
  return (
    <div>
      <h1 className="">Habit Tracker</h1>
      <input type="text" value={input} onChange={e=> setInput(e.target.value)} placeholder='enter ur habit'/>
      <button onClick={handleAdd}>Add</button>
      <ul>
        {habits.map(habit=>(
          <li key={habit.id}>{habit.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
