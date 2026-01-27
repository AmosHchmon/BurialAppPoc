export enum Affiliation {
    Civilian = 0,
    SecurityForces = 1
}

export const AffiliationLabels: Record<Affiliation, string> = {
    [Affiliation.Civilian]: 'אזרחי',
    [Affiliation.SecurityForces]: 'כוחות ביטחון'
};

export const AffiliationOptions = [
    { label: 'אזרחי', value: Affiliation.Civilian },
    { label: 'כוחות ביטחון', value: Affiliation.SecurityForces }
];
