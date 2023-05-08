import React from 'react';
import { AlertsContainer } from './styles';
import ButtonComponent from '../ButtonComponent';
import { BsCashCoin } from 'react-icons/bs';

type NavBarProps = {
  onClickAdd?: any;
}

function ResumComponent (props: NavBarProps) {
  return (
    <AlertsContainer>
      <ButtonComponent title='Resumo Geral' buttonIcon={<BsCashCoin color='#FFF' size={30} />} onClick={props.onClickAdd} />
    </AlertsContainer>
  )
}

export default ResumComponent;
