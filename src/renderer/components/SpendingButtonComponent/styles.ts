import styled from 'styled-components'
import { colors } from '../../shared/colors/global.colors';

export const ButtonContainer = styled.button`
  display: flex;
  justify-content: center;
  flex-direction: row;
  padding: 10px;
  border: none;
  margin-left: 10px;
  background-color: ${colors.background};
  border: ${colors.background} solid 3px;
  border-radius: 20px;

  &:hover {
    cursor: pointer;
    border: ${colors.primary} solid 3px;
  }
`
