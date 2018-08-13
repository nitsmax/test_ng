import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

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
    return this.http.get(environment.apiBackend + 'emojis').toPromise();
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

