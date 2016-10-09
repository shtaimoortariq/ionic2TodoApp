import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
    selector: 'add-todo',
    templateUrl: 'addTodo.html'

})

export class AddTodo {

    todoText: string;
    authUid: any;
    date: any;
    list: FirebaseListObservable<any[]>;

    constructor(public navCtrl: NavController, public af: AngularFire) {
        this.date = new Date();
        this.af.auth.subscribe((auth) => { this.authUid = auth.uid });
        this.list = af.database.list('TodoAppDatabase/users/' + this.authUid);
    }

    create() {
        this.af.auth.subscribe((auth) => { this.authUid = auth.uid });
        this.list.push({ mytodo: this.todoText }).then((data) => {
            this.navCtrl.pop();
        });
    }

}