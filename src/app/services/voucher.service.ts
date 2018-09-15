import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {map} from "rxjs/operators";
import { environment } from '../../environments/environment';
import {Observable} from "rxjs/Observable";
import {Voucher} from "../model/voucher";

@Injectable()
export class VoucherService {
  
  constructor(public http: HttpClient) {
  }

  getVouchers() {
    return this.http.get(environment.apiBackend + 'vouchers/findvouchers').toPromise();
  }

  findVouchers(
        voucherName = '',voucherCode = '', sortOrder = 'asc',
        pageNumber = 0, pageSize = 3):  Observable<Voucher[]> {

        return this.http.get(environment.apiBackend + 'vouchers/findvouchers', {
            params: new HttpParams()
                .set('voucherName', voucherName)
                .set('voucherCode', voucherCode)
                .set('sortOrder', sortOrder)
                .set('pageNumber', pageNumber.toString())
                .set('pageSize', pageSize.toString())
        }).pipe(
            map(res =>  res["payload"])
        );
    }

  getVoucher(id) {
    return this.http.get(environment.apiBackend + `vouchers/${id}`).toPromise();
  }

  saveVoucher(voucher) {
    if (voucher.get('_id')) {
      return this.update_voucher(voucher);
    } else {
      delete voucher._id;
      return this.create_voucher(voucher);
    }
  }

  create_voucher(voucher) {
    return this.http.post(environment.apiBackend + `vouchers`, voucher).toPromise();
  }

  update_voucher(voucher) {
    return this.http.put(environment.apiBackend + `vouchers/${voucher.get('_id')}`, voucher).toPromise();
  }

  delete_voucher(id) {
    return this.http.delete(environment.apiBackend + `vouchers/${id}`, {}).toPromise();
  }

  importVouchers(fileToUpload: File){
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http
      .post(environment.apiBackend +"vouchers/import", formData).toPromise();
  }

}

