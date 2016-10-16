import { Component } from '@angular/core';
import { NavController, ToastController, LoadingController } from 'ionic-angular';
import { AngularFire  } from 'angularfire2';

@Component({
  selector: 'signup-page',
  templateUrl: 'signup.html'
})
export class SignupPage {

  userName: string;
  password: string;

  constructor(public navCtrl: NavController, public af: AngularFire, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
    this.af.auth.subscribe(auth => console.log(auth));
  }


  signup() {
    let loading = this.loadingCtrl.create({
      content: "Please wait...",
    });
    loading.present();

    this.af.auth.createUser({ email: this.userName, password: this.password }).then((data) => {
      loading.dismiss();
      let toast = this.toastCtrl.create({
        message: 'User was added successfully',
        duration: 3000,
        position: 'top'
      });

      toast.present().then((done) => {
        this.navCtrl.pop();
      });
      console.log("data", data);

    })
      .catch((err) => {
        loading.dismiss();
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
