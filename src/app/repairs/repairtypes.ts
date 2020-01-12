import { Repairman } from './../home/hometypes';

export interface Repair {
    repairman: Repairman;
    status: string;
    date: Date;
}