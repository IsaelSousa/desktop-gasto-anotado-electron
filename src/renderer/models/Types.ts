export interface IDataType {
  id: number;
  title: string;
  description: string;
  paidout: number;
  value: string;
  duedate: Date;
}

export interface IAnnotations {
  id: number;
  idRegister: number;
  annotations: string;
}

export interface IDataTypeToEdit {
  id: number | null;
  title: string | undefined;
  description: string | undefined;
  value: string | undefined;
  duedate: string | undefined;
}

export interface EditDrawerProps {
  id: number;
  title: string;
  description: string;
  value: string;
  duedate: string;
}

export interface DialogProps {
  id: number | null;
  show: boolean;
}

export type contextType = {
  alert: boolean;
  data: IDataType[] | undefined;
  dataAnnotations: IAnnotations[];
  toggleEdit: boolean | undefined;
  toggleAnnotations: boolean | undefined;
  toggleInsert: boolean | undefined;
  editDrawer: EditDrawerProps;
  dialogtitleState: DialogProps;
  getDate: () => Promise<void>;
  editDate: (data: IDataTypeToEdit) => Promise<void>;
  insertAnnotations: (idRegister: number, annotations: string) => Promise<void>;
  deleteAnnotations: (id: number) => void;
  getAnnotations: (idNumber: number) => Promise<void>;
  deleteData: (id: number | null) => Promise<void>;
  setDataAnnotations: React.Dispatch<React.SetStateAction<IAnnotations[]>>;
  setToggleEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setToggleAnnotations: React.Dispatch<React.SetStateAction<boolean>>;
  setToggleInsert: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setEditDrawer: React.Dispatch<React.SetStateAction<EditDrawerProps>>;
  setDialog: React.Dispatch<React.SetStateAction<DialogProps>>;
}