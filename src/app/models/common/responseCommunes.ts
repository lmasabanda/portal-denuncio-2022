import { Commune } from './commune';

export interface ResponseCommunes {
    ListCommunes: Commune[];
    Code: number;
    Message: string;
}