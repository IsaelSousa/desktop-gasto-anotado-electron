import { GraphContainer } from './styles';
import ButtonComponent from '../ButtonComponent';
import { MdImportantDevices } from 'react-icons/md';

type NavBarProps = {
  onClickAdd?: any;
}

function ImportExportJsonComponent (props: NavBarProps) {
  return (
    <GraphContainer>
      <ButtonComponent title='Importar/Exportar' buttonIcon={<MdImportantDevices color='#FFF' size={25} />} colorItem='#3eb331' onClick={props.onClickAdd} />
    </GraphContainer>
  )
}

export default ImportExportJsonComponent;
