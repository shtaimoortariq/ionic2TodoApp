import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {AddTodo} from '../addTodo/addTodo';
import {FirebaseListObservable, AngularFire} from 'angularfire2';


@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard.html'

})

export class Dashboard {

    list: FirebaseListObservable<any[]>;
    items: FirebaseListObservable<any[]>;
    authUid: any;
    testCheckboxOpen: any;
    testCheckboxResult: any;
    temp: string[] = [];
    flag: boolean;
    completeData :any;
    day: any;
    month: any;
    year: any;
    date: any;

    constructor(public navCtrl: NavController, public af: AngularFire, public alertCtrl: AlertController) {
        this.af.auth.subscribe((auth) => { this.authUid = auth.uid });
        this.list = this.af.database.list('TodoAppDatabase/users/' + this.authUid );
        this.load();

    }

    load() {

        this.date = new Date();
        this.day = this.date.getDate();
        this.month = this.date.getMonth();
        this.year = this.date.getUTCFullYear();
        this.completeData = this.day.toString() +"-"+ (this.month+1).toString() +"-"+ this.year.toString();  


         this.items = this.af.database.list('TodoAppDatabase/users/' + this.authUid+ '/' +this.completeData, { preserveSnapshot: true });
            this.items
            .subscribe(snapshots => {
                snapshots.forEach(snapshot => {
                    for(var i = 0; i < this.temp.length; ++i ) {
                        if(this.temp[i] == snapshot.val().mytodo) {
                            this.flag = true;
                        }
                    }
                    if(this.flag == true) {
                        this.flag = false;
                    }
                    else {
                        this.temp.push(snapshot.val().mytodo);
                    }
                });
            })
    }

    addNewTodo() {
        console.log("newData", this.list[1]);
        this.navCtrl.push(AddTodo);

    }

    showCheckbox() {
        let alert = this.alertCtrl.create();
        alert.setTitle('Which planets have you visited?');

        for (var i = 0; i < this.temp.length; ++i) {
            alert.addInput({
                type: 'checkbox',
                label: this.temp[i],
                value: i.toString(),
                checked: false
            });
        }

        alert.addButton('Cancel');
        alert.addButton({
            text: 'Okay',
            handler: data => {
                console.log('Checkbox data:', data);
                this.testCheckboxOpen = false;
                this.testCheckboxResult = data;
            }
        });
        alert.present();
    }

}