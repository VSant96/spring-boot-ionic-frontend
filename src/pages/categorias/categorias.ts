import { CategoriaDTO } from './../../models/categoria.dto';
import { CategoriaService } from './../../services/domain/categoria.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { normalizeURL } from 'ionic-angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  items: CategoriaDTO[];
  imgUrl : string = API_CONFIG.imgBaseUrl;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService : CategoriaService) {
    
  }

  ionViewDidLoad() {
    this.categoriaService.findAll()
      .subscribe(response => {       
        this.items = response;
      },
      error =>  {
        console.log(error);
      });
  }

 
}
