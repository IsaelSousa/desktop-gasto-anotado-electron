import React from 'react';
import { ButtonContainer } from './styles';

type ButtonProps = {
  buttonIcon: any;
  onClick?: any;
  title?: string;
}

export const SpendingButtonComponent = ({ buttonIcon, onClick, title }: ButtonProps) => {
    return (
        <ButtonContainer onClick={onClick} title={title}>
          {buttonIcon}
        </ButtonContainer>
      )
}