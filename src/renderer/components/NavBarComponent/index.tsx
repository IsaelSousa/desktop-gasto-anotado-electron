import { NavBarContainer } from './styles';
import ButtonComponent from '../ButtonComponent';
import { IoMdAdd } from 'react-icons/io';

type NavBarProps = {
  onClickAdd?: any;
}

function NavBarComponent (props: NavBarProps) {
  return (
    <NavBarContainer>
      <ButtonComponent title='Adicionar' buttonIcon={<IoMdAdd color='#FFF' size={25} />} onClick={props.onClickAdd} />
    </NavBarContainer>
  )
}

export default NavBarComponent;
