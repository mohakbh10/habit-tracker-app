import React, { useState,createContext, useContext, useEffect } from 'react'

type Theme='light'|'dark';
interface ThemeContextType {
    theme:Theme;
    toggleTheme:()=>void;
}

const ThemeContext=createContext<ThemeContextType|undefined>(undefined)

export const ThemeProvider=({children}:{children:React.ReactNode})=>{
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem('theme');
        return saved === 'dark' ? 'dark' : 'light';
    });
    const toggleTheme=()=>{
        setTheme(prev=>(prev==='light'?'dark':'light'))
    }
    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);
    return (
        <ThemeContext.Provider value={{theme,toggleTheme}}>
            <div className={theme}>{children}</div>
        </ThemeContext.Provider>
    )
}
export const useTheme=()=>{
    const context = useContext(ThemeContext)
    if(!context) throw new Error ('useTheme must be used inside ThemeProvider')
    return context;
}