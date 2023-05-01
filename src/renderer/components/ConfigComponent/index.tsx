import { ConfigContainer } from './styles';
import ButtonComponent from '../ButtonComponent';
import { BsFillGearFill } from 'react-icons/bs';

type NavBarProps = {
  onClickAdd?: any;
}

function ConfigComponent (props: NavBarProps) {
  return (
    <ConfigContainer>
      <ButtonComponent title='Gráficos' buttonIcon={<BsFillGearFill color='#FFF' size={25} />} onClick={props.onClickAdd} />
    </ConfigContainer>
  )
}

export default ConfigComponent;
