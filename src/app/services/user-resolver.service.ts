import { Injectable } from '@angular/core';
import {Resolve, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {UserService  } from './user.service';

@Injectable()
export class UserResolverService implements Resolve<any>  {

    constructor(private userService: UserService, private _router: Router) { }
    
    resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {
        return new Promise((resolve,reject)=>{
            this.userService.getUser(route.params['user_id']).then(
            (result) => {
                console.log("user details resolved")
              resolve(result)
            },
            (err)=>{
              new Error("Could'nt get user details")
            }
          )
        });
    }
}