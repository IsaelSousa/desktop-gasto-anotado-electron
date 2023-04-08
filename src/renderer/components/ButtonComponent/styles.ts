import styled from 'styled-components'

interface ContainerProps {
  painter: string;
}

export const ButtonContainer = styled.button<ContainerProps>`
  display: flex;
  margin-right: 10px;
  justify-content: center;
  flex-direction: row;
  padding: 10px;
  border-radius: 10px;
  border: none;
  background-color: ${props => props.painter};
  border: ${props => props.painter} solid 2px;

  &:hover {
    cursor: pointer;
    border: black solid 2px;
  }
`
