import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AddTodo} from '../addTodo/addTodo';
import {FirebaseListObservable, AngularFire} from 'angularfire2';


@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.html'

})

export class Dashboard {

    list: FirebaseListObservable<any[]>;
    authUid: any;
    constructor(public navCtrl: NavController, public af:AngularFire ) {
        this.af.auth.subscribe((auth) => { this.authUid = auth.uid });
        this.list = this.af.database.list('TodoAppDatabase/users/' +this.authUid);
    }

    addNewTodo() {
        this.navCtrl.push(AddTodo);
        console.log(this.list);
    }



}