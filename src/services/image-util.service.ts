import { API_CONFIG } from './../config/api.config';
import { StorageService } from './storage.service';
import { Injectable } from "@angular/core";
@Injectable()
export class ImageUtilService {

    constructor(public storage : StorageService)
    {

    }
    dataUriToBlob(dataURI) {
        var byteString = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    }

    getFileName(cod : string,tipo : string,size : string) : string
    {
        let imgPath = API_CONFIG.imgBaseUrl;
        if(this.storage.getPlatform() == "cordova")
        {
            imgPath = API_CONFIG.imgBaseUrlCordova;
        }
        let str;
        if(size == "")
        {
            str = imgPath + "/" + tipo + cod + ".jpg";
        } else {
            str = imgPath + "/" + tipo + cod + "-" + size + ".jpg";
        }
        return str;
    }
}