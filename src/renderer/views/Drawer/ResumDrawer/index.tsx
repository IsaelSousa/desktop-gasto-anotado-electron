import { useState, useEffect } from 'react';
import { Drawer } from '@mui/material';
import { useProvider } from '../../../Context/provider';
import { Container, LabelHeader, MainContent, SecondaryContent } from './styles';
import { IDataType } from 'renderer/models/Types';
import { AiFillCalendar } from 'react-icons/ai';
import { DateToString } from '../../../services/DateToString';

export const ResumDrawer = () => {
    const { alertsDrawer, setAlertsDrawer } = useProvider();
    const [data, setData] = useState<IDataType[]>();
    const [date, setDate] = useState<string[]>();

    useEffect(() => {
        window.electron.ipcRenderer.once('getData', (arg: any) => {
            setData(arg);
          });
          window.electron.ipcRenderer.sendMessage('getData', []);
    }, []);

    const dateTime = (year: string, month: string) => data?.filter(d => new Date(d.duedate).getFullYear().toString() === year && new Date(d.duedate).getMonth().toString() === month);

    const handleData = () => {
        const yearAndMonth: string[] = [];
        data?.forEach((x, i) => {
            const concatYearAndMonth = new Date();
            concatYearAndMonth.setDate(0);
            concatYearAndMonth.setMonth(new Date(x.duedate).getMonth());
            concatYearAndMonth.setFullYear(new Date(x.duedate).getFullYear());
            concatYearAndMonth.setHours(0);
            concatYearAndMonth.setMinutes(0);
            concatYearAndMonth.setSeconds(0);
            concatYearAndMonth.setMilliseconds(0);

            if (!yearAndMonth.includes(concatYearAndMonth.toISOString())) {
                yearAndMonth.push(concatYearAndMonth.toISOString());
            }
        });

        setDate(yearAndMonth);
    }

    const calcValues = (year: number, month: number) => {
        let sumData: Array<number> = [];
        data?.forEach(x => {
            const monthDate = new Date(x.duedate).getMonth();
            const yearDate = new Date(x.duedate).getFullYear();

            if (monthDate === month && yearDate === year) {
                var y: number = +x.value.replace(',', '.');
                sumData.push(y);
            }
        })
        return sumData.reduce((partial, a) => partial + a, 0).toFixed(2);
      }

    useEffect(() => {
        handleData();
    }, [data]);

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
                <LabelHeader>Resumo Geral</LabelHeader>
                {date?.map((x, i) => (
                    <div key={i}>
                        <MainContent>
                            <AiFillCalendar style={{
                            marginRight: 10
                        }} />{`${x.substring(0,7)} (${DateToString(new Date(x).getMonth() + 1)})`}
                        </MainContent>
                        <SecondaryContent>R$ {calcValues(new Date(x).getFullYear(), new Date(x).getMonth())}</SecondaryContent>
                    </div>
                ))}
            </Container>
        </Drawer>
        </>
    )
}