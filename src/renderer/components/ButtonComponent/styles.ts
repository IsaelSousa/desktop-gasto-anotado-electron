import styled from 'styled-components'
import { colors } from '../../shared/colors/global.colors';

export const ButtonContainer = styled.button`
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding: 30px;
  border: none;
  background-color: ${colors.secondary};
  border: ${colors.secondary} solid 3px;

  &:hover {
    cursor: pointer;
    border: ${colors.primary} solid 3px;
  }
`
