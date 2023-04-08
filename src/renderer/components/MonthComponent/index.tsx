import { useState } from "react";
import { ButtonContainer, Container } from "./styles";

type MonthProps = {
    label: string | undefined;
    children: React.ReactNode;
}

export const MonthComponent = (props: MonthProps) => {
    const [enable, setEnable] = useState<boolean>();
    return (
        <Container>
            <ButtonContainer onClick={() => setEnable(!enable)} style={{
                marginBottom: 5,
                marginTop: 5,
                backgroundColor: '#000200',
                padding: 8,
                borderRadius: 10,
                color: 'white'
            }}>
                {props.label}
            </ButtonContainer>
            {enable ? <></> : props.children}
        </Container>
    );
}