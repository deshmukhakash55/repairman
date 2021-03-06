import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthActions, IAuthAction } from 'ionic-appauth';
import { AuthService } from '../auth/auth.service';
import { IUserInfo } from '../auth/user-info.model';
import { Repairman } from './hometypes';
import { FeedbackService } from '../services/feedback.service';
import { RepairmanService } from '../services/repairman.service';
import { Feedback } from '../services/commontypes';

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
  public isFeedbackPending: boolean;
  public pendingFeedback: Feedback;
  private starFeedback: number;
  public textFeedback: string;
  public sendFeedbackDisabled: boolean;
  public shouldShowAddresses: boolean;

  constructor(
    private navCtrl: NavController, private authService: AuthService,
    private repairmanService: RepairmanService, private feedbackService: FeedbackService
    ) {
      this.title = 'Home';
      this.shouldShowBackButton = false;
      this.repairmanService.getselectedRepairmanFromHome().subscribe( (repairman: Repairman) => {
        if (repairman) {
          this.navCtrl.navigateRoot('/details');
        }
      });
      this.isFeedbackPending = false;
      this.sendFeedbackDisabled = true;
      this.feedbackService.getPendingFeedback().subscribe( (pendingFeedbacks: Feedback[]) => {
        this.pendingFeedback = pendingFeedbacks[0];
        this.starFeedback = 0;
        this.title = 'Feedback for ' + this.pendingFeedback.repairmanName;
        this.isFeedbackPending = true;
        this.shouldShowAddresses = false;
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

  public sendFeedback(): void {
    const feedback = {
      repairId: this.pendingFeedback.repairId,
      repairmanName: this.pendingFeedback.repairmanName,
      stars: this.starFeedback,
      feedback: this.textFeedback,
      date: new Date()
    };
    this.pendingFeedback = null;
    this.feedbackService.setPendingFeedback(feedback);
    this.isFeedbackPending = false;
    this.title = 'Home';
    this.shouldShowAddresses = true;
  }

  public starsUpdated(stars: number): void {
    this.starFeedback = stars;
    if (this.starFeedback) {
      this.sendFeedbackDisabled = false;
    }
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
