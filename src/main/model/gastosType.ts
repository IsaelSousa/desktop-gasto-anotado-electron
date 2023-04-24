
export type GastosType = {
    id: number;
    title: string;
    description: string;
    paidout: number;
    value: string;
    duedate: string;
}

export type InsertData = {
    title: string;
    description: string;
    value: string;
    dueDate: string;
}

export type ImportFile = {
    title: string;
    description: string;
    paidout: string;
    value: string;
    duedate: string;
}

export type EditData = {
    id: number;
    title: string;
    description: string;
    value: string;
    dueDate: string;
}

export type InsertAnnotations = {
    id: number;
    annotations: string;
}