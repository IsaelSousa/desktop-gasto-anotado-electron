import { colors } from 'renderer/shared/colors/global.colors';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    width: 100%;
`;

export const Header = styled.div`
  width: 100%;
  padding: 10px;
  background: ${colors.header};
`;

export const NavBarContainer = styled.div`

`;

export const BarContainer = styled.div`
  display: flex;
`;