import { Repairman } from './../home/hometypes';

export interface Repair {
    id: string;
    repairman: Repairman;
    status: string;
    paymentMode: string;
    feedback: string;
    starsForService: number;
    customer: string;
    date: Date;
}