import React from 'react';
import ButtonComponent from '../ButtonComponent';
import { SpendingContainer, SpendingFloatLeft, SpendingFloatRight } from './styles';
import { AiFillEdit, AiFillCheckCircle } from 'react-icons/ai';
import { HiAnnotation } from 'react-icons/hi';

type SpendingType = {
  id?: number;
  title: string;
  description: string;
  paidout?: number | undefined;
  value: string;
  dueDate: string;
  onClick?: unknown;
  onClickDelete?: unknown;
  onClickEdit?: unknown;
  onClickAnnotations?: unknown;
}

function SpendingComponent({ title, description, paidout, value, dueDate, onClick, onClickEdit, onClickAnnotations }: SpendingType) {
  function toBool(bit: number) {
    const splitDate = dueDate.split('/');
    const actualDate = new Date(`${splitDate[1]}/${splitDate[0]}/${splitDate[2]}`);
    if (Number(bit) === 1) {
      return true;
    } else {
      if (new Date() >= new Date(actualDate)) {
        return 'venceu';
      } else {
        return false;
      }
    }
  }

  return (
    <SpendingContainer colorBackground={toBool(paidout)}>
      <SpendingFloatLeft colorBackground={toBool(paidout)} >
        <strong style={{ backgroundColor: 'inherit' }} >{title}</strong>
        <br />
        {description}
      </SpendingFloatLeft>
      <SpendingFloatRight colorBackground={toBool(paidout)} >
        <div style={{ marginRight: '3rem', textAlign: 'center' }}>
          <strong style={{ backgroundColor: 'inherit' }} >Valor</strong>
          <br />
          R$ {value}
        </div>
        <br />
        <div>
          <strong style={{ backgroundColor: 'inherit' }} >Vencimento</strong>
          <br />
          {dueDate.toString()}
        </div>
        <div style={{ marginLeft: '1rem' }}>
          <ButtonComponent colorItem='#0099ff' buttonIcon={<AiFillCheckCircle color='white' size={16} />} onClick={onClick} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <ButtonComponent onClick={onClickEdit} colorItem='#0099ff' buttonIcon={<AiFillEdit color='white' size={16} />} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <ButtonComponent onClick={onClickAnnotations}  colorItem='#0099ff' buttonIcon={<HiAnnotation color='white' size={16} />} />
        </div>
      </SpendingFloatRight>
    </SpendingContainer>
  )
}

export default SpendingComponent;
