import { Drawer } from "@mui/material";
import { useProvider } from "../../../Context/provider";

export const ConfigDrawer = () => {
    const { configDrawer, setConfigDrawer } = useProvider();

    return (
        <Drawer
            anchor={'right'}
            open={configDrawer}
            onClose={() => {
                setConfigDrawer(false);
            }}
            style={{ padding: 50 }}
        >
            a
        </Drawer>
    )
}