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
  createdAt: string;
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
  loading: boolean;
  importDrawer: boolean | undefined;
  configDrawer: boolean | undefined;
  alertsDrawer: boolean | undefined;
  getDate: () => Promise<void>;
  editDate: (data: IDataTypeToEdit) => Promise<void>;
  insertAnnotations: (idRegister: number, annotations: string) => Promise<void>;
  deleteAnnotations: (id: number) => void;
  getAnnotations: (idNumber: number) => Promise<void>;
  deleteData: (id: number | null) => Promise<void>;
  setDataAnnotations: React.Dispatch<React.SetStateAction<IAnnotations[]>>;
  setToggleEdit: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setToggleAnnotations: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setToggleInsert: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setEditDrawer: React.Dispatch<React.SetStateAction<EditDrawerProps>>;
  setDialog: React.Dispatch<React.SetStateAction<DialogProps>>;
  setImportDrawer: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setConfigDrawer: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setAlertsDrawer: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}