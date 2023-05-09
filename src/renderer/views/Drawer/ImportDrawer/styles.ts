import { colors } from 'renderer/shared/colors/global.colors';
import styled from 'styled-components';

export const Container = styled.div`
    padding: 10px;
    height: 100vh;
    background-color: ${colors.secondary};
    display: flex;
    flex-direction: column;
    padding-top: 10rem;
    color: white;
`;

export const Title = styled.a`
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 14pt;
`;

export const Button = styled.button`
    margin-top: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
    padding: 10px;
    background-color: #3eb331;

    border: none;

    color: white;
    font-weight: bold;

    &:hover {
        cursor: pointer;
    }
`;