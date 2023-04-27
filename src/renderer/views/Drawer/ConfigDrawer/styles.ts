import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    padding: 1rem;
    flex-direction: column;
`;

export const InputText = styled.input`
    width: 300px;
    font-size: 12pt;
    padding: 5px;
`;

export const ButtonSave = styled.button`
    margin-top: 1rem;
    background-color: #3eb331;
    padding: 5px;

    &:hover {
        cursor: pointer;
    }
`;