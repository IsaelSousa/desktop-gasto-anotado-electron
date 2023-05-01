import styled from 'styled-components'

interface ContainerProps {
  colorBackground: boolean | string;
}

export const SpendingContainer = styled.div<ContainerProps>`
  display: flex;
  flex-direction: row;
  padding-left: 20px;
  padding-right: 20px;
  justify-content: space-between;
  align-items: center;

  width: auto;
  height: 3rem;
  background-color: ${props => props.colorBackground === true ? '#2d8524' : props.colorBackground === 'venceu' ? 'red' : '#e9e9e9'};

  border: ${props => props.colorBackground === true ? '#2d8524 solid 2px' : props.colorBackground === 'venceu' ? 'darkred solid 2px' : 'gray solid 2px'};
  cursor: pointer;
  &:hover {
    border: ${props => props.colorBackground === true ? 'darkgreen solid 2px' : 'black solid 2px'};
  }

  transform: 1s;
`
export const SpendingFloatLeft = styled.div<ContainerProps>`
  float: left;
  background-color: inherit;
  color: ${props => props.colorBackground === true ? 'white' : props.colorBackground === 'venceu' ? 'white' : 'black'};
`
export const SpendingFloatRight = styled.div<ContainerProps>`
  display: flex;
  float: right;
  background-color: inherit;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${props => props.colorBackground === true ? 'white' : props.colorBackground === 'venceu' ? 'white' : 'black'};
`
