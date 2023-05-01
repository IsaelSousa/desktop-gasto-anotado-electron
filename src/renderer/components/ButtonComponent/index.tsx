import React from 'react';
import { ButtonContainer } from './styles';

type ButtonProps = {
  buttonIcon: any;
  onClick?: any;
  title?: string;
}

function ButtonComponent ({ buttonIcon, onClick, title }: ButtonProps) {
  return (
    <ButtonContainer onClick={onClick} title={title}>
      {buttonIcon}
    </ButtonContainer>
  )
}

export default ButtonComponent;
