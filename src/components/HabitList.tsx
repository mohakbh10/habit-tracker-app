import React from 'react';
import { Habit } from '../types/habit';

type Props = {
    habits: Habit[];
    onDelete: (id: string) => void;
};

const HabitList = ({ habits, onDelete }: Props) => {
    return (
        <ul>
            {habits.map(habit => (
                <li key={habit.id}>
                    <span>{habit.name}</span>
                    <button onClick={() => onDelete(habit.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default HabitList;