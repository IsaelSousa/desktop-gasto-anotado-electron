import { useState } from 'react';
import { ButtonContainer, Container } from "./styles";
import { colors } from '../../shared/colors/global.colors';
import { BsArrowUpSquareFill, BsArrowDownSquareFill } from 'react-icons/bs';

type MonthProps = {
    label: string | undefined;
    children: React.ReactNode;
}

export const MonthComponent = (props: MonthProps) => {
    const [enable, setEnable] = useState<boolean>();
    return (
        <Container>
            <ButtonContainer
            onClick={() => setEnable(!enable)}
            style={{
                backgroundColor: colors.secondary,
                padding: 12,
                color: 'white',
                fontWeight: 'bold',
                border: 'none',
                justifyContent: 'space-between'
            }}>
                {!enable ? 
                <BsArrowUpSquareFill size={20} style={{
                    marginLeft: '1rem'
                }} />
                 : 
                 <BsArrowDownSquareFill size={20} style={{
                    marginLeft: '1rem'
                }} />
                 }                
                {props.label}
                <div></div>
            </ButtonContainer>
            {enable ? <></> : props.children}
        </Container>
    );
}