import React from 'react';
import { RefreshContainer } from './styles';
import ButtonComponent from '../ButtonComponent';
import { BiRefresh } from 'react-icons/bi';

type NavBarProps = {
  onClickAdd?: any;
}

function RefreshComponent (props: NavBarProps) {
  return (
    <RefreshContainer>
      <ButtonComponent title='Atualizar dados' buttonIcon={<BiRefresh color='#FFF' size={25} />} colorItem='#3eb331' onClick={props.onClickAdd} />
    </RefreshContainer>
  )
}

export default RefreshComponent;
