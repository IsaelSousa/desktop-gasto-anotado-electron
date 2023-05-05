import { colors } from 'renderer/shared/colors/global.colors';
import styled from 'styled-components';

export const InputLabel = styled.input`
    background-color: white;
`
export const Label = styled.label`
    font-size: 14pt;
    font-weight: bold;
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 5px;

`;

export const Container = styled.div`
    background-color: ${colors.secondary};
    display: flex;
    height: 100%;
    flex-direction: column;
`;