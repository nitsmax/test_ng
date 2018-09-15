import { Component, OnInit, AfterViewInit, Inject, ViewChild} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { FormGroup, FormBuilder, FormArray,Validators } from '@angular/forms';
import {debounceTime, distinctUntilChanged, startWith, tap, delay} from 'rxjs/operators';
import {merge} from "rxjs/observable/merge";
import { CountryService } from '../../services/country.service';
import { UtilsService } from '../../services/utils.service';
import {Country} from '../../model/country';
import {CountriesDataSource} from '../../services/countries.datasource';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit, AfterViewInit {

  categories = []
  countryForm: FormGroup;
  countryFormFields: any;

  dataSource: CountriesDataSource;

  displayedColumns = ['countryName','countryCode','countryCurrency','monthlyAmount','actions']

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public fb: FormBuilder,
    public countryService: CountryService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private coreService: UtilsService
  ) { 
    

  }

   loadForm(){
    this.countryFormFields = {
      'countryName': ['']
    };

    this.countryForm = this.fb.group(this.countryFormFields);
  }

  ngOnInit() {
    this.loadForm()

    this.dataSource = new CountriesDataSource(this.countryService);

    this.dataSource.loadCountries('', '', 'asc', 0, 3);

  }

  ngAfterViewInit() { 

      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

      merge(this.sort.sortChange, this.paginator.page)
      .pipe(
          tap(() => this.loadCountriesPage())
      )
      .subscribe();
  }

  filterS() { 
    this.paginator.pageIndex = 0;
    this.loadCountriesPage()
  }

  loadCountriesPage() { 
    const form = this.countryForm.value;
    this.dataSource.loadCountries(
        form.q,
        form.countryName,
        this.sort.direction,
        this.paginator.pageIndex,
        this.paginator.pageSize);
  }


  add() {
    this._router.navigate(["/create-country"])
  }

  edit(country) {
    this._router.navigate(["/edit-country", country._id])
  }

  delete(country) {
    if (confirm('Are u sure want to delete this story?')) {
      this.coreService.displayLoader(true);
      this.countryService.delete_country(country._id).then((s: any) => {
        this.ngOnInit();
        this.coreService.displayLoader(false);
      });
    }
  }

}
