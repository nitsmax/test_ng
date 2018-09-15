import { Injectable } from '@angular/core';
import {Resolve, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {VoucherService  } from './voucher.service';

@Injectable()
export class VoucherResolverService implements Resolve<any>  {

    constructor(private voucherService: VoucherService, private _router: Router) { }
    
    resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {
        return new Promise((resolve,reject)=>{
            this.voucherService.getVoucher(route.params['voucher_id']).then(
            (result) => {
                console.log("voucher details resolved")
              resolve(result)
            },
            (err)=>{
              new Error("Could'nt get voucher details")
            }
          )
        });
    }
}