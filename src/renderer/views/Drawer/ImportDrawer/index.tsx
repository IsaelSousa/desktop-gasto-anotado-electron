import { Drawer } from "@mui/material";
import { useProvider } from "../../../Context/provider";
import { ChangeEvent, useEffect, useState } from "react";

export const ImportDrawer = () => {
    const { importDrawer, setImportDrawer, getDate } = useProvider();
    const [file, setFile] = useState<File>();

    useEffect(() => {
        console.log({file});
    }, [file]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          setFile(e.target.files[0]);
        }
      };
    
      const handleClick = () => {
        if (!file)
            return;

        window.electron.ipcRenderer.sendMessage('importFile', [file.path]);
        getDate();
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
            <div style={{ display: 'flex', marginTop: '5rem', flexDirection: 'column' }}>
                <input 
                type="file"
                name="Import Json"
                id="importFile"
                onChange={handleFileChange}
                />
                <button onClick={handleClick} >Send</button>
            </div>
        </Drawer>
        </>
    )
}