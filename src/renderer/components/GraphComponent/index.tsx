import React from 'react';
import { GraphContainer } from './styles';
import ButtonComponent from '../ButtonComponent';
import { BsFileEarmarkBarGraph } from 'react-icons/bs';

type NavBarProps = {
  onClickAdd?: any;
}

function GraphComponent (props: NavBarProps) {
  return (
    <GraphContainer>
      <ButtonComponent buttonIcon={<BsFileEarmarkBarGraph color='#FFF' size={25} />} colorItem='#3eb331' onClick={props.onClickAdd} />
    </GraphContainer>
  )
}

export default GraphComponent;
