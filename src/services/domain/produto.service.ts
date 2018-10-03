import { Observable } from 'rxjs/Rx';
import { API_CONFIG } from './../../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { ProdutoDTO } from '../../models/produto.dto';

@Injectable()
export class ProdutoService
{
    constructor(public http : HttpClient){}

    findById(produto_id: string)
    {
        return this.http.get<ProdutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produto_id}`);
    }
    findByCategoria(categoria_id:string)
    {
        return this.http.get(`${API_CONFIG.baseUrl}/produtos?categorias=${categoria_id}`);
    }

    getSmallImageFromLocalhost(id: string) : Observable<any>
    {
        let url = `${API_CONFIG.imgBaseUrl}/prod${id}-small.jpg`;
        return this.http.get(url,{responseType:'blob'});
    }

    getImageFromLocalhost(id: string) : Observable<any>
    {
        let url = `${API_CONFIG.imgBaseUrl}/prod${id}.jpg`;
        return this.http.get(url,{responseType:'blob'});
    }

}