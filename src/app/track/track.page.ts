import { RepairsService } from './../services/repairs.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { IUserInfo } from '../auth/user-info.model';
import { AuthActions, IAuthAction } from 'ionic-appauth';
import { Repairman } from '../home/hometypes';
import { RepairmanService } from '../services/repairman.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Repair } from '../repairs/repairtypes';
import { CallNumber } from '@ionic-native/call-number/ngx';

declare var google: any;

@Component({
  selector: 'app-track',
  templateUrl: './track.page.html',
  styleUrls: ['./track.page.scss'],
})
export class TrackPage implements OnInit, AfterViewInit {

  public userInfo: IUserInfo;
  public  action: IAuthAction;
  public authenticated: boolean;
  public selectedRepairman: Repairman;
  private markers = [];
  private mapElement: any;
  private map: any;
  @ViewChild('map', {static: false}) mapReference: ElementRef;
  public headerTitle: string;

  constructor(
    private navCtrl: NavController, private authService: AuthService,
    private repairmanService: RepairmanService, private platform: Platform,
    private geolocation: Geolocation, private elementRef: ElementRef, private repairsService: RepairsService,
    private callNumber: CallNumber
    ) {
  }

  private initMap(): void {
    this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).then((resp) => {
      const mylocation = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      this.mapElement = this.mapReference.nativeElement;
      this.map = new google.maps.Map(this.mapElement, {
        zoom: 15,
        center: mylocation
      });
    });
    const watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      this.deleteMarkers();
      const updatelocation = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
      const image = 'assets/img/blue_bike.png';
      this.addMarker(updatelocation, image);
      this.setMapOnAll(this.map);
    });
  }

  private addMarker(location: any, image: string): void {
    const marker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: image
    });
    this.markers.push(marker);
  }

  private setMapOnAll(map: any): void {
    for (const marker of this.markers) {
      marker.setMap(map);
    }
  }

  private clearMarkers(): void {
    this.setMapOnAll(null);
  }

  private deleteMarkers(): void {
    this.clearMarkers();
    this.markers = [];
  }

  public ngOnInit(): void {
    this.headerTitle = 'Track';
    this.authService.authObservable.subscribe((action) => {
      this.action = action;
      if (this.isAuthenticated(action)) {
        this.authenticated = true;
      } else {
        this.authenticated = false;
        this.navCtrl.navigateRoot('login');
      }
    });

    this.repairsService.getSelectedRepair().subscribe( (repair: Repair) => {
      this.selectedRepairman = repair.repairman;
    });

  }

  public ngAfterViewInit(): void {
    this.platform.ready().then(() => {
      this.initMap();
    });
  }

  public callRepairman(): void {
    this.callNumber.callNumber(this.selectedRepairman.mobile, true);
  }

  public backToHome(): void {
    this.selectedRepairman = null;
    this.navCtrl.navigateRoot('tabs/home');
  }

  private isAuthenticated(action: IAuthAction): boolean {
    return action.action === AuthActions.SignInSuccess || action.action === AuthActions.AutoSignInSuccess;
  }

  public signOut(): void {
    this.authService.signOut();
  }

  public signIn(): void {
    this.authService.signIn().catch(error => console.error(`Sign in error: ${error}`));
  }

  public async getUserInfo(): Promise<void> {
    this.userInfo = await this.authService.getUserInfo<IUserInfo>();
  }

}
