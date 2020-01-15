import { Repairman } from './../home/hometypes';
import { Injectable } from '@angular/core';
import { Repair } from '../repairs/repairtypes';
import { Observable, of } from 'rxjs';
import * as uuid from 'uuid';
import { PaymentPageModule } from '../payment/payment.module';

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

  public addRepair(repairman: Repairman, selectedPaymentMode: string, customerId: string): void {
    const repairId = uuid.v4();
    const repair: Repair = {
      id: repairId,
      repairman: {...repairman},
      status: 'active',
      paymentMode: selectedPaymentMode,
      feedback: '',
      starsForService: -1,
      customer: customerId,
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
