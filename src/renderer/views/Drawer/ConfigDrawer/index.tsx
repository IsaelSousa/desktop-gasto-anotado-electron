import { useState } from 'react';
import { Drawer } from '@mui/material';
import { useProvider } from '../../../Context/provider';
import { ButtonSave, Container, InputText } from "./styles";

export const ConfigDrawer = () => {
    const { configDrawer, setConfigDrawer } = useProvider();
    const [path, setPath] = useState<string>(JSON.parse(JSON.stringify(localStorage.getItem("path"))));

    const handleSavePath = () => {
        localStorage.setItem("path", path);
    }

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