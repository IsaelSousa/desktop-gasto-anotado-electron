import { Drawer } from "@mui/material";
import { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { AnnotationsLabelComponent } from "../../../components/AnnotationsLabelComponent";
import ButtonComponent from "../../../components/ButtonComponent";
import { useProvider } from "../../../Context/provider";
import { IAnnotations } from "../../../models/Types";
import { InputLabel } from "./styles";

interface AnnotationsProps {
  annotationsID: number;
}

const initialState: IAnnotations = {
  id: 0,
  idRegister: 0,
  annotations: ''
}

export const AnnotationsDrawer = ({
  annotationsID
}: AnnotationsProps) => {

  const [annotationsAdd, setAnnotationsAdd] = useState<string>("");

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
      <label style={{ fontWeight: 'bold', marginTop: 20, marginBottom: 5, width: 400, display: 'flex', justifyContent: 'center' }}>Anotações</label>
      <div style={{ margin: '1rem' }} >
        {
          dataAnnotations.length > 0 ? dataAnnotations.map((x, i) => (
            <div key={i}>
              <AnnotationsLabelComponent onClick={() => {
                setTimeout(() => {
                  getAnnotations(x.idRegister);
                }, 500);
                deleteAnnotations(x.id)
              }} text={x.annotations} />
            </div>
          )) :
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70vh' }} >
            <p>
              Vázio!
            </p>
          </div>
        }
      </div>
      <div style={{
        display: 'flex',
        width: 400,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'fixed',
        bottom: 20
      }} >
        <InputLabel value={annotationsAdd} className='title' style={{
          width: 400,
          height: 40,
          textAlign: 'center',
          fontSize: 18,
          marginLeft: 20,
          marginRight: 20,
          marginBottom: 5
        }} placeholder='Digite aqui...' onChange={e => setAnnotationsAdd(e.target.value)} />
        <ButtonComponent onClick={() => {
          insertAnnotations(annotationsID, annotationsAdd);
          setTimeout(() => {
            getAnnotations(annotationsID);
          }, 500);
          setAnnotationsAdd("");
        }} buttonIcon={<IoIosAddCircle color='#FFF' size={25} />} colorItem='#3eb331' />
      </div>
    </Drawer>
  )
}