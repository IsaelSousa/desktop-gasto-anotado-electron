import React from 'react';
import ButtonComponent from '../ButtonComponent';
import { Container } from './styles';
import { BsFillTrashFill } from 'react-icons/bs';
import AnnotationsSendButtonComponent from '../AnnotationsSendButtonComponent';
import { DateTimeFormater } from 'renderer/services/DateFormater';

type AnnotationsLabelProps = {
  text: React.ReactNode;
  date: string;
  onClick: any;
}

export const AnnotationsLabelComponent = ({ text, onClick, date }: AnnotationsLabelProps) => {
  return (
    <div style={{
      'display': 'flex',
      'flexDirection': 'row',
      'alignItems': 'center',
      'marginBottom': '10px',
      'backgroundColor': 'lightgray',
      'padding': '5px',
      'paddingRight': '10px',
      'borderRadius': '10px'
    }} >
      <Container>
        <p style={{ wordBreak: 'break-word' }}>
          {text}
        </p>
        <p style={{ marginTop: '15px', fontSize: '10pt', fontWeight: 'bold' }}>
          {DateTimeFormater(new Date(date))}
        </p>
      </Container>
      <AnnotationsSendButtonComponent onClick={onClick} buttonIcon={<BsFillTrashFill color='#FFF' size={15} />} title='Apagar' />
    </div>
  );
}