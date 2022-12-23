import { Region } from './region';

export interface ResponseRegions {
    ListRegions: Region[];
    Code: number;
    Message: string;
}