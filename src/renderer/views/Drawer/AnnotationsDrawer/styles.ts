import styled from 'styled-components';

export const Container = styled.div`
    background-color: #1b4385;
    display: flex;
    height: calc(100vh - 51px);
    width: 400px;
    flex-direction: column;
`;

export const InputLabel = styled.input`

`;

export const SendAnnotation = styled.div`
    display: flex;
    width: 400px;
    flex-direction: 'row';
    align-items: center;
    justify-content: space-around;
    position: fixed;
    bottom: 0px;
`;