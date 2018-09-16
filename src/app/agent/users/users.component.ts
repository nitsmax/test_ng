import { Component, OnInit, AfterViewInit, Inject, ViewChild} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { FormGroup, FormBuilder, FormArray,Validators } from '@angular/forms';
import {debounceTime, distinctUntilChanged, startWith, tap, delay} from 'rxjs/operators';
import {merge} from "rxjs/observable/merge";
import { UserService } from '../../services/user.service';
import { CountryService } from '../../services/country.service';
import { UtilsService } from '../../services/utils.service';
import {User} from '../../model/user';
import {UsersDataSource} from '../../services/users.datasource';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit {

  countries = []
  paidFreeValues;
  paidFreeArray
  userForm: FormGroup;
  userFormFields: any;

  dataSource: UsersDataSource;

  displayedColumns = ['firstName','lastName','email','country','state','membershipPlan','memberShipExpDate','date_created']

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public fb: FormBuilder,
    public userService: UserService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private coreService: UtilsService,
    public countryService: CountryService,
  ) { 
    
    this.paidFreeValues = UserService.paidFreeValues;
    this.paidFreeArray = Object.keys(this.paidFreeValues);
  }

   loadForm(){
    this.userFormFields = {
      'firstName': [''],
      'lastName': [''],
      'email': [''],
      'country': [''],
      'state': [''],
      'ispaid': [''],
    };

    this.userForm = this.fb.group(this.userFormFields);
  }

  ngOnInit() {
    this.loadForm()

    this.dataSource = new UsersDataSource(this.userService);

    this.dataSource.loadUsers('','','','','', '', 'asc', 0, 3);

    this.countryService.getCountries().then(
      (result: Array<any>) => {
        this.countries = result
      }
    )
  }

  ngAfterViewInit() { 

      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

      merge(this.sort.sortChange, this.paginator.page)
      .pipe(
          tap(() => this.loadUsersPage())
      )
      .subscribe();
  }

  filterS() { 
    this.paginator.pageIndex = 0;
    this.loadUsersPage()
  }

  loadUsersPage() { 
    const form = this.userForm.value;
    this.dataSource.loadUsers(
        form.firstName,
        form.lastName,
        form.email,
        form.country,
        form.state,
        form.ispaid,
        this.sort.direction,
        this.paginator.pageIndex,
        this.paginator.pageSize);
  }


  add() {
    this._router.navigate(["/create-user"])
  }

  edit(user) {
    this._router.navigate(["/edit-user", user._id])
  }

  delete(user) {
    if (confirm('Are u sure want to delete this story?')) {
      this.coreService.displayLoader(true);
      this.userService.delete_user(user._id).then((s: any) => {
        this.ngOnInit();
        this.coreService.displayLoader(false);
      });
    }
  }

}
