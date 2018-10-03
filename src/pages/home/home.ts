import { AuthService } from './../../services/authservice';
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
  constructor(
    public navCtrl: NavController, 
    public menuCtrl: MenuController,
    public auth:AuthService) {

  }

  login()
  {
    this.auth.authenticate(this.creds)
      .subscribe(response => 
        {
          this.auth.successfulLogin(response.headers.get('Authorization'));
          this.navCtrl.setRoot('CategoriasPage');
        },
        error => {})
  }

  signup()
  {
    this.navCtrl.push('SignupPage');
  }

  ionViewWillEnter(){
    this.menuCtrl.swipeEnable(false);
  }

  ionViewCanLeave(){
    this.menuCtrl.swipeEnable(true);
  }

  ionViewDidEnter(){
    this.auth.refreshToken()
    .subscribe(response => 
      {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      },
      error => {})
  }

}
