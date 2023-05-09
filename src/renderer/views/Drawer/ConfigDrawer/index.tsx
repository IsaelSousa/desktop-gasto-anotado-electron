import { useState, useEffect } from 'react';
import { Drawer } from '@mui/material';
import { useProvider } from '../../../Context/provider';
import { ButtonSave, Container, InputText, Title } from './styles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ConfigDrawer = () => {
    const { configDrawer, setConfigDrawer } = useProvider();
    const [path, setPath] = useState<string>("");

    const getConfigPath = () => {
        window.electron.ipcRenderer.once('showConfigPath', (arg: any) => {
            setPath(arg);
        });
        window.electron.ipcRenderer.sendMessage('showConfigPath', []);
    }

    const handleSavePath = () => {
        window.electron.ipcRenderer.sendMessage('showConfigPath', [path]);
        toast.success('Configuração Salva');
    }

    useEffect(() => {
        getConfigPath();
    }, []);

    return (
        <Drawer
            anchor={'right'}
            open={configDrawer}
            onClose={() => {
                setConfigDrawer(false);
            }}
            style={{ padding: 50 }}
        >
            <Container>
                <Title>Arquivo do banco de dados</Title>
                <InputText value={path} onChange={e => setPath(e.target.value)}  />
                <ButtonSave onClick={handleSavePath} >Salvar</ButtonSave>
            </Container>
        </Drawer>
    )
}