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
        mobile: '9689750481'
      },
      {
        id: 'carl_stevens',
        name: 'Carl Stevens',
        ability: 'Mechanic',
        stars: 4.9,
        mobile: '9689750481'
      },
      {
        id: 'neil_clark',
        name: 'Neil Clark',
        ability: 'Plumber',
        stars: 4.0,
        mobile: '9689750481'
      },
      {
        id: 'elizabeth_johnson',
        name: 'Elizabeth Johnson',
        ability: 'Baby Sitter',
        stars: 4.9,
        mobile: '9689750481'
      },
      {
        id: 'john_mark',
        name: 'John Mark',
        ability: 'Mechanic',
        stars: 4.8,
        mobile: '9689750481'
      }
    ];
  }

  public getRepairmen(): Observable<Repairman[]> {
    return of(this.repairmen);
  }

  public removeRepairman(repairman: Repairman): void {
    this.repairmen.splice(this.repairmen.indexOf(repairman), 1);
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
