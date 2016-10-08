import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire, AuthProviders, AuthMethods  } from 'angularfire2';



@Component({
  selector: 'signup-page',
  templateUrl: 'signup.html'
})
export class SignupPage {
  
  userName: string;
  password: string;


  constructor(public navCtrl: NavController, public af: AngularFire) {
      this.af.auth.subscribe(auth => console.log(auth));
  }


  signup() {
    this.af.auth.createUser({email: this.userName, password: this.password}).then((data) => {
        console.log("data", data);
      })
      .catch((err) => {
        console.log("error", err)
      });
  }
}
