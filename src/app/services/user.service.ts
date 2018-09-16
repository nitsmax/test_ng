import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {map} from "rxjs/operators";
import { environment } from '../../environments/environment';
import {Observable} from "rxjs/Observable";
import {User} from "../model/user";

@Injectable()
export class UserService {
  
  public static paidFreeValues = {
    'Paid': 'Paid',
    'Free': 'Free'
  };

  constructor(public http: HttpClient) {
  }

  getUsers() {
    return this.http.get(environment.apiBackend + 'users/findusers').toPromise();
  }

  getCategories() {
    return this.http.get(environment.apiBackend + 'categories/findcategories').toPromise();
  }

  findUsers(
        firstName = '',lastName = '', email = '', country = '', state= '', ispaid= '', sortOrder = 'asc',
        pageNumber = 0, pageSize = 3):  Observable<User[]> {

        return this.http.get(environment.apiBackend + 'users/findusers', {
            params: new HttpParams()
                .set('firstName', firstName)
                .set('lastName', lastName)
                .set('email', email)
                .set('country', country)
                .set('state', state)
                .set('ispaid', ispaid)
                .set('sortOrder', sortOrder)
                .set('pageNumber', pageNumber.toString())
                .set('pageSize', pageSize.toString())
        }).pipe(
            map(res =>  res["payload"])
        );
    }

  getUser(id) {
    return this.http.get(environment.apiBackend + `users/${id}`).toPromise();
  }

  saveUser(user) {
    if (user.get('_id')) {
      return this.update_user(user);
    } else {
      delete user._id;
      return this.create_user(user);
    }
  }

  create_user(user) {
    return this.http.post(environment.apiBackend + `users`, user).toPromise();
  }

  update_user(user) {
    return this.http.put(environment.apiBackend + `users/${user.get('_id')}`, user).toPromise();
  }

  delete_user(id) {
    return this.http.delete(environment.apiBackend + `users/${id}`, {}).toPromise();
  }

  importUsers(fileToUpload: File){
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http
      .post(environment.apiBackend +"users/import", formData).toPromise();
  }

}

