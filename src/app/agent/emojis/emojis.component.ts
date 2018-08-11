import { Component, OnInit, Inject, Input } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';

import { EmojiService } from '../../services/emoji.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-emojis',
  templateUrl: './emojis.component.html',
  styleUrls: ['./emojis.component.scss']
})
export class EmojisComponent implements OnInit {



  emojis: any;

  constructor(public emojiService: EmojiService, private _activatedRoute: ActivatedRoute,
     private _router: Router, private coreService: UtilsService) { }

  ngOnInit() {

    this.emojiService.getEmojis().then((s: any) => {
      this.emojis = s;
    });
  }


  add() {
    this._router.navigate(["/create-emoji"])
  }

  edit(emoji) {
    this._router.navigate(["/edit-emoji", emoji._id.$oid])
  }

  train(emoji) {
    this._router.navigate(["/train-emoji", emoji._id.$oid])
  }

  delete(emoji) {
    if (confirm('Are u sure want to delete this story?')) {
      this.coreService.displayLoader(true);
      this.emojiService.delete_emoji(emoji._id.$oid).then((s: any) => {
        this.ngOnInit();
        this.coreService.displayLoader(false);
      });
    }
  }

  trainModels() {
    this.coreService.displayLoader(true);
  }
}
