import { Component, OnInit, Input, Output, EventEmitter, AfterViewChecked, NgZone } from '@angular/core';
import { Address } from '../services/commontypes';
import { AddressService } from '../services/address.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { Platform } from '@ionic/angular';

declare var google;

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
  public userLocation: any;
  public userCity: any;
  public latLngResult: any;
  public userLocationFromLatLng: any;
  public lat: any;
  public lng: any;

  constructor(
    private addressService: AddressService, public zone: NgZone,
    public geolocation: Geolocation, private nativeGeocoder: NativeGeocoder,
    private platform: Platform
    ) {}

  public ngOnInit(): void {

    this.backUrl = this.loadBackUrl();

    this.addressService.getAddresses().subscribe( (addresses: Address[]) => {
      this.addresses = addresses;
      this.addresses.push({
        name: 'Current Location',
        lat: null,
        lng: null
      });
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
    let newAddress = event.target.value;
    if (newAddress === 'Current Location') {
      this.geolocation.getCurrentPosition().then((resp) => {
          this.reverseGeocode(resp.coords.latitude, resp.coords.longitude);
          this.addresses = this.addresses.filter( (address: Address) => address.name !== 'Current Location');
          if (this.userLocationFromLatLng) {
            newAddress = this.userLocationFromLatLng;
          } else {
            newAddress = this.latLngResult;
          }
          if (newAddress === '' || !newAddress) {
            newAddress = 'Current Location';
          }
          this.addresses.push({
            name: newAddress,
            lat: resp.coords.latitude,
            lng: resp.coords.longitude
          });
          this.addressService.setSelectedAddress(newAddress);
      });
    } else {
      this.addressService.setSelectedAddress(newAddress);
    }
  }

  private getUserLatLng(): any {
    this.geolocation.getCurrentPosition().then((resp) => {
        return {lat: resp.coords.latitude, lng: resp.coords.longitude};
    });
  }

  private getUserLocation(): void {
    this.geolocation.getCurrentPosition().then((resp) => {
      if (this.platform.is('cordova')) {
        const options: NativeGeocoderOptions = {
          useLocale: true,
          maxResults: 5
        };
        this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, options)
          .then((result: any) => {
            console.log(result);
            this.userLocation = result[0];
            console.log(this.userLocation);
          })
          .catch((error: any) => console.log(error));
      } else {
        this.getGeoLocation(resp.coords.latitude, resp.coords.longitude);
      }
    });

    const watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      const options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
      };
      if (this.platform.is('cordova')) {
        const options: NativeGeocoderOptions = {
          useLocale: true,
          maxResults: 5
        };
        this.nativeGeocoder.reverseGeocode(data.coords.latitude, data.coords.longitude, options)
          .then((result: NativeGeocoderResult[]) => {
            console.log(result);
            this.userLocation = result[0];
            console.log(this.userLocation);
          })
          .catch((error: any) => console.log(error));
      } else {
        console.log('not cordova');
        this.getGeoLocation(data.coords.latitude, data.coords.longitude);
      }
    });
  }

  private async getGeoLocation(lat: number, lng: number, type?: any) {
    if (navigator.geolocation) {
      const geocoder = await new google.maps.Geocoder();
      const latlng = await new google.maps.LatLng(lat, lng);
      const request = { latLng: latlng };

      await geocoder.geocode(request, (results: any, status: any) => {
        if (status === google.maps.GeocoderStatus.OK) {
          const result = results[0];
          this.zone.run(() => {
            if (result != null) {
              this.userCity = result.formatted_address;
              if (type === 'reverseGeocode') {
                this.latLngResult = result.formatted_address;
              }
            }
          });
        }
      });
    }
  }

  private reverseGeocode(lat: any, lng: any) {
    if (this.platform.is('cordova')) {
      const options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
      };
      this.nativeGeocoder.reverseGeocode(lat, lng, options)
        .then((result: NativeGeocoderResult[]) => this.userLocationFromLatLng = result[0])
        .catch((error: any) => console.log(error));
    } else {
      this.getGeoLocation(lat, lng, 'reverseGeocode');
    }
  }

  private forwardGeocode(address: any) {
    if (this.platform.is('cordova')) {
      const options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
      };
      this.nativeGeocoder.forwardGeocode(address, options)
        .then((result: NativeGeocoderResult[]) => {
          this.zone.run(() => {
            this.lat = result[0].latitude;
            this.lng = result[0].longitude;
          });
        })
        .catch((error: any) => console.log(error));
    } else {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': address }, (results: any, status: any) => {
        if (status === google.maps.GeocoderStatus.OK) {
          this.zone.run(() => {
            this.lat = results[0].geometry.location.lat();
            this.lng = results[0].geometry.location.lng();
          });
        } else {
          alert('Error - ' + results + ' & Status - ' + status);
        }
      });
    }
  }


}
