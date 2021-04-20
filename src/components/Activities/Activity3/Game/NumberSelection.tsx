import React from 'react';
import { TimeAllocationKey, TimeAllocations } from './typings';

interface SelectProps {
  daysLeft: number;
  itemType: TimeAllocationKey;
  daysAllocation: TimeAllocations;
  setDaysAllocation: (_state: TimeAllocations) => void;
  showWarning: boolean;
}

function NumberSelection(props: SelectProps): JSX.Element {
  const {daysLeft, itemType, daysAllocation, setDaysAllocation, showWarning} = props;

  const handleScroll = (e: React.WheelEvent) => {
    let adjustment = 0;
    if (e.deltaY < 0) {
      adjustment = -1;
    } else if (e.deltaY > 0 ) {
      adjustment = 1;
    }
    const newInput = Math.max(Math.min(daysAllocation[itemType] + adjustment, daysLeft), 0);
    setNewAllocation(newInput);
  };

  const handleChange = (e : any) => {
    const value = e.target.value !== '' ? parseInt(e.target.value) : 0;
    const newInput = Math.max(Math.min(value, daysLeft), 0);
    setNewAllocation(newInput);
  };

  const setNewAllocation = (newInput : number) => {
    const newAllocation = {...daysAllocation};
    newAllocation[itemType] = newInput;
    setDaysAllocation(newAllocation);
  };

  return (
    <input
      type='number'
      value={daysAllocation[itemType]}
      onChange={handleChange}
      onWheel={handleScroll}
      onClick={(e : any)=>e.target.select()}
      className={`time-input ${showWarning && 'time-input-warning'}`}
    />
  );
}
export default NumberSelection;
