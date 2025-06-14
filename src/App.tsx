import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTheme } from './contexts/ThemeContext';

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

  const inputRef=useRef<HTMLInputElement>(null)

  const {theme, toggleTheme}=useTheme()

  useEffect(()=>{
    inputRef.current?.focus();
  },[])
  function handleAdd(){
    if (!input.trim()) return;

    const newHabit: Habit= {
      id :Date.now().toString(),
      name: input.trim(),
    }
    setHabits(prev=>[...prev,newHabit])
    setInput('')
    inputRef.current?.focus();
  }
  
  const handleDelete = useCallback((id:string)=>{
    setHabits(prev=> prev.filter(habit=> habit.id!==id))
  },[])

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
    <div className={`app-container ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      <button 
        onClick={toggleTheme} 
        className="theme-toggle"
      >
        Toggle Theme
      </button>
      <h1 className="app-title">Habit Tracker</h1>
      <input type="text" value={input} onChange={e=> setInput(e.target.value)} placeholder='enter ur habit' ref={inputRef}/>
      <button onClick={handleAdd}>Add</button>
      <ul>
        {habits.map(habit=>(
          <li key={habit.id}>
            <span>{habit.name}</span>
            <button onClick={()=>handleDelete(habit.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
