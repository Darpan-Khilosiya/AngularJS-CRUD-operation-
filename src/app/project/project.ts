export interface Project {
    data: Array<Data>;
}
export class Data {
    id: number;
    title: string;
    description: String;
    groups: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
