import React from 'react';
import ButtonComponent from '../ButtonComponent';
import { Container } from './styles';
import { BsFillTrashFill } from 'react-icons/bs';

type AnnotationsLabelProps = {
  text: React.ReactNode;
  onClick: any;
}

export const AnnotationsLabelComponent = ({ text, onClick }: AnnotationsLabelProps) => {
  return (
    <div style={{
      'display': 'flex',
      'flexDirection': 'row',
      'alignItems': 'center',
      'maxWidth': '400px',
      'width': '400px'
    }} >
      <Container>
        {text}
      </Container>
      <ButtonComponent onClick={onClick} buttonIcon={<BsFillTrashFill color='#FFF' size={15} />} colorItem='#3eb331' />
    </div>
  );
}