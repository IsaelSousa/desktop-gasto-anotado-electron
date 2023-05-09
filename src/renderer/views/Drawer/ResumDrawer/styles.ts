import { colors } from 'renderer/shared/colors/global.colors';
import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
    background-color: ${colors.secondary};
    display: flex;
    flex-direction: column;
    color: white;
`;

export const LabelHeader = styled.div`
    background-color: ${colors.header};
    width: 300px;
    text-align: center;
    padding: 10px;
    font-weight: bold;
`;

export const MainContent = styled.div`
    background-color: ${colors.primary};
    text-align: center;
    padding: 5px;
    font-weight: bold;
`;

export const SecondaryContent = styled.div`
    padding: 5px;
    font-weight: bold;
`;