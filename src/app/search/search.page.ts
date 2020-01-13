import { SearchService } from '../services/search.service';
import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { IUserInfo } from '../auth/user-info.model';
import { AuthActions, IAuthAction } from 'ionic-appauth';
import { Repairman } from '../home/hometypes';
import { AlertController } from '@ionic/angular';
import { RepairsService } from '../services/repairs.service';
import { RepairmanService } from '../services/repairman.service';

@Component({
  selector: 'app-search',
  templateUrl: 'search.page.html',
  styleUrls: ['search.page.scss']
})
export class SearchPage implements OnInit {
  public userInfo: IUserInfo;
  public  action: IAuthAction;
  public authenticated: boolean;
  public searchList: Repairman[];
  public selectedRepairman: Repairman;
  public title: string;

  constructor(private navCtrl: NavController, private authService: AuthService,
              private alertController: AlertController, private repairsService: RepairsService,
              private repairmanService: RepairmanService, private searchService: SearchService,
              private elementRef: ElementRef) { 
                this.title = 'Search';
              }

  public refreshSearchList(event: any): void {
    this.selectedRepairman = null;
    const searchedValue = '' + event.target.value;
    if (searchedValue === '') {
      this.searchList = [];
      return;
    }
    this.searchService.searchRepairmen(searchedValue).subscribe( (searchList: Repairman[]) => {
      this.searchList = searchList;
    });
  }

  public ngOnInit(): void {
    this.elementRef.nativeElement.querySelector('ion-searchbar')
      .addEventListener('ionInput', this.refreshSearchList.bind(this));
    this.authService.authObservable.subscribe((action) => {
      this.action = action;
      if (this.isAuthenticated(action)) {
        this.authenticated = true;
      } else {
        this.authenticated = false;
        this.navCtrl.navigateRoot('login');
      }
    });
  }

  public async presentConfirmCallOption() {
    const alert = await this.alertController.create({
      header: 'Call ' + this.selectedRepairman.name,
      message: '<br>Charges will Rs.50/hr (excluding other extra material) <br><br>  ETA: 20-30 min',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.callRepairman();
          }
        }
      ]
    });

    await alert.present();
  }

  private callRepairman(): void {
    // TODO Send Data to backend

    this.repairsService.addRepair(this.selectedRepairman);
    this.repairmanService.removeRepairman(this.selectedRepairman);
    this.selectedRepairman = null;
    this.navCtrl.navigateRoot('tabs/repairs');

  }

  public selectRepairman(repairman: Repairman): void {
    this.selectedRepairman = repairman;
  }

  public backToSearch(): void {
    this.selectedRepairman = null;
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
