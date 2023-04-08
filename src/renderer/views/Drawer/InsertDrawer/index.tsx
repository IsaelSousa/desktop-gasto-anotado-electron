import { Drawer } from '@mui/material';
import React, { useState } from 'react';
import { useProvider } from '../../../Context/provider';
import { axiosInstance } from '../../../services/api';
import { InputLabel } from './styles';

interface InsertDrawerProps {
  toggle: boolean;
  setToggle: any;
}

export const InsertDrawer = ({
  toggle,
  setToggle
}: InsertDrawerProps) => {
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [value, setValue] = useState<string>();
  const [dueDate, setDueDate] = useState<string>(Date.now().toString());
  const [parc, setParc] = useState<number>(0);

  const { getDate } = useProvider();

  const ClearData = () => {
    setTitle('');
    setDescription('');
    setValue('');
    setDueDate('');
    setParc(0);
  }

  const insertData = async () => {
    if (parc >= 2) {
      for (let i = 1; i <= parc; i++) {
        const titleData = `${title} - Parcela x${i}`
        const addMonth = new Date(dueDate)

        if (i === 1) {
          addMonth.setMonth(addMonth.getMonth())
        } else if (i >= 2) {
          addMonth.setMonth(addMonth.getMonth() + i)
        }

        const object = {
          title: titleData,
          description,
          value,
          dueDate: addMonth
        }

        window.electron.ipcRenderer.sendMessage('insertData', [object]);
      }
      getDate();
    } else if (parc <= 1) {
      const object = {
        title,
        description,
        value,
        dueDate
      }
      window.electron.ipcRenderer.sendMessage('insertData', [object]);
      getDate();
    }
  }

  return (
    <>
    <Drawer
      anchor={'right'}
      open={toggle}
      onClose={setToggle}
      style={{ padding: 50 }}
    >
      <label style={{ fontWeight: 'bold', marginTop: 20, marginLeft: 20, marginRight: 20, marginBottom: 5 }} className='title'>Título</label>
      <InputLabel value={title} onChange={e => setTitle(e.target.value)} className='title' style={{
        width: 400,
        height: 40,
        textAlign: 'center',
        fontSize: 18,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 5
      }} placeholder='Digite o título' />

      <label style={{ fontWeight: 'bold', marginTop: 20, marginLeft: 20, marginRight: 20, marginBottom: 5 }} className='description'>Descrição</label>
      <InputLabel value={description} onChange={e => setDescription(e.target.value)} className='description' style={{
        width: 400,
        height: 40,
        textAlign: 'center',
        fontSize: 18,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 5
      }} placeholder='Digite a descrição' />

      <label style={{ fontWeight: 'bold', marginTop: 20, marginLeft: 20, marginRight: 20, marginBottom: 5 }} className='value'>Valor</label>
      <InputLabel value={value} onChange={e => setValue(e.target.value)} type={'number'} className='value' style={{
        width: 400,
        height: 40,
        textAlign: 'center',
        fontSize: 18,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 5
      }} placeholder='Digite o valor' />

      <label style={{ fontWeight: 'bold', marginTop: 20, marginLeft: 20, marginRight: 20, marginBottom: 5 }} className='duedate'>Vencimento</label>
      <InputLabel value={dueDate} onChange={e => setDueDate(e.target.value)} type={'date'} className='duedate' style={{
        width: 400,
        height: 40,
        textAlign: 'center',
        fontSize: 18,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 5
      }} placeholder='Informe o vencimento' />

      <label style={{ fontWeight: 'bold', marginTop: 20, marginLeft: 20, marginRight: 20, marginBottom: 5 }} className='parc'>Parcelamento</label>
      <InputLabel min={0} value={parc} onChange={e => setParc(Number(e.target.value))} type={'number'} className='parc' style={{
        width: 400,
        height: 40,
        textAlign: 'center',
        fontSize: 18,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 5
      }} placeholder='Parcelamentos (Opcional)' />

      <button onClick={() => insertData()} style={{
        width: 400,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 5,
        height: 40,
        backgroundColor: 'greenyellow',
        fontWeight: '900',
        cursor: 'pointer'
      }} >Adicionar</button>

      <button onClick={() => ClearData()} style={{
        width: 400,
        marginLeft: 20,
        marginRight: 20,
        height: 40,
        backgroundColor: 'greenyellow',
        fontWeight: '900',
        cursor: 'pointer'
      }} >Limpar</button>

    </Drawer>
  </>
  )
}