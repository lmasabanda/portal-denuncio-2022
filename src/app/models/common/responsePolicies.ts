import { Policies } from './policies';

export interface ResponsePolicies {
    ListPolicies: Policies[];
    Code: number;
    Message: string;
}