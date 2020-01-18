export interface Address {
    name: string;
    lat: number;
    lng: number;
};

export interface Page {
    name: string;
    path: string;
};

export interface Feedback {
    repairId: string;
    repairmanName: string;
    feedback: string;
    stars: number;
    date: Date;
}