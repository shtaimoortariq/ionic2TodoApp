import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';


export const firebaseConfig = {
  apiKey: "AIzaSyCpy3zin1OWfPyFNL_dUwDFwxuMCumUKqw",
    authDomain: "helloworld-797b6.firebaseapp.com",
    databaseURL: "https://helloworld-797b6.firebaseio.com",
    storageBucket: "helloworld-797b6.appspot.com"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password,
}

@NgModule({
  declarations: [
    MyApp,

    LoginPage,
    SignupPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  
    LoginPage,
    SignupPage
  ],
  providers: []
})
export class AppModule {}
