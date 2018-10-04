import { API_CONFIG } from './../../config/api.config';
import { ProdutoService } from './../../services/domain/produto.service';
import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService : ProdutoService,
    public loadingCtrl : LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();  
  }

  loadData()
  {
    let categoria_id = this.navParams.get('categoria_id');
    let loader = this.presentLoadingDefault();
    this.produtoService.findByCategoria(categoria_id)
      .subscribe(response =>
      {
        this.items = response['content'];
        loader.dismiss();
        this.loadImagesUrl();
      }, error => {
        loader.dismiss();
      });
  }

  loadImagesUrl()
  {
    for(var i = 0; i<this.items.length; ++i)
    {
      let item = this.items[i];
      this.produtoService.getSmallImageFromLocalhost(item.id)
        .subscribe(response => 
          {
            item.imageUrl = `${API_CONFIG.imgBaseUrl}/prod${item.id}-small.jpg`;
            console.log(item.imageUrl);
            
          }, error => {})
    }
  }

  showDetail(produto_id: string)
  {
    this.navCtrl.push('ProdutoDetailPage', {produto_id: produto_id});
  }

  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    loading.present();
    return loading;
  }

  doRefresh(refresher) {
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }
}
