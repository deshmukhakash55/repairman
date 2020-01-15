import { AlertController } from '@ionic/angular';
import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthActions, IAuthAction } from 'ionic-appauth';
import { AuthService } from '../auth/auth.service';
import { IUserInfo } from '../auth/user-info.model';
import { Repairman } from '../home/hometypes';
import { RepairmanService } from '../services/repairman.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit, AfterViewChecked {
  public userInfo: IUserInfo;
  public  action: IAuthAction;
  public title: string;
  public authenticated: boolean;
  public repairmen: Repairman[];
  public selectedRepairman: Repairman;
  public shouldShowBackButton: boolean;
  public availabilityStatus: string;

  constructor(
    private navCtrl: NavController, private authService: AuthService,
    private alertController: AlertController, private repairmanService: RepairmanService
    ) {
      this.title = 'Details';
      this.shouldShowBackButton = true;

      this.repairmanService.getselectedRepairmanFromHome().subscribe( (repairman: Repairman) => {
        this.selectedRepairman = repairman;
        this.loadAvailabilityStatus();
      });
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

  }

  public ngAfterViewChecked(): void {
    this.repairmanService.getselectedRepairmanFromHome().subscribe( (repairman: Repairman) => {
      this.selectedRepairman = repairman;
    });
  }

  public async presentConfirmCallOption(): Promise<any> {
    const alert = await this.alertController.create({
      header: 'Call ' + this.selectedRepairman.name,
      message: `<br>Charges will Rs.${this.selectedRepairman.charges}/hr (excluding other extra material) <br><br>  ETA: 20-30 min`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }, {
          text: 'Call',
          handler: () => {
            this.payAndCall();
          }
        }
      ]
    });

    await alert.present();
  }

  private payAndCall(): void {
    // TODO Send Data to backend

    this.repairmanService.selectRepairman(this.selectedRepairman);
    this.selectedRepairman = null;
    this.navCtrl.navigateRoot('payment');
  }

  private loadAvailabilityStatus(): void {
    if (this.selectedRepairman.status === 'available') {
      this.availabilityStatus = 'right now';
      return;
    }
    this.availabilityStatus = 'at ' + this.selectedRepairman.status;
  }

  public unselectRepairman(event: any): void {
    this.repairmanService.selectselectedRepairmanFromHome(null);
    this.navCtrl.back();
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
