import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {map} from "rxjs/operators";
import { environment } from '../../environments/environment';
import {Observable} from "rxjs/Observable";

@Injectable()
export class CategoryService {
  
  public static status = {
    'Active': 'Active',
    'Inactive': 'Inactive'
  };

  constructor(public http: HttpClient) {
  }

  getCategories() {
    return this.http.get(environment.apiBackend + 'categories').toPromise();
  }

  getCategory(id) {
    return this.http.get(environment.apiBackend + `categories/${id}`).toPromise();
  }

  saveCategory(category) {
    if (category.get('_id')) {
      return this.update_category(category);
    } else {
      delete category._id;
      return this.create_category(category);
    }
  }

  create_category(category) {
    return this.http.post(environment.apiBackend + `categories`, category).toPromise();
  }

  update_category(category) {
    return this.http.put(environment.apiBackend + `categories/${category.get('_id')}`, category).toPromise();
  }

  delete_category(id) {
    return this.http.delete(environment.apiBackend + `categories/${id}`, {}).toPromise();
  }

  importCategories(fileToUpload: File){
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http
      .post(environment.apiBackend +"categories/import", formData).toPromise();
  }

}

