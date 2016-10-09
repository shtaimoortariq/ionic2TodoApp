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
    temp :any;
    day: any;
    month: any;
    year: any;

    public event = {
        monthStart: '2016-01-01',
        monthEnd: '2016-01-01'
    }

    constructor(public navCtrl: NavController, public af: AngularFire) {
        this.date = new Date();
        this.day = this.date.getDate();
        this.month = this.date.getMonth();
        this.year = this.date.getUTCFullYear();
        this.temp = this.day.toString() +"-"+ (this.month+1).toString() +"-"+ this.year.toString();  
        
        console.log(this.temp);

        
        this.af.auth.subscribe((auth) => { this.authUid = auth.uid });
        this.list = af.database.list('TodoAppDatabase/users/' + this.authUid + '/' + this.temp);
    }

    create() {
        this.list.push({ mytodo: this.todoText }).then((data) => {
            this.navCtrl.pop();
        });
    }

}