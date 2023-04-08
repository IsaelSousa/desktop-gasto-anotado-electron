import React from 'react';
import { ButtonContainer } from './styles';

type ButtonProps = {
  buttonIcon: any;
  onClick?: any;
  colorItem: string;
}

function ButtonComponent ({ buttonIcon, onClick, colorItem }: ButtonProps) {
  return (
    <ButtonContainer painter={colorItem} onClick={onClick}>
      {buttonIcon}
    </ButtonContainer>
  )
}

export default ButtonComponent;
