import styled from 'styled-components'
import { colors } from '../../shared/colors/global.colors';

export const ButtonContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100px;
  height: 100px;
  padding: 10px;
  border: none;
  background-color: ${colors.secondary};
  border: ${colors.secondary} solid 3px;

  &:hover {
    cursor: pointer;
    border: ${colors.primary} solid 3px;
  }
`
