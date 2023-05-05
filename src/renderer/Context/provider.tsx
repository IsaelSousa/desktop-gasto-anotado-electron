import React, { createContext, useContext, useState, useEffect } from 'react';
import { contextType, DialogProps, EditDrawerProps, IAnnotations, IDataType, IDataTypeToEdit,  } from '../models/Types';
import { toast } from 'react-toastify';

interface ContextProps {
  children: React.ReactNode
}

const initialState: IAnnotations = {
  id: 0,
  idRegister: 0,
  annotations: '',
  createdAt: ''
}

export const Context = createContext<contextType>({} as contextType);

export const Provider = (props: ContextProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<boolean>(false);
  const [data, setData] = useState<IDataType[]>();
  const [dataAnnotations, setDataAnnotations] = useState<IAnnotations[]>([initialState]);

  const [toggleEdit, setToggleEdit] = useState<boolean>();
  const [toggleAnnotations, setToggleAnnotations] = useState<boolean>();
  const [toggleInsert, setToggleInsert] = useState<boolean>();
  const [alertsDrawer, setAlertsDrawer] = useState<boolean>();

  const [importDrawer, setImportDrawer] = useState<boolean | undefined>(false);

  const [configDrawer, setConfigDrawer] = useState<boolean | undefined>(false);

  const [editDrawer, setEditDrawer] = useState<EditDrawerProps>({
    id: 0,
    title: '',
    description: '',
    duedate: '',
    value: ''
  });

  const [dialogtitleState, setDialog] = useState<DialogProps>({
    show: false,
    id: null
  });

  useEffect(() => {
    if(alert){
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }
  }, [alert]);

  const getDate = async () => {
    setLoading(true);
    window.electron.ipcRenderer.once('getData', (arg: any) => {
      setData(arg);
      setLoading(false);
    });
    window.electron.ipcRenderer.sendMessage('getData', []);
  }

  const editDate = async (data: IDataTypeToEdit) => {
    const object = {
      id: data.id,
      title: data.title,
      description: data.description,
      value: data.value,
      dueDate: data.duedate
    }

    window.electron.ipcRenderer.on('editData', (resp) => {
      if (resp) {
        toast.success('Registro editado com sucesso.');
      }
    });
    window.electron.ipcRenderer.sendMessage('editData', [object]);

    setTimeout(() => {
      getDate();
    }, 1500);
  }

  const getAnnotations = async (idNumber: number) => {
      window.electron.ipcRenderer.once('getAnnotations', (arg: any) => {
        setDataAnnotations(arg);
      });
      window.electron.ipcRenderer.sendMessage('getAnnotations', [idNumber]);
  }

  const deleteAnnotations = (id: number) => {
    window.electron.ipcRenderer.sendMessage('deleteAnnotations', [id]);
    getAnnotations(id);
  }

  const insertAnnotations = async (idRegister: number, annotations: string) => {
    window.electron.ipcRenderer.sendMessage('insertAnnotations', [idRegister, annotations]);
    getAnnotations(idRegister);
  }

  const deleteData = async (id: number | null) => {
    window.electron.ipcRenderer.sendMessage('deleteData', [id]);
    setTimeout(() => {
      getDate();
    }, 1500);
  }

  const state = { 
    alert, 
    data, 
    dataAnnotations, 
    setDataAnnotations,
    toggleEdit,
    setToggleEdit,
    editDrawer,
    setEditDrawer,
    toggleAnnotations,
    setToggleAnnotations,
    toggleInsert,
    setToggleInsert,
    dialogtitleState,
    setDialog,
    loading,
    importDrawer,
    setImportDrawer,
    configDrawer,
    setConfigDrawer,
    alertsDrawer,
    setAlertsDrawer
   }
  
  const actions = {
    getDate,
    editDate, 
    deleteAnnotations, 
    insertAnnotations, 
    getAnnotations, 
    deleteData
   }

  return (
    <Context.Provider value={{
      ...state, 
      ...actions 
    }}>
      {props.children}
    </Context.Provider>
  )
}

export function useProvider(): contextType {
  return useContext(Context);
}