import { Injectable } from '@angular/core';
import {Resolve, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {CategoryService  } from './category.service';

@Injectable()
export class CategoryResolverService implements Resolve<any>  {

    constructor(private categoryService: CategoryService, private _router: Router) { }
    
    resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {
        return new Promise((resolve,reject)=>{
            this.categoryService.getCategory(route.params['category_id']).then(
            (result) => {
                console.log("category details resolved")
              resolve(result)
            },
            (err)=>{
              new Error("Could'nt get category details")
            }
          )
        });
    }
}