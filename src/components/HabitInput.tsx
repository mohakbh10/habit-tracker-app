import React from 'react';

type Props = {
    input: string;
    setInput: (value: string) => void;
    onAdd: () => void;
    inputRef: React.RefObject<HTMLInputElement>;
};

const HabitInput = ({input, setInput,onAdd,inputRef}:Props) => {
    return (
        <>
        <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your habit..."
            ref={inputRef}
        />
        <button onClick={onAdd}>Add</button>
        </>
    );
};

export default HabitInput;