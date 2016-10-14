import { Component } from '@angular/core';
import { NavController, LoadingController  } from 'ionic-angular';
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
  tempFirebaseData: any;


  constructor(public navCtrl: NavController, public af: AngularFire, public loadingCtrl: LoadingController) {
    this.userName = "", this.password = "";
  }

  goToSignUpPage() {
    this.navCtrl.push(SignupPage);
  }

  loginFirebase() {

    this.tempFirebaseData = this.af.auth.login({ email: this.userName, password: this.password },
      { provider: AuthProviders.Password, method: AuthMethods.Password })

    return new Promise((resolve, reject) => resolve(this.tempFirebaseData));

  }

  loader() {
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loading.present();
    this.loginFirebase().then((res) => { loading.dismiss(); this.navCtrl.push(Dashboard);}, (err) => { console.log(err)})
  }

}
