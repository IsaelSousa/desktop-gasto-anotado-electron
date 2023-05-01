import { NavBarContainer } from './styles';
import ButtonComponent from '../ButtonComponent';
import { IoMdAdd } from 'react-icons/io';

type NavBarProps = {
  onClickAdd?: any;
}

function NavBarComponent (props: NavBarProps) {
  return (
    <NavBarContainer>
      <ButtonComponent title='Inserir gastos' buttonIcon={<IoMdAdd color='#FFF' size={25} />} onClick={props.onClickAdd} />
    </NavBarContainer>
  )
}

export default NavBarComponent;
