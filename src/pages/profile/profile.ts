import { API_CONFIG } from './../../config/api.config';
import { ClienteService } from './../../services/domain/cliente.service';
import { ClienteDTO } from './../../models/cliente.dto';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente : ClienteDTO;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public storageService: StorageService,
     public clienteService: ClienteService
     ) {
  }

  ionViewDidLoad() {
    let localUser = this.storageService.getLocalUser();
    if(localUser != null && localUser.email)
    {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.cliente = response;
          this.getImageIfExists();
          
        },
        error => {
          if(error.status == 403)
          {
            this.navCtrl.setRoot('HomePage');
          }
        });
    } else
    {
      this.navCtrl.setRoot('HomePage');
    }
  }

  getImageIfExists()
  {
      this.clienteService.getImageFromLocalHost(this.cliente.id)
      .subscribe(response => {          
          this.cliente.imageUrl = `${API_CONFIG.imgBaseUrl}/cp${this.cliente.id}.jpg`;
        },
       error => {})
       
  }

}