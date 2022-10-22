import { Employee } from "./employee";

export interface Response {
    employee: Employee;
    id: string;
    name: string;
    createdAt: string;
    avatar: string;
}