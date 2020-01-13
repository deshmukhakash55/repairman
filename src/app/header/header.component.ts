import { Component, OnInit, Input, Output, EventEmitter, AfterViewChecked } from '@angular/core';
import { Address } from '../services/commontypes';
import { AddressService } from '../services/address.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewChecked {

  @Input('title') public title: string;
  @Output() backButtonClick = new EventEmitter<string>();
  @Input('shouldShowBackButton')public shouldShowBackButton: boolean;
  public addresses: Address[];
  public selectedAddress: Address;
  public backUrl: string;

  constructor(
    private addressService: AddressService
    ) {}

  public ngOnInit(): void {

    this.backUrl = this.loadBackUrl();

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

  public ngAfterViewChecked(): void {
    this.addressService.getSelectedAddress().subscribe( (address: Address) => {
      this.selectedAddress = address;
      if (!this.selectedAddress) {
        this.selectedAddress = this.addresses[0];
      }
    });
  }

  public moveBack(): void {
    this.backButtonClick.emit('true');
  }

  private loadBackUrl(): string {
    if (this.title === 'Home') {
      return 'tabs/home';
    }
    return 'tabs/repairs';
  }

  public changeAddress(event: any): void {
    const newAddress = event.target.value;
    this.addressService.setSelectedAddress(newAddress);
  }

}
