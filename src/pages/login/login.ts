import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire, AuthProviders, AuthMethods, FirebaseAuthState  } from 'angularfire2';

import {SignupPage} from '../signup/signup';
@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class LoginPage {

  userName: string;
  password: string;


  constructor(public navCtrl: NavController, public af: AngularFire) {
    this.userName = "", this.password = "";
  }

  goToSignUpPage() {
    this.navCtrl.push(SignupPage);
  }

  login() {

    this.af.auth.login({ email: this.userName, password: this.password },


      { provider: AuthProviders.Password, method: AuthMethods.Password }).then((data) => {
        console.log("data", data);
      })
      .catch((err) => {
        console.log("error", err)
      });

  }
}
