export enum BagProcessStatus {
    PoliceIntake = 0,
    Transport = 1,
    InStorage = 2,
    Released = 3
}

export const BagProcessStatusLabels: Record<BagProcessStatus, string> = {
    [BagProcessStatus.PoliceIntake]: 'קליטה משטרה',
    [BagProcessStatus.Transport]: 'קליטה משינוע',
    [BagProcessStatus.InStorage]: 'מאוחסן בתר"ח',
    [BagProcessStatus.Released]: 'שוחרר מתר"ח'
};
