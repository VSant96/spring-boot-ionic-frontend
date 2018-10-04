import { PedidoService } from './../../services/domain/pedido.service';
import { EnderecoDTO } from './../../models/endereco.dto';
import { ClienteDTO } from './../../models/cliente.dto';
import { CartService } from './../../services/domain/cart.service';
import { CartItem } from './../../models/cart-item';
import { PedidoDTO } from './../../models/pedido.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: PedidoDTO;
  cartItems : CartItem[];
  cliente : ClienteDTO;
  endereco: EnderecoDTO;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public cartService: CartService,
    public clienteService : ClienteService,
    public pedidoService : PedidoService) {
    this.pedido = this.navParams.get('pedido');
    
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;
    this.clienteService.findById(this.pedido.cliente.id)
      .subscribe(response => {
        this.cliente = response as ClienteDTO;
        this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, response['enderecos']);
      }, error=> {
        this.navCtrl.setRoot('HomePage');
      });
  }

  private findEndereco(id: string, list:EnderecoDTO[]) : EnderecoDTO
  {
    let position = list.findIndex(x => x.id == id);
    return list[position];
  }

  total() : number
  {
    return this.cartService.total();
  }

  back()
  {
    this.navCtrl.setRoot('CartPage');
  }

  checkout()
  {
    this.pedidoService.insert(this.pedido)
      .subscribe(response=> {
        console.log(response.headers.get('location'));
        this.cartService.createOrClearCart();
        
      }, error => {
        if(error.status == 403)
        {
          this.navCtrl.setRoot('HomePage');
        }
      });
  }


}
