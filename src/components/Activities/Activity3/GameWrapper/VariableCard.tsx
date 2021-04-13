import React, { useState } from 'react';
import '../../../styles/Activity3Game.scss';
interface VariableCardProps {
  id: string,
}
function VariableCard(props: VariableCardProps): JSX.Element {
  const [selected, setSelected] = useState(false);
  const { id } = props;


  return <button className={`${selected ? 'selected' : 'not-selected'} variable-card`}
    onClick={() => setSelected(!selected)}>
    {selected && <div className='checkmark' />}
    <div className='variable-image' id={id.toLowerCase().replace(' ', '-')} />
    {props.id}
  </button>;
}
export default VariableCard;