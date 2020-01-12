import { RepairmanService } from './../services/repairman.service';
import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Address } from '../services/commontypes';
import { AddressService } from '../services/address.service';
import { Repairman } from '../home/hometypes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnChanges {

  public title: string;
  public isRepairmanSelected: boolean;
  public addresses: Address[];
  public selectedAddress: Address;
  public showInproperAddressPopup: boolean;
  public shouldShowBackButton: boolean;
  public backUrl: string;

  constructor(
    private addressService: AddressService, private repairmanService: RepairmanService,
    private router: Router
    ) {}

  public ngOnInit() {
    this.title = this.getProperTitle(this.router.url);
    this.repairmanService.getselectedRepairmanFromHome().subscribe( (repairman: Repairman) => {
      if (repairman) {
        this.isRepairmanSelected = true;
        return;
      }
      this.isRepairmanSelected = false;
    });


    this.addressService.getAddresses().subscribe( (addresses: Address[]) => {
      this.addresses = addresses;
    });

    this.addressService.getSelectedAddress().subscribe( (address: Address) => {
      this.selectedAddress = address;
      if (!this.selectedAddress) {
        this.selectedAddress = this.addresses[0];
      }
    });

  }

  public ngOnChanges(changes: ng)

  private getProperTitle(url: string): string {
    //Should be changed
    if (url.indexOf('home') !== -1) {
      return 'Home';
    }
    if (url.indexOf('repairs') !== -1) {
      return 'My Repairs';
    }
    if (url.indexOf('account') !== -1) {
      return 'Account';
    }
    if (url.indexOf('search') !== -1) {
      return 'Search';
    }
    if (url.indexOf('track') !== -1) {
      return 'Track';
    }
    return '';
  }

  public changeAddress(event: any): void {
    const newAddress = event.target.value;
    this.addressService.setSelectedAddress(newAddress);
  }

}
