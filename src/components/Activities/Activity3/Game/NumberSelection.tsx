import React, { useState } from 'react';

interface SelectProps {
  daysLeft: number;
  daysUsed: number;
  setDaysUsed: (_state: number) => void;
  showWarning: boolean;
}

function NumberSelection(props: SelectProps): JSX.Element {
  const {daysLeft, daysUsed, setDaysUsed, showWarning} = props;

  const handleScroll = (e: React.WheelEvent) => {
    let adjustment = 0;
    if (e.deltaY < 0) {
      adjustment = -1;
    } else if (e.deltaY > 0 ) {
      adjustment = 1;
    }
    const newInput = Math.max(Math.min(input + adjustment, daysLeft), 0);
    setInput(newInput);
    setDaysUsed(newInput);
  };

  const handleChange = (e : any) => {
    const value = e.target.value !== '' ? parseInt(e.target.value) : 0;
    const newInput = Math.max(Math.min(value, daysLeft), 0);
    setInput(newInput);
    setDaysUsed(newInput);
  };

  return (
    <input
      type='number'
      value={daysUsed}
      onChange={handleChange}
      onWheel={handleScroll}
      onClick={(e : any)=>e.target.select()}
      className={`time-input ${showWarning && 'time-input-warning'}`}
    />
  );
}
export default NumberSelection;
