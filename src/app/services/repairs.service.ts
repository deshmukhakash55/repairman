import { Repairman } from './../home/hometypes';
import { Injectable } from '@angular/core';
import { Repair } from '../repairs/repairtypes';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepairsService {

  private repairs: Repair[];
  private selectedRepair: Repair;

  constructor() { }

  public getRepairs(): Observable<Repair[]> {
    return of(this.repairs);
  }

  public getSelectedRepair(): Observable<Repair> {
    return of(this.selectedRepair);
  }

  public selectRepair(repair: Repair): void {
    this.selectedRepair = repair;
  }

  public selectRepairWithRepairman(repairman: Repairman): void {
    this.selectedRepair = this.repairs.find( (repair: Repair) => repair.repairman.id === repairman.id);
  }

  public addRepair(repairman: Repairman): void {
    const repair = {
      repairman: {...repairman},
      status: 'active',
      date: new Date()
    };
    if (this.repairs) {
      this.repairs.push(repair);
      this.repairs = this.repairs.reverse();
    } else {
      this.repairs = [ repair ];
    }
  }


}
