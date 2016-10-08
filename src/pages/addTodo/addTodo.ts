import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';


@Component({
    selector: 'add-todo',
    templateUrl: 'addTodo.html'

})

export class AddTodo {

    constructor(public navCtrl: NavController) {
        console.log("addTodo");
        
    }


}