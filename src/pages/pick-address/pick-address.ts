import { ClienteService } from './../../services/domain/cliente.service';
import { StorageService } from './../../services/storage.service';
import { EnderecoDTO } from './../../models/endereco.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDTO } from '../../models/cliente.dto';

/**
 * Generated class for the PickAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items : EnderecoDTO[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public storageService : StorageService,
    public clienteService : ClienteService) {
  }

  ionViewDidLoad() {
    let localUser = this.storageService.getLocalUser();
    if(localUser != null && localUser.email)
    {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.items = response['enderecos'];      
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

}
