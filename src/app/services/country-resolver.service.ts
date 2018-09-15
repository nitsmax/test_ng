import { Injectable } from '@angular/core';
import {Resolve, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {CountryService  } from './country.service';

@Injectable()
export class CountryResolverService implements Resolve<any>  {

    constructor(private countryService: CountryService, private _router: Router) { }
    
    resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {
        return new Promise((resolve,reject)=>{
            this.countryService.getCountry(route.params['country_id']).then(
            (result) => {
                console.log("country details resolved")
              resolve(result)
            },
            (err)=>{
              new Error("Could'nt get country details")
            }
          )
        });
    }
}