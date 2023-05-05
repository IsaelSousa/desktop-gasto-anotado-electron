import React from 'react';
import { ButtonContainer } from './styles';

type AnnotationsSendButtonProps = {
  buttonIcon: any;
  onClick?: any;
  title?: string;
}

function AnnotationsSendButtonComponent ({ buttonIcon, onClick, title }: AnnotationsSendButtonProps) {
  return (
    <ButtonContainer onClick={onClick} title={title}>
      {buttonIcon}
    </ButtonContainer>
  )
}

export default AnnotationsSendButtonComponent;
