import { Drawer } from "@mui/material";
import { useEffect, useState } from "react";
import { useProvider } from "../../../Context/provider";
import { InputLabel } from './styles';

export const EditDrawer = () => {
  const [titleState, setTitle] = useState<string>();
  const [descriptiontitleState, setDescription] = useState<string>();
  const [valuetitleState, setValue] = useState<string>();
  const [dueDatetitleState, setDueDate] = useState<string>();

  const { 
    editDate,
    setToggleEdit,
    toggleEdit,
    editDrawer,
    setDialog,
    dialogtitleState
   } = useProvider();

  useEffect(() => {
    setTitle(editDrawer.title);
    setDescription(editDrawer.description);
    setValue(editDrawer.value);
    setDueDate(editDrawer.duedate);
    setDialog({
      id: editDrawer.id,
      show: false
    })
  }, [editDrawer]);

  return (
    <>
      <Drawer
        anchor={'right'}
        open={toggleEdit}
        onClose={() => {
          setToggleEdit(false);
        }}
        style={{ padding: 50 }}
      >
        <label style={{ fontWeight: 'bold', marginTop: 20, marginLeft: 20, marginRight: 20, marginBottom: 5 }} className='title'>Título</label>
        <InputLabel value={titleState} onChange={e => setTitle(e.target.value)} className='title' style={{
          width: 400,
          height: 40,
          textAlign: 'center',
          fontSize: 18,
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 5
        }} placeholder='Digite o título' />

        <label style={{ fontWeight: 'bold', marginTop: 20, marginLeft: 20, marginRight: 20, marginBottom: 5 }} className='description'>Descrição</label>
        <InputLabel value={descriptiontitleState} onChange={e => setDescription(e.target.value)} className='description' style={{
          width: 400,
          height: 40,
          textAlign: 'center',
          fontSize: 18,
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 5
        }} placeholder='Digite a descrição' />

        <label style={{ fontWeight: 'bold', marginTop: 20, marginLeft: 20, marginRight: 20, marginBottom: 5 }} className='value'>Valor</label>
        <InputLabel value={valuetitleState} onChange={e => setValue(e.target.value)} type={'number'} className='value' style={{
          width: 400,
          height: 40,
          textAlign: 'center',
          fontSize: 18,
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 5
        }} placeholder='Digite o valor' />

        <label style={{ fontWeight: 'bold', marginTop: 20, marginLeft: 20, marginRight: 20, marginBottom: 5 }} className='duedate'>Vencimento</label>
        <InputLabel value={dueDatetitleState} onChange={e => setDueDate(e.target.value)} type={'date'} className='duedate' style={{
          width: 400,
          height: 40,
          textAlign: 'center',
          fontSize: 18,
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 5
        }} placeholder='Informe o vencimento' />

        <button onClick={() => editDate({
          id: dialogtitleState.id,
          title: titleState,
          description: descriptiontitleState,
          value: valuetitleState,
          duedate: dueDatetitleState
        })} style={{
          width: 400,
          marginTop: 10,
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 5,
          height: 40,
          backgroundColor: 'greenyellow',
          fontWeight: '900',
          cursor: 'pointer'
        }} >Editar</button>

        <button onClick={() => setDialog({
          id: dialogtitleState.id,
          show: true
        })} style={{
          width: 400,
          marginTop: 10,
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 5,
          height: 40,
          backgroundColor: 'greenyellow',
          fontWeight: '900',
          cursor: 'pointer'
        }} >Excluir</button>
      </Drawer>
    </>
  )
}