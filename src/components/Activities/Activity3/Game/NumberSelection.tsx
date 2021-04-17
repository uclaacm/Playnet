import React, { useState } from 'react';

interface SelectProps {
  daysLeft: number;
  daysUsed: number;
  setDaysUsed: (_state: number) => void;
}

function NumberSelection(props: SelectProps): JSX.Element {
  const {daysLeft, daysUsed, setDaysUsed} = props;
  const [input, setInput] = useState(daysUsed);

  const handleChange = (e : any) => {
    const newInput = Math.max(Math.min(parseInt(e.target.value), daysLeft), 0);
    setInput(newInput);
    setDaysUsed(!Number.isNaN(newInput) ? newInput : 0);
  };

  return (
    <div>
      <input type='number' value={input} onChange={handleChange} className='time-input' />
    </div>);
}
export default NumberSelection;