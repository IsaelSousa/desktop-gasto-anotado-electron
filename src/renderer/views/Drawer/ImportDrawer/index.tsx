import { Drawer } from "@mui/material";
import { useProvider } from "../../../Context/provider";
import { ChangeEvent, useState } from "react";
import { Button, Container, Title } from "./styles";

export const ImportDrawer = () => {
    const { importDrawer, setImportDrawer, getDate } = useProvider();
    const [file, setFile] = useState<File>();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          setFile(e.target.files[0]);
        }
      };
    
      const handleClick = () => {
        if (!file)
            return;

        if (file) {
            window.electron.ipcRenderer.sendMessage('importFile', [file.path]);
            getDate();
        } 
      }

    return (
        <>
        <Drawer
            anchor={'right'}
            open={importDrawer}
            onClose={() => {
                setImportDrawer(false);
            }}
            style={{ padding: 50 }}
        >
            <Container style={{ display: 'flex', marginTop: '5rem', flexDirection: 'column' }}>
                <Title>Importar Registros</Title>
                <input 
                type="file"
                name="Import Json"
                id="importFile"
                onChange={handleFileChange}
                style={{
                    cursor: 'pointer'
                }}
                />
                <Button onClick={handleClick} >Send</Button>
            </Container>
        </Drawer>
        </>
    )
}