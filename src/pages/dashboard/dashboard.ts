import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AddTodo} from '../addTodo/addTodo';

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.html'

})

export class Dashboard {

    constructor(public navCtrl: NavController) {
        console.log("Dashboard");
        
    }

    addNewTodo() {
        
        this.navCtrl.push(AddTodo);

    }
}