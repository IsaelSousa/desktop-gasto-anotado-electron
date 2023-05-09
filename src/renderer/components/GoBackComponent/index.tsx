import { GoBackContainer } from './styles';
import ButtonComponent from '../ButtonComponent';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

type NavBarProps = {
  onClickAdd?: any;
}

function GoBackComponent (props: NavBarProps) {
  return (
    <GoBackContainer>
      <ButtonComponent title='Gráficos' buttonIcon={<IoArrowBackCircleOutline color='#FFF' size={25} />} colorItem='#3eb331' onClick={props.onClickAdd} />
    </GoBackContainer>
  )
}

export default GoBackComponent;
