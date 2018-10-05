import { API_CONFIG } from './../../config/api.config';
import { ClienteService } from './../../services/domain/cliente.service';
import { ClienteDTO } from './../../models/cliente.dto';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CameraOptions, Camera} from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente : ClienteDTO;
  picture : string;
  cameraOn : boolean = false;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public storageService: StorageService,
     public clienteService: ClienteService,
     public camera : Camera
     ) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData()
  {
    let localUser = this.storageService.getLocalUser();
    if(localUser != null && localUser.email)
    {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.cliente = response as ClienteDTO;
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

  getCameraPicture()
  {
    this.cameraOn = true;
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.picture = 'data:image/jpeg;base64,' + imageData;
      this.cameraOn = false;
    }, (err) => {
     // Handle error
    });
  }

  sendPicture()
  {
    this.clienteService.uploadPicture(this.picture)
      .subscribe(response => 
        {
          this.picture = null;
          this.loadData();
        }, error => {})
  }

  cancel()
  {
    this.picture = null;
  }

}
