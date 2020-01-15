import { AlertController } from '@ionic/angular';
import { Component, OnInit, AfterViewChecked, NgZone } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthActions, IAuthAction } from 'ionic-appauth';
import { AuthService } from '../auth/auth.service';
import { IUserInfo } from '../auth/user-info.model';
import { Repairman } from './hometypes';
import { RepairsService } from '../services/repairs.service';
import { RepairmanService } from '../services/repairman.service';

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
  public availabilityStatus: string;

  constructor(
    private navCtrl: NavController, private authService: AuthService,
    private repairmanService: RepairmanService
    ) {
      this.title = 'Home';
      this.shouldShowBackButton = false;
      this.repairmanService.getselectedRepairmanFromHome().subscribe( (repairman: Repairman) => {
        if (repairman) {
          this.navCtrl.navigateRoot('/details');
        }
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

    this.loadRepairmen();

  }

  public ngAfterViewChecked(): void {
    this.loadRepairmen();
  }

  private loadRepairmen(): void {
    this.repairmanService.getRepairmen().subscribe( (repairmen: Repairman[]) => {
      this.repairmen = repairmen.sort( (A: Repairman, B: Repairman) => {
        if (A.status !== 'available' && B.status === 'available') {
          return 1;
        }
        if (B.status !== 'available' && A.status === 'available') {
          return -1;
        }
        return B.sortPriority - A.sortPriority;
      });
    });
  }

  public scrollDown(event: any) {
    console.log(event.detail);
    // loadMoreRepairmenFromBackend
  }

  public selectRepairman(repairman: Repairman): void {
    this.selectedRepairman = repairman;
    this.repairmanService.selectselectedRepairmanFromHome(repairman);
    this.navCtrl.navigateRoot('/details');
  }

  public unselectRepairman(event: any): void {
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
