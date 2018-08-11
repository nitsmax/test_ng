import { Injectable } from '@angular/core';
import {Resolve, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {EmojiService  } from './emoji.service';

@Injectable()
export class EmojiResolverService implements Resolve<any>  {

    constructor(private emojiService: EmojiService, private _router: Router) { }
    
    resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {
        return new Promise((resolve,reject)=>{
            this.emojiService.getEmoji(route.params['emoji_id']).then(
            (result) => {
                console.log("emoji details resolved")
              resolve(result)
            },
            (err)=>{
              new Error("Could'nt get emoji details")
            }
          )
        });
    }
}