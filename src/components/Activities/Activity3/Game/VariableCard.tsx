import React, { useEffect, useState } from 'react';
import '../../../styles/Activity3Game.scss';

interface VariableCardProps {
  id: string,
  select: () => boolean,
  deselect: () => void,
  initialSelected: boolean,
}

function VariableCard(props: VariableCardProps): JSX.Element {
  const { id, select, deselect, initialSelected } = props;
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    setSelected(initialSelected);
  }, []);

  const onClick = () => {
    let isSelected = selected;
    if (selected) {
      deselect();
      isSelected = false;
    } else {
      isSelected = select();
    }
    setSelected(isSelected);
  };

  return <button className={`${selected ? 'selected' : 'not-selected'} variable-card`}
    onClick={onClick}>
    {selected && <div className='checkmark' />}
    <div className='variable-image' id={id.toLowerCase().replace(' ', '-')} />
    {props.id}
  </button>;
}
export default VariableCard;