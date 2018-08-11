import { Component, OnInit, Inject, Input } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {



  users: any;

  constructor(public userService: UserService, private _activatedRoute: ActivatedRoute,
     private _router: Router, private coreService: UtilsService) { }

  ngOnInit() {

    this.userService.getUsers().then((s: any) => {
      this.users = s;
    });
  }


  add() {
    this._router.navigate(["/create-user"])
  }

  edit(user) {
    this._router.navigate(["/edit-user", user._id.$oid])
  }

  train(user) {
    this._router.navigate(["/train-user", user._id.$oid])
  }

  delete(user) {
    if (confirm('Are u sure want to delete this story?')) {
      this.coreService.displayLoader(true);
      this.userService.delete_user(user._id.$oid).then((s: any) => {
        this.ngOnInit();
        this.coreService.displayLoader(false);
      });
    }
  }

  trainModels() {
    this.coreService.displayLoader(true);
  }
}
