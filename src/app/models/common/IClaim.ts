

export interface IClaim {
    SponsorRUT: string,
    OcurrenceDate: string,
    Description: string,
    ProcessType: string,
    Policy: string,
    Coverage: string,
    ClaimType: string,
    UserRUT: string,
    Core: string
}

export interface InsurePerson {
    Type: string,
    RUT: string,
    DV: string,
    Name: string,
    LastName: string,
    Region: string,
    Commune: string,
    City: string,
    Address: string,
    CellPhone: string,
    Phone: string,
    Email: string
}

export interface IClaimPerson {
    Type: string,
    RUT: string,
    DV: string,
    Name: string,
    LastName: string,
    Region: string,
    Commune: string,
    City: string,
    Address: string,
    CellPhone: string,
    Phone: string,
    Email: string
}

