import React, { useEffect, useState } from 'react';
import NavBarComponent from '../../../components/NavBarComponent';
import { HomePageContainer, DataContainer, NavBarContainer } from './styles';
import { DateToString } from '../../../services/DateToString';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { DateFormater } from '../../../services/DateFormater';
import { axiosInstance } from '../../../services/api';
import { InsertDrawer } from '../../Drawer/InsertDrawer';
import { useProvider } from '../../../Context/provider';
import { EditDrawer } from '../../Drawer/EditDrawer';
import SpendingComponent from '../../../components/SpendingComponent';
import { AnnotationsDrawer } from '../../Drawer/AnnotationsDrawer';
import RefreshComponent from '../../../components/RefreshComponent';
import { MonthComponent } from '../../../components/MonthComponent';
import GraphComponent from '../../../components/GraphComponent';

const HomePage = () => {
  const [toggleAdd, setToggleAdd] = useState<boolean>(false);
  const [annotationsID, setAnnotationsID] = useState<number>(0);

  const { data, getDate, deleteData, setToggleAnnotations, setToggleEdit, setEditDrawer, dialogtitleState, setDialog } = useProvider();

  useEffect(() => {
    getDate();
  }, []);

  const uniqueMonthData = () => {
    const uniqueMonth: number[] = []
    data?.forEach(x => {
      if (!uniqueMonth?.includes(new Date(x.duedate).getMonth())) {
        uniqueMonth?.push(new Date(x.duedate).getMonth())
      }
    })
    return uniqueMonth;
  }

  const toggleAddButton = () => {
    toggleAdd ? setToggleAdd(false) : setToggleAdd(true);
  }

  const refreshButton = () => {
    getDate();
  }

  const updateDate = async (id: number, bit: number) => {
    window.electron.ipcRenderer.sendMessage('updateData', [id, bit]);
    getDate();
  }

  const monthItems = (a: number) => data?.filter(d => new Date(d.duedate).getMonth() === a).sort();

  const paidOut = (id: number, bit: number) => {
    if (bit == 0) {
      updateDate(id, 1);
    } else {
      updateDate(id, 0);
    }
  }

  const calcVALUEs = (month: number) => {
    let sumData = 0
    data?.forEach(x => {
      const d = new Date(x.duedate).getMonth();
      if (d === month) {
        sumData = sumData + Number(x.value);
      }
    })
    return sumData.toFixed(2);
  }

  return (
    <HomePageContainer>
      <h1 style={{ display: 'flex', justifyContent: 'center', paddingTop: 5 }}>Gasto Anotado</h1>

      <NavBarContainer>
        <NavBarComponent onClickAdd={toggleAddButton} />
        <RefreshComponent onClickAdd={refreshButton} />
        <GraphComponent />
      </NavBarContainer>

      <InsertDrawer 
      toggle={toggleAdd}
      setToggle={() => setToggleAdd(false)}
      />
      
      <AnnotationsDrawer
        annotationsID={annotationsID} />

      <EditDrawer />

      <DataContainer>
        {
          uniqueMonthData()?.map((x: number) => (
            <MonthComponent key={x.toPrecision()} label={DateToString(x + 1)}>
              {monthItems(x)?.map(a => (
                <SpendingComponent key={a.id}
                  title={a.title}
                  description={a.description}
                  paidout={a.paidout}
                  value={a.value}
                  dueDate={DateFormater(a.duedate)}
                  onClick={() => paidOut(a.id, a.paidout)}
                  onClickEdit={() => {
                    setToggleEdit(true);
                    setEditDrawer({
                      id: a.id,
                      title: a.title,
                      description: a.description,
                      value: a.value,
                      duedate: a.duedate.toString()
                    });
                  }}
                  onClickDelete={() => setDialog({
                    show: true,
                    id: a.id
                  })}
                  onClickAnnotations={() => {
                    setToggleAnnotations(true);
                    setAnnotationsID(a.id);
                  }}
                />
              ))}
              <h3>Total R$ {calcVALUEs(x)}</h3>
            </MonthComponent>
          ))
        }
      </DataContainer>
      <Dialog open={dialogtitleState.show}>
        <DialogTitle>
          Alerta
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja excluir o registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            deleteData(dialogtitleState.id)
            setDialog({
              show: false,
              id: null
            });
            setToggleEdit(false);
          }} >Sim</Button>
          <Button onClick={() => setDialog({
            show: false,
            id: null
          })}>Não</Button>
        </DialogActions>
      </Dialog>
    </HomePageContainer>
  )
}

export default HomePage;
