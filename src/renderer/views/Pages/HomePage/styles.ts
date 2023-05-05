import styled from 'styled-components'
import { colors } from '../../../shared/colors/global.colors';

export const Header = styled.div`
  padding: 10px;
  background: ${colors.header};
`;

export const HomePageContainer = styled.div`
  width: 100%;
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

export const DataContainer = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 62px);
  align-items: center;
  flex-direction: column;
  background-color: ${colors.contentBackground};
`

export const NavBarContainer = styled.div`
  background-color: ${colors.secondary};
  border-right: 2px solid ${colors.header};
`;

export const MonthContainer = styled.div`

`

export const InputLabel = styled.input`

`

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
`;

export const DividerContainer = styled.div`
  width: 1rem;
  height: auto;
  background-color: black;
`;