
import {InsurePerson, IClaimPerson} from './IClaim';

export interface RequestClaim{
    SponsorRUT: string;
    OcurrenceDate: string;
    Description: string;
    ProcessType: string;
    Policy: string;
    Coverage: string;
    ClaimType: string;
    UserRUT: string;
    Core: string;
    InsurePerson: InsurePerson;
    ClaimPerson:IClaimPerson;
}