import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AuthActions, IAuthAction } from 'ionic-appauth';
import { AuthService } from '../auth/auth.service';
import { IUserInfo } from '../auth/user-info.model';
import { Repairman } from '../home/hometypes';
import { WebIntent } from '@ionic-native/web-intent/ngx';
import { RepairmanService } from '../services/repairman.service';
import { RepairsService } from '../services/repairs.service';
import * as uuid from 'uuid';
import { resolve } from 'url';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  public userInfo: IUserInfo;
  public  action: IAuthAction;
  public title: string;
  public authenticated: boolean;
  public repairmen: Repairman[];
  public selectedRepairman: Repairman;
  public shouldShowBackButton: boolean;
  private repairCalled: boolean;

  constructor(
    private navCtrl: NavController, private authService: AuthService,
    private repairmanService: RepairmanService, private webIntent: WebIntent,
    private alertController: AlertController, private repairsService: RepairsService
    ) {
      this.title = 'Payment';
      this.shouldShowBackButton = true;

      this.repairmanService.getSelectedRepairman().subscribe( (repairman: Repairman) => {
        this.selectedRepairman = repairman;
        console.log(this.selectedRepairman);
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

  public backButtonClicked(): void {
    if (this.repairCalled) {
      this.navCtrl.navigateRoot('/track');
    }
    this.navCtrl.navigateRoot('/tabs/home');
  }

  public payViaUpi(): void {
    const transactionId = uuid.v4();
    const options = {
      action: this.webIntent.ACTION_VIEW,
      url: `upi://pay?pa={}&pn=Repairman&tid=${transactionId}&am={}&cur=INR&tn=${this.selectedRepairman.id}-${Date.now}`
    };

    this.webIntent.startActivity(options).then( () => {
      this.addRepairs();
    },
    () => {
      console.log('Error');
    });
  }

  public async payViaCash(): Promise<any> {
    const alert = await this.alertController.create({
      header: 'Pay Via Cash ',
      message: '<br>Please pay cash to repairman in person',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }, {
          text: 'Okay',
          handler: () => {
            this.addRepairs();
          }
        }
      ]
    });

    await alert.present();
  }

  private addRepairs(): void {
    new Promise( (resolve: any, reject: any) => {
      this.repairsService.addRepair(this.selectedRepairman);
      resolve();
    }).then( () => {
      this.repairsService.selectRepairWithRepairman(this.selectedRepairman);
      this.repairmanService.removeRepairman(this.selectedRepairman);
      this.repairCalled = true;
      this.navCtrl.navigateRoot('/track');
    });
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
