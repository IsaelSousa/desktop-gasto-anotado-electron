import React from 'react';
import { ButtonContainer } from './styles';

type ButtonProps = {
  buttonIcon: any;
  onClick?: any;
  colorItem: string;
  title?: string;
}

function ButtonComponent ({ buttonIcon, onClick, colorItem, title }: ButtonProps) {
  return (
    <ButtonContainer painter={colorItem} onClick={onClick} title={title}>
      {buttonIcon}
    </ButtonContainer>
  )
}

export default ButtonComponent;
