import { Component } from '@angular/core';
import { AuthActions, IAuthAction } from 'ionic-appauth';
import { AuthService } from '../auth/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  public nextPage: string;

  constructor(private authService: AuthService, private navCtrl: NavController) {
    this.authService.authObservable.subscribe((action) => {
      if (action.action === AuthActions.SignInSuccess || action.action === AuthActions.AutoSignInSuccess) {
        this.nextPage = 'Dashboard';
        this.navCtrl.navigateRoot('tabs');
      } else {
        this.nextPage = 'Sign-In Page';
        this.authService.signIn();
      }
    });
  }
}
