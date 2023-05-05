import React from 'react';
import { AlertsContainer } from './styles';
import ButtonComponent from '../ButtonComponent';
import { AiFillAlert } from 'react-icons/ai';

type NavBarProps = {
  onClickAdd?: any;
}

function AlertsComponent (props: NavBarProps) {
  return (
    <AlertsContainer>
      <ButtonComponent title='Alerta' buttonIcon={<AiFillAlert color='#FFF' size={30} />} onClick={props.onClickAdd} />
    </AlertsContainer>
  )
}

export default AlertsComponent;
