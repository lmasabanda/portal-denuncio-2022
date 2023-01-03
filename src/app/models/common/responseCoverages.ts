import { Coverages } from './coverages';

export interface ResponseCoverages {
    ListCoverages: Coverages[];
    Code: number;
    Message: string;
}