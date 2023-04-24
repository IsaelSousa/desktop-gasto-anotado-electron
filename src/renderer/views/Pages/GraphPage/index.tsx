import { useEffect, useState } from 'react';
import { BarContainer, Container, NavBarContainer } from './styles';
import { useNavigate } from 'react-router-dom';
import GoBackComponent from 'renderer/components/GoBackComponent';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie } from 'recharts';
import { useProvider } from 'renderer/Context/provider';

interface GraphProps {
    month: string;
    value: string;
}

export const GraphPage = () => {
    const navigate = useNavigate();
    const { data } = useProvider();
    const [graphData, setGraphData] = useState<GraphProps[]>([{
        month: '',
        value: ''
    }]);

    const goBackButton = () => {
        navigate("/");
    }

    const removeDate = (date: Date) => {
      const fullDay = new Date(date);
      const year = fullDay.getFullYear().toString();
      const month = (fullDay.getMonth() + 1).toString().padStart(2, '0');
      return new Date(`${year}-${month}-01T00:00:00.000Z`);
    }

    const uniqueMonthData = () => {
      const uniqueMonth: string[] = []
      data?.forEach(x => {
        if (!uniqueMonth.includes(removeDate(x.duedate).toISOString())) {
          uniqueMonth.push(removeDate(x.duedate).toISOString())
        }
      })
      return uniqueMonth;
    }

    const calcVALUEs = (month: Date) => {
      let sumData: number[] = [];
      data?.forEach(x => {
        const d = new Date(removeDate(x.duedate));
        if (d.getMonth() === month.getMonth()) {
            var y: number = +x.value.replace(',', '.');
            sumData.push(y);
        }
      })
      return sumData.reduce((partial, a) => partial + a, 0).toFixed(2);
    }

    const handleGraphData = () => {
        let array: GraphProps[] = [];
        uniqueMonthData().sort().forEach(x => {
            const dateString = new Date(x);
            if (!array?.includes({
                month: dateString.toISOString().replace("-01T00:00:00.000Z", ""),
                value: calcVALUEs(dateString)
            })) {
                array.push({
                    month: dateString.toISOString().replace("-01T00:00:00.000Z", ""),
                    value: calcVALUEs(dateString)
                });
            }
        });
        setGraphData(array);
    }

      useEffect(() => {
        handleGraphData();
      }, []);

    const BarGraphics = () => {
        return (
            <BarChart
                width={900}
                height={500}
                data={graphData}
                barSize={150}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
        );
    };

    return (
        <Container>
            <h1 style={{ display: 'flex', justifyContent: 'center', paddingTop: 5 }}>
                Gráfico
            </h1>

            <NavBarContainer>
                <GoBackComponent onClickAdd={goBackButton} />
            </NavBarContainer>

            <BarContainer>
                {BarGraphics()}
            </BarContainer>
        </Container>
    )
}