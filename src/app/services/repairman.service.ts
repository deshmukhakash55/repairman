import { Repairman } from './../home/hometypes';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepairmanService {

  private repairmen: Repairman[];
  private selectedRepairman: Repairman;
  private selectedRepairmanFromHome: Repairman;

  constructor() {
    this.repairmen = [
      {
        id: 'john_elton',
        name: 'John Elton',
        ability: 'Carpenter',
        stars: 4.7,
        mobile: '9689750481',
        charges: 50,
        status: '5:00 PM',
        sortPriority: 2
      },
      {
        id: 'carl_stevens',
        name: 'Carl Stevens',
        ability: 'Mechanic',
        stars: 4.9,
        mobile: '9689750481',
        charges: 100,
        status: 'available',
        sortPriority: 1.5
      },
      {
        id: 'neil_clark',
        name: 'Neil Clark',
        ability: 'Plumber',
        stars: 4.0,
        mobile: '9689750481',
        charges: 40,
        status: 'available',
        sortPriority: 2.5
      },
      {
        id: 'elizabeth_johnson',
        name: 'Elizabeth Johnson',
        ability: 'Baby Sitter',
        stars: 4.9,
        mobile: '9689750481',
        charges: 150,
        status: 'available',
        sortPriority: 3
      },
      {
        id: 'john_mark',
        name: 'John Mark',
        ability: 'Computer Repairer',
        stars: 4.8,
        mobile: '9689750481',
        charges: 70,
        status: '6:00 AM',
        sortPriority: 1
      }
    ];
  }

  public getRepairmen(): Observable<Repairman[]> {
    return of(this.repairmen);
  }

  public removeRepairman(repairman: Repairman): void {
    this.repairmen = this.repairmen.filter( (arepairman: Repairman) => arepairman.id !== repairman.id);
  }

  public selectRepairman(repairman: Repairman): void{
    this.selectedRepairman = repairman;
  }

  public getSelectedRepairman(): Observable<Repairman> {
    return of(this.selectedRepairman);
  }

  public selectselectedRepairmanFromHome(repairman: Repairman): void{
    this.selectedRepairmanFromHome = repairman;
  }

  public getselectedRepairmanFromHome(): Observable<Repairman> {
    return of(this.selectedRepairmanFromHome);
  }

}
