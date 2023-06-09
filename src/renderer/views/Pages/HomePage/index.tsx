import { useEffect, useState } from 'react';
import NavBarComponent from '../../../components/NavBarComponent';
import { HomePageContainer, DataContainer, NavBarContainer, ButtonContainer, Header, ContentContainer } from './styles';
import { DateToString } from '../../../services/DateToString';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { DateFormater } from '../../../services/DateFormater';
import { InsertDrawer } from '../../Drawer/InsertDrawer';
import { useProvider } from '../../../Context/provider';
import { EditDrawer } from '../../Drawer/EditDrawer';
import SpendingComponent from '../../../components/SpendingComponent';
import { AnnotationsDrawer } from '../../Drawer/AnnotationsDrawer';
import RefreshComponent from '../../../components/RefreshComponent';
import { MonthComponent } from '../../../components/MonthComponent';
import GraphComponent from '../../../components/GraphComponent';
import { LoaderComponent } from 'renderer/components/LoaderComponent';
import { FaFileExport, FaFileImport } from 'react-icons/fa';
import ButtonComponent from 'renderer/components/ButtonComponent';
import { ImportDrawer } from 'renderer/views/Drawer/ImportDrawer';
import { useNavigate } from 'react-router-dom';
import ConfigComponent from 'renderer/components/ConfigComponent';
import { ConfigDrawer } from 'renderer/views/Drawer/ConfigDrawer';
import { toast } from 'react-toastify';
import { colors } from 'renderer/shared/colors/global.colors';
import ResumComponent from 'renderer/components/AlertsComponent';
import { ResumDrawer } from 'renderer/views/Drawer/ResumDrawer';

const HomePage = () => {
  const [toggleAdd, setToggleAdd] = useState<boolean>(false);
  const [annotationsID, setAnnotationsID] = useState<number>(0);

  const { 
    data,
    getDate,
    deleteData,
    setToggleAnnotations,
    setToggleEdit,
    setEditDrawer,
    dialogtitleState,
    setDialog,
    loading,
    importDrawer,
    setImportDrawer,
    setConfigDrawer,
    setAlertsDrawer
  } = useProvider();

  useEffect(() => {
    getDate();
  }, []);

  const navigate = useNavigate();

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

  const toggleImportDrawer = () => {
    importDrawer ? setImportDrawer(false) : setImportDrawer(true);
  }

  const toggleExportButton = () => {
    window.electron.ipcRenderer.sendMessage('exportFile', []);
    toast.success('Exportado com sucesso!');
  }

  const toggleConfigButton = () => {
    setConfigDrawer(true);
  }

  const toggleAlertsButton = () => {
    setAlertsDrawer(true);
  }

  const refreshButton = () => {
    getDate();
    toast.success('Dados atualizados');
  }

  const graphButton = () => {
    navigate('/graph')
  }

  const updateDate = async (id: number, bit: number) => {
    window.electron.ipcRenderer.sendMessage('updateData', [id, bit]);
    setTimeout(() => {
      getDate();
    }, 1000);
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
    let sumData: Array<number> = [];
    data?.forEach(x => {
      const d = new Date(x.duedate).getMonth();
      if (d === month) {
          var y: number = +x.value.replace(',', '.');
          sumData.push(y);
      }
    })
    return sumData.reduce((partial, a) => partial + a, 0).toFixed(2);
  }

  return (
    <HomePageContainer>
      <Header>
        <h1 style={{ display: 'flex', justifyContent: 'center', paddingTop: 5, color: 'white' }}>Gasto Anotado</h1>
      </Header>

      <InsertDrawer 
      toggle={toggleAdd}
      setToggle={() => setToggleAdd(false)}
      />
      
      <AnnotationsDrawer
        annotationsID={annotationsID} />

      <EditDrawer />

      <ResumDrawer />

      <ImportDrawer />

      <ConfigDrawer />

      <ContentContainer>

        <NavBarContainer>
          <NavBarComponent onClickAdd={toggleAddButton} />
          <ResumComponent onClickAdd={toggleAlertsButton} />
          <RefreshComponent onClickAdd={refreshButton} />
          <GraphComponent onClickAdd={graphButton} />
          <ImportButton onClickAdd={toggleImportDrawer} />
          <ExportButton onClickAdd={toggleExportButton} />
          <ConfigComponent onClickAdd={toggleConfigButton} />
        </NavBarContainer>

        <DataContainer>
          {
            !loading ? uniqueMonthData()?.map((x: number) => (
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
                <h3 style={{
                  color: 'white',
                  backgroundColor: colors.secondary,
                  padding: '5px'
                }} >Total R$ {calcVALUEs(x)}</h3>
              </MonthComponent>
            )) 
            :
            uniqueMonthData().length > 0 ? <LoaderComponent/> : <></>
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
            toast.success('Registro excluído!');
          }} >Sim</Button>
          <Button onClick={() => setDialog({
            show: false,
            id: null
          })}>Não</Button>
        </DialogActions>
      </Dialog>
      </ContentContainer>
    </HomePageContainer>
  )
}

export default HomePage;

type ButtonProps = {
  onClickAdd?: any;
}

const ImportButton = (props: ButtonProps) => {
  return (
      <ButtonContainer>
          <ButtonComponent buttonIcon={<FaFileImport color='#FFF' size={25} />} onClick={props.onClickAdd} title='Importar Dados' />
      </ButtonContainer>
  );
}

const ExportButton = (props: ButtonProps) => {
  return (
      <ButtonContainer>
          <ButtonComponent buttonIcon={<FaFileExport color='#FFF' size={25} />} onClick={props.onClickAdd} title='Exportar Dados' />
      </ButtonContainer>
  );
}