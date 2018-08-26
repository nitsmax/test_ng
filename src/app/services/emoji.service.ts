import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {map} from "rxjs/operators";
import { environment } from '../../environments/environment';
import {Observable} from "rxjs/Observable";
import {Emoji} from "../model/emoji";

@Injectable()
export class EmojiService {
  public static emojiTypes = {
    'Bollywood': 'Bollywood',
    'Hollywood': 'Hollywood',
    'Modern': 'Modern',
  };

  public static paidFreeValues = {
    'Paid': 'Paid',
    'Free': 'Free'
  };

  constructor(public http: HttpClient) {
  }

  getEmojis() {
    return this.http.get(environment.apiBackend + 'emojis/findemojis').toPromise();
  }

  findEmojis(
        q = '',name = '', category = '', sortOrder = 'asc',
        pageNumber = 0, pageSize = 3):  Observable<Emoji[]> {

        return this.http.get(environment.apiBackend + 'emojis/findemojis', {
            params: new HttpParams()
                .set('q', q)
                .set('name', name)
                .set('category', category)
                .set('sortOrder', sortOrder)
                .set('pageNumber', pageNumber.toString())
                .set('pageSize', pageSize.toString())
        }).pipe(
            map(res =>  res["payload"])
        );
    }

  getEmoji(id) {
    return this.http.get(environment.apiBackend + `emojis/${id}`).toPromise();
  }

  saveEmoji(emoji) {
    if (emoji.get('_id')) {
      return this.update_emoji(emoji);
    } else {
      delete emoji._id;
      return this.create_emoji(emoji);
    }
  }

  create_emoji(emoji) {
    return this.http.post(environment.apiBackend + `emojis`, emoji).toPromise();
  }

  update_emoji(emoji) {
    return this.http.put(environment.apiBackend + `emojis/${emoji.get('_id')}`, emoji).toPromise();
  }

  delete_emoji(id) {
    return this.http.delete(environment.apiBackend + `emojis/${id}`, {}).toPromise();
  }

  importEmojis(fileToUpload: File){
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http
      .post(environment.apiBackend +"emojis/import", formData).toPromise();
  }

}

