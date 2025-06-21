import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from './contexts/ThemeContext';
import HabitInput from './components/HabitInput';
import HabitList from './components/HabitList';
import ThemeToggle from './components/ThemeToggle';
import { Habit } from './types/habit';

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
      <ThemeToggle />
      <h1 className="app-title">Habit Tracker</h1>
      <HabitInput
        input={input}
        setInput={setInput}
        onAdd={handleAdd}
        inputRef={inputRef}
      />
      <HabitList habits={habits} onDelete={handleDelete} />
    </div>
  )
}

export default App
