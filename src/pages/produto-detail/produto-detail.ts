import { ProdutoService } from './../../services/domain/produto.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';
import { ImageUtilService } from '../../services/image-util.service';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  
  item: ProdutoDTO;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService : ProdutoService,
    public cartService : CartService,
    public imageUtilService : ImageUtilService) {
  }

  ionViewDidLoad() {
    this.produtoService.findById(this.navParams.get('produto_id'))
      .subscribe(response => {
        this.item = response;
        this.getImageUrlIfExists();
      }, error => {});
  }

  getImageUrlIfExists()
  {
    this.produtoService.getImageFromLocalhost(this.item.id)
      .subscribe(response => {
        this.item.imageUrl = this.imageUtilService.getFileName(this.item.id,"prod","");;
      }, error => {})
  }

  addToCartItem(produto: ProdutoDTO)
  {
    this.cartService.addProduto(produto);
    this.navCtrl.setRoot('CartPage');
  }

}
