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
