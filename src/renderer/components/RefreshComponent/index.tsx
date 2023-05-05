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
      <ButtonComponent title='Atualizar' buttonIcon={<BiRefresh color='#FFF' size={30} />} onClick={props.onClickAdd} />
    </RefreshContainer>
  )
}

export default RefreshComponent;
