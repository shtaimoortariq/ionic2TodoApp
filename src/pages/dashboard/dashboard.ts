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


    key: any[] = [];
    value: any[] = [];
    temp: any[] = [];
    key1: any[] = [];

    constructor(public navCtrl: NavController, public af: AngularFire, public alertCtrl: AlertController) {
        this.af.auth.subscribe((auth) => { this.authUid = auth.uid });
        this.list = this.af.database.list('TodoAppDatabase/users/' + this.authUid);
        this.load();
    }

    load() {

        this.items = this.af.database.list('TodoAppDatabase/users/' + this.authUid, { preserveSnapshot: true });
        this.items
            .subscribe(snapshots => {
                snapshots.forEach(snapshot => {
                    this.key.push(snapshot.key);
                    this.value.push(snapshot.val());
                    console.log(snapshot.val());
                    
                });
            })
    }

    addNewTodo() {
        
        this.navCtrl.push(AddTodo);

    }

    showCheckbox(index: number) {

        this.temp = [];
        this.key1 = [];
        for (var keys in this.value[index]) {
            var value = this.value[index][keys];
            this.temp.push(value.mytodo);
            this.key1.push(keys);
            console.log(this.key1);
        }

        let alert = this.alertCtrl.create();
        alert.setTitle('please select your completed todos');

        for (var i = 0; i < this.temp.length; ++i) {
            alert.addInput({
                type: 'checkbox',
                label: this.temp[i],
                value: this.key1[i],
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
                console.log(this.testCheckboxResult);
                this.delete(this.testCheckboxResult, index);
            }
        });
        alert.present();
    }

    delete(data, index) {
        for (var i = 0; i < data.length; ++i) {
            this.items = this.af.database.list('TodoAppDatabase/users/' + this.authUid + '/' + this.key[index]);
            this.items.remove(data[i]);
        }
    }
}