import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from '../../models/credenciais.dto';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  };
  constructor(public navCtrl: NavController, public menuCtrl: MenuController) {

  }

  login()
  {
    console.log(this.creds);
    this.navCtrl.setRoot('CategoriasPage');
  }

  ionViewWillEnter(){
    this.menuCtrl.swipeEnable(false);
  }

  ionViewCanLeave(){
    this.menuCtrl.swipeEnable(true);
  }

}
