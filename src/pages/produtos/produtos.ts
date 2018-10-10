import { ImageUtilService } from './../../services/image-util.service';
import { StorageService } from './../../services/storage.service';
import { API_CONFIG } from './../../config/api.config';
import { ProdutoService } from './../../services/domain/produto.service';
import { ProdutoDTO } from './../../models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Platform } from 'ionic-angular/platform/platform';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {
  items : ProdutoDTO[] = [];
  page : number = 0;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService : ProdutoService,
    public loadingCtrl : LoadingController,
    private imageUtilService : ImageUtilService) {
  }

  ionViewDidLoad() {
    this.loadData();  
  }

  loadData()
  {
    let categoria_id = this.navParams.get('categoria_id');
    let loader = this.presentLoadingDefault();
    this.produtoService.findByCategoria(categoria_id, this.page, 10)
      .subscribe(response =>
      {
        let start = this.items.length;
        this.items = this.items.concat(response['content']);
        let end = this.items.length;
        loader.dismiss();
        this.loadImagesUrl(start,end);
      }, error => {
        loader.dismiss();
      });
  }

  loadImagesUrl(start:number,end:number)
  {
    for(var i = start; i<end; ++i)
    {
      let item = this.items[i];
      this.produtoService.getSmallImageFromLocalhost(item.id)
        .subscribe(response => 
          {
            item.imageUrl = this.imageUtilService.getFileName(item.id,"prod","small");
            
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
    this.page = 0;
    this.items = [];
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }
}
