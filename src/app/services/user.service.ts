import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
  public static userTypes = {
    'mobile': 'Mobile number',
    'email': 'Email',
    'free_text': 'Free Text',
    'number': 'Number',
    'list': 'List',
  };

  constructor(public http: HttpClient) {
  }

  getUsers() {
    return this.http.get(environment.apiBackend + 'users').toPromise();
  }

  getUser(id) {
    return this.http.get(environment.apiBackend + `users/${id}`).toPromise();
  }

  saveUser(user) {
    if (user._id) {
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
    return this.http.put(environment.apiBackend + `users/${user._id}`, user).toPromise();
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

