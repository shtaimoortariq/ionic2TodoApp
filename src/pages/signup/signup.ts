import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFire, AuthProviders, AuthMethods  } from 'angularfire2';



@Component({
  selector: 'signup-page',
  templateUrl: 'signup.html'
})
export class SignupPage {

  userName: string;
  password: string;


  constructor(public navCtrl: NavController, public af: AngularFire, public toastCtrl: ToastController) {
    this.af.auth.subscribe(auth => console.log(auth));
  }


  signup() {
    this.af.auth.createUser({ email: this.userName, password: this.password }).then((data) => {

      let toast = this.toastCtrl.create({
        message: 'User was added successfully',
        duration: 3000,
        position: 'top'
      });

      toast.present().then((done) => {
        this.navCtrl.pop()
      });

      console.log("data", data);
    })
      .catch((err) => {

        let toast = this.toastCtrl.create({
          message: 'User not added successfully',
          duration: 3000,
          position: 'top'
        });

        toast.present();

        console.log("error", err)
      });
  }
}
