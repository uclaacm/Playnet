import React from 'react';
import '../../../styles/Activity3Game.scss';
interface VariableCardProps {
  id: string,
}
function VariableCard (props: VariableCardProps) : JSX.Element {
  const {id} = props;
  return <div className='variable-card'>
    <div className='variable-image' id={id.toLowerCase().replace(' ', '-')}/>
    {props.id}
  </div>;
}
export default VariableCard;