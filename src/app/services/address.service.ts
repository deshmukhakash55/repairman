import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { Address } from './commontypes';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private addresses: Address[];
  private selectedAddress: Address;

  constructor() { 
    this.addresses = [
      {
        name: 'Home',
        lat: 12,
        lng: 34
      },
      {
        name: 'Work',
        lat: 87,
        lng: 23
      },
      {
        name: 'Flat',
        lat: 36,
        lng: 86
      }
    ];
    this.selectedAddress = this.addresses[0];
  }

  public getAddresses(): Observable<Address[]> {
    return of(this.addresses);
  }

  public getSelectedAddress(): Observable<Address> {
    return of(this.selectedAddress);
  }

  public setSelectedAddress(addressName: string): void {
    this.selectedAddress = this.addresses.find( (address: Address) => address.name === addressName);
  }

}
