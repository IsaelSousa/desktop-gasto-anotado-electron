import { useState, useEffect } from 'react';
import { Drawer } from '@mui/material';
import { useProvider } from '../../../Context/provider';
import { ButtonSave, Container, InputText } from "./styles";

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
                <InputText value={path} onChange={e => setPath(e.target.value)}  />
                <ButtonSave onClick={handleSavePath} >Salvar</ButtonSave>
            </Container>
        </Drawer>
    )
}