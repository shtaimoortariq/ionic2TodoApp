import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

import {SignupPage} from '../signup/signup';
import {Dashboard} from '../dashboard/dashboard';


@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {

  userName: string;
  password: string;


  constructor(public navCtrl: NavController, public af: AngularFire, public toastCtrl: ToastController) {
    this.userName = "", this.password = "";
  }

  goToSignUpPage() {
    this.navCtrl.push(SignupPage);
  }

  login() {

    this.af.auth.login({ email: this.userName, password: this.password },
      { provider: AuthProviders.Password, method: AuthMethods.Password })

      .then((data) => {
        let toast = this.toastCtrl.create({
          message: 'User login successfully',
          duration: 3000,
          position: 'top'
        });

        toast.present().then((done) => {
          this.navCtrl.push(Dashboard);
        });

        console.log("data", data);
      })

      .catch((err) => {

        let toast = this.toastCtrl.create({
          message: 'Wrong email or password',
          duration: 3000,
          position: 'top'
        });

        toast.present();

        console.log("error", err)
      });

  }
}
