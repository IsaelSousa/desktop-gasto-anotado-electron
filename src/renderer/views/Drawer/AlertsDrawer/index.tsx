import { Drawer } from '@mui/material';
import { useProvider } from '../../../Context/provider';
import { Container } from './styles';

export const AlertsDrawer = () => {
    const { alertsDrawer, setAlertsDrawer } = useProvider();

    return (
        <>
        <Drawer
            anchor={'right'}
            open={alertsDrawer}
            onClose={() => {
                setAlertsDrawer(false);
            }}
            style={{ padding: 50 }}
        >
            <Container>

            </Container>
        </Drawer>
        </>
    )
}