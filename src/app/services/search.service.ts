import { Observable, of } from 'rxjs';
import { Repairman } from './../home/hometypes';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private repairmen: Repairman[];

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

  public searchRepairmen(searchValue: string): Observable<Repairman[]> {
    const searchedRepairmen = this.repairmen.filter(
      (repairman: Repairman) => repairman.name.indexOf(searchValue) !== -1 || repairman.ability.indexOf(searchValue) !== -1);
    return of(searchedRepairmen);
  }
}
