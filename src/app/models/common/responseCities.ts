import { City } from './city';

export interface ResponseCities {
    ListCities: City[];
    Code: number;
    Message: string;
}