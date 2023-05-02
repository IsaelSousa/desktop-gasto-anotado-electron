import { colors } from 'renderer/shared/colors/global.colors';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    padding: 1rem;
    flex-direction: column;
    background-color: ${colors.secondary};
    height: 100vh;
    color: white;
`;

export const InputText = styled.input`
    width: 300px;
    font-size: 12pt;
    padding: 5px;
    border-color: white;
`;

export const Title = styled.a`
    font-size: 12pt;
    font-weight: bold;
    margin: 5px;
`;

export const ButtonSave = styled.button`
    margin-top: 1rem;
    background-color: #3eb331;
    padding: 10px;
    border: none;

    &:hover {
        cursor: pointer;
    }
`;