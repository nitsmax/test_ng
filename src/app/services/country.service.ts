import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {map} from "rxjs/operators";
import { environment } from '../../environments/environment';
import {Observable} from "rxjs/Observable";
import {Country} from "../model/country";

@Injectable()
export class CountryService {

  constructor(public http: HttpClient) {
  }

  getCountries() {
    return this.http.get(environment.apiBackend + 'countries').toPromise();
  }

  findCountries(
        q = '',name = '', sortOrder = 'asc',
        pageNumber = 0, pageSize = 3):  Observable<Country[]> {

        return this.http.get(environment.apiBackend + 'countries/findcountries', {
            params: new HttpParams()
                .set('q', q)
                .set('name', name)
                .set('sortOrder', sortOrder)
                .set('pageNumber', pageNumber.toString())
                .set('pageSize', pageSize.toString())
        }).pipe(
            map(res =>  res["payload"])
        );
    }

  getCountry(id) {
    return this.http.get(environment.apiBackend + `countries/${id}`).toPromise();
  }

  saveCountry(country) {
    if (country.get('_id')) {
      return this.update_country(country);
    } else {
      delete country._id;
      return this.create_country(country);
    }
  }

  create_country(country) {
    return this.http.post(environment.apiBackend + `countries`, country).toPromise();
  }

  update_country(country) {
    return this.http.put(environment.apiBackend + `countries/${country.get('_id')}`, country).toPromise();
  }

  delete_country(id) {
    return this.http.delete(environment.apiBackend + `countries/${id}`, {}).toPromise();
  }

  importCountries(fileToUpload: File){
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http
      .post(environment.apiBackend +"countries/import", formData).toPromise();
  }

}

