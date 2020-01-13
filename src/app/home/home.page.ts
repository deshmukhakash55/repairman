import { AlertController } from '@ionic/angular';
import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthActions, IAuthAction } from 'ionic-appauth';
import { AuthService } from '../auth/auth.service';
import { IUserInfo } from '../auth/user-info.model';
import { Repairman } from './hometypes';
import { RepairsService } from '../services/repairs.service';
import { RepairmanService } from '../services/repairman.service';
import { Repair } from '../repairs/repairtypes';

declare var google: any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage implements OnInit, AfterViewChecked {
  public userInfo: IUserInfo;
  public  action: IAuthAction;
  public title: string;
  public authenticated: boolean;
  public repairmen: Repairman[];
  public selectedRepairman: Repairman;
  public shouldShowBackButton: boolean;

  constructor(
    private navCtrl: NavController, private authService: AuthService,
    private alertController: AlertController, private repairsService: RepairsService,
    private repairmanService: RepairmanService
    ) {
      this.title = 'Home';
  }

  public ngOnInit(): void {
    this.authService.authObservable.subscribe((action) => {
      this.action = action;
      if (this.isAuthenticated(action)) {
        this.authenticated = true;
      } else {
        this.authenticated = false;
        this.navCtrl.navigateRoot('login');
      }
    });

    this.repairmanService.getRepairmen().subscribe( (repairmen: Repairman[]) => {
      this.repairmen = repairmen;
    });

  }

  public ngAfterViewChecked(): void {
    // this.repairsService.getRepairs().subscribe( (repairs: Repair[]) => {
    //   if (repairs) {
    //     const calledRepairmenIds = repairs.map( (repair: Repair) => repair.repairman.id);
    //     const repairmen = this.repairmen;
    //     this.repairmen = repairmen.filter( (repairman: Repairman) => calledRepairmenIds.indexOf(repairman.id) === -1 );
    //   }
    // });
    this.repairmanService.getRepairmen().subscribe( (repairmen: Repairman[]) => {
      this.repairmen = repairmen;
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

    this.addRepairs().then( () => {
      this.repairmanService.removeRepairman(this.selectedRepairman);
      this.selectedRepairman = null;
      this.navCtrl.navigateRoot('tabs/repairs');
    })
    .catch( () => {
      console.log('Something went wrong');
    });

  }

  public scrollDown(event: any) {
    console.log(event.detail);
    // loadMoreRepairmenFromBackend
  }

  private addRepairs(): Promise<any> {
    return new Promise( (resolve: any, reject: any) => {
      try {
        this.repairsService.addRepair(this.selectedRepairman);
        resolve('Successfully added');
      } catch (exception) {
        reject('Unsuccessful repair addition');
      }
    });
  }

  public selectRepairman(repairman: Repairman): void {
    this.selectedRepairman = repairman;
    this.repairmanService.selectselectedRepairmanFromHome(repairman);
    this.shouldShowBackButton = true;
  }

  public unselectRepairman(event: any): void {
    this.selectedRepairman = null;
    this.shouldShowBackButton = false;
  }

  public backToHome(): void {
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
