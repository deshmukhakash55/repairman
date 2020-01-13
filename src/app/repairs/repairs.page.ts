import { Address } from './../services/commontypes';
import { RepairsService } from './../services/repairs.service';
import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { IUserInfo } from '../auth/user-info.model';
import { AuthActions, IAuthAction } from 'ionic-appauth';
import { Repair } from './repairtypes';

@Component({
  selector: 'app-repairs',
  templateUrl: './repairs.page.html',
  styleUrls: ['./repairs.page.scss'],
})
export class RepairsPage implements OnInit {

  public userInfo: IUserInfo;
  public  action: IAuthAction;
  public authenticated: boolean;
  public repairs: Repair[];
  public selectedRepair: Repair;
  public title: string;
  public shouldShowBackButton: boolean;

  constructor(
    private navCtrl: NavController, private authService: AuthService,
    private repairsService: RepairsService
    ) {
      this.title = 'Repairs';
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


    this.repairsService.getRepairs().subscribe( (repairs: Repair[]) => {
      this.repairs = repairs;
    });

    if (this.repairs) {
      this.repairs.sort ( (firstRepair: Repair, secondRepair: Repair) => {
        if (firstRepair.status === 'active' && secondRepair.status !== 'active') {
          return -1;
        }
        if (firstRepair.status !== 'active' && secondRepair.status === 'active') {
          return 1;
        }
        if (firstRepair.status === 'active' && secondRepair.status === 'active') {
          if (firstRepair.date > secondRepair.date) {
            return -1;
          }
          if (firstRepair.date < secondRepair.date) {
            return 1;
          }
        }
        return 0;
      });
    }

  }

  public selectRepair(repair: Repair): void {
    this.selectedRepair = repair;
    this.repairsService.selectRepair(repair);
    this.navCtrl.navigateRoot('/track');
  }

  public backToMyRepairs(): void {
    this.selectedRepair = null;
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
