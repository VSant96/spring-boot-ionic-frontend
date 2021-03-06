import { ProdutoDTO } from './../../models/produto.dto';
import { ProdutoService } from './../../services/domain/produto.service';
import { StorageService } from './../../services/storage.service';
import { CartItem } from './../../models/cart-item';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { CartService } from '../../services/domain/cart.service';
import { ImageUtilService } from '../../services/image-util.service';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public cartService : CartService,
     public produtoService: ProdutoService,
     public imageUtilService : ImageUtilService) {
       
  }

  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.items = cart.items;
    this.loadImagesUrl();
  }

  loadImagesUrl()
  {
    for(var i = 0; i<this.items.length; ++i)
    {
      let item = this.items[i];
      this.produtoService.getSmallImageFromLocalhost(item.produto.id)
        .subscribe(response => 
          {
            item.produto.imageUrl = this.imageUtilService.getFileName(item.produto.id,"prod","small");
          }, error => {})
    }
  }

  removeItem(produto: ProdutoDTO)
  {
    this.items = this.cartService.removeProduto(produto).items;
  }

  increaseQuantity(produto: ProdutoDTO)
  {
    this.items = this.cartService.increaseQuantity(produto).items;
  }

  decreaseQuantity(produto: ProdutoDTO)
  {
    this.items = this.cartService.decreaseQuantity(produto).items;
  }

  total() : number
  {
    return this.cartService.total();
  }

  goOn()
  {
    this.navCtrl.setRoot("CategoriasPage");
  }

  checkOut()
  {
    this.navCtrl.push('PickAddressPage');
  }

}
