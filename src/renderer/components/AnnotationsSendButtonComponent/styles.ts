import styled from 'styled-components'
import { colors } from '../../shared/colors/global.colors';

export const ButtonContainer = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  border: none;
  background-color: ${colors.secondary};
  border: ${colors.secondary} solid 3px;
  border-radius: 10px;

  &:hover {
    cursor: pointer;
    border: ${colors.primary} solid 3px;
  }
`
