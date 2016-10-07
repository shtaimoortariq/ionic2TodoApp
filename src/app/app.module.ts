import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { AngularFireModule } from 'angularfire2';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';


export const firebaseConfig = {
  apiKey: "AIzaSyCpy3zin1OWfPyFNL_dUwDFwxuMCumUKqw",
    authDomain: "helloworld-797b6.firebaseapp.com",
    databaseURL: "https://helloworld-797b6.firebaseio.com",
    storageBucket: "helloworld-797b6.appspot.com"
};


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage
  ],
  providers: []
})
export class AppModule {}
