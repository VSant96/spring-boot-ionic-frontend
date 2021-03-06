import { STORAGE_KEYS } from './../config/storage_keys.config';
import { Cart } from './../models/cart';
import { LocalUser } from './../models/local_user';
import { Injectable } from "@angular/core";
import { stringify } from '@angular/core/src/util';

@Injectable()
export class StorageService
{
    getLocalUser() : LocalUser
    {
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        if(usr == null)  {
            return null;
        }else{
            return JSON.parse(usr);
        }
    }

    setLocalUser(obj: LocalUser)
    {
        if(obj==null){
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }
        else{
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }

    getCart() : Cart
    {
        let usr = localStorage.getItem(STORAGE_KEYS.cart);
        if(usr == null)  {
            return null;
        }else{
            return JSON.parse(usr);
        }
    }

    setCart(obj: Cart)
    {
        if(obj==null){
            localStorage.removeItem(STORAGE_KEYS.cart);
        }
        else{
            localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
        }
    }

    getPlatform() : string
    {
        let platform = localStorage.getItem(STORAGE_KEYS.platform);
        if(platform == null) {
            return null;
        }else{
            return JSON.parse(platform);
        }
    }

    setPlatform(platform:string)
    {
        if(platform==null)
        {
            localStorage.removeItem(STORAGE_KEYS.platform);
        }
        else 
        {
            localStorage.setItem(STORAGE_KEYS.platform, JSON.stringify(platform));
        }
    }


}