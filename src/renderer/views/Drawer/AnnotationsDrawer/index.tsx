import { Drawer } from '@mui/material';
import { useEffect, useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { AnnotationsLabelComponent } from '../../../components/AnnotationsLabelComponent';
import { useProvider } from '../../../Context/provider';
import { InputLabel, SendAnnotation, Container } from './styles';
import AnnotationsSendButtonComponent from 'renderer/components/AnnotationsSendButtonComponent';
import { Loader } from 'renderer/components/LoaderComponent/styles';
import { toast } from 'react-toastify';

interface AnnotationsProps {
  annotationsID: number;
}


export const AnnotationsDrawer = ({
  annotationsID
}: AnnotationsProps) => {

  const [annotationsAdd, setAnnotationsAdd] = useState<string>("");
  const [load, setLoad] = useState<boolean>(false);

  const { 
    deleteAnnotations, 
    insertAnnotations, 
    dataAnnotations, 
    getAnnotations, 
    toggleAnnotations,
    setToggleAnnotations,
   } = useProvider();

  useEffect(() => {
    if (toggleAnnotations) {
      getAnnotations(annotationsID);
    } else {
      setToggleAnnotations(false);
    }
  }, [toggleAnnotations]);

  return (
    <Drawer
      anchor={'right'}
      open={toggleAnnotations}
      onClose={() => setToggleAnnotations(false)}
      style={{ padding: 50, maxWidth: 400, width: 400 }}
    >
      <Container>

        <label style={{ 
          fontWeight: 'bold', 
          marginTop: 20,
          marginBottom: 5,
          display: 'flex',
          justifyContent: 'center',
          color: 'white'
           }}>Anotações</label>

        <div style={{ 
          margin: '10px',
          overflowY: 'auto',
          overflowX: 'hidden',
         }} >
          <style>
              {`
            /* Hide scrollbar */
            ::-webkit-scrollbar {
              display: none;
            }
          `}
          </style>
          {
            !load ? dataAnnotations.length > 0 ? dataAnnotations.map((x, i) => (
              <div key={i}>
                <AnnotationsLabelComponent onClick={() => {
                  setTimeout(() => {
                    getAnnotations(x.idRegister);
                  }, 500);
                  deleteAnnotations(x.id)
                }}
                text={x.annotations} 
                date={x.createdAt}
                />
              </div>
            )) :
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }} >
              <p>Vázio...</p>
            </div> :
            <Loader />
          }
        </div>
        <SendAnnotation>
          <InputLabel value={annotationsAdd} className='title' style={{
            width: 400,
            height: 40,
            textAlign: 'center',
            fontSize: 18,
            marginLeft: 15,
            marginRight: 20,
            marginBottom: 5,
            background: 'white'
          }} 
          min={1}
          placeholder='Digite aqui...' 
          onChange={e => setAnnotationsAdd(e.target.value)}
          />

          <AnnotationsSendButtonComponent onClick={() => {
            if (annotationsAdd) {
              insertAnnotations(annotationsID, annotationsAdd);
              setTimeout(() => {
                setLoad(true);
                getAnnotations(annotationsID);
                setLoad(false);
              }, 500);
              setAnnotationsAdd("");
            } else {
              toast.warning('Campo vázio, digite algo.')
            }
          }} buttonIcon={<IoIosAddCircle color='#FFF' size={25} />}
          title="Adicionar" />
        </SendAnnotation>
      </Container>
    </Drawer>
  )
}