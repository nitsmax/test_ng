import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray,Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UtilsService } from '../../services/utils.service';
import {CountryService  } from '../../services/country.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {

  country: any;
  countryForm: FormGroup;
  countryFormFields: any;
  fileToUpload: File = null;
  
  message;
  ImageUrl;
  countryName;

  constructor(
    public fb: FormBuilder,
    public coreService: UtilsService,
    public countryService: CountryService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
  }

  loadForm(){
    this.countryFormFields = {
      '_id': [''],
      'countryCurrency': ['', Validators.compose([Validators.required])],
      'monthlyAmount': ['', Validators.compose([Validators.required])],
      'displayOrder': ['', Validators.compose([Validators.required])]
    };

    this.countryForm = this.fb.group(this.countryFormFields );
  }

  ngOnInit() {
    this.loadForm()

    this._activatedRoute.params.subscribe((params: Params) => {
      console.log("active agent reached " + params['country_id'])
    });


    this._activatedRoute.data
      .subscribe((data:{story:any}) => {
        console.log("selected country =>>")
        console.log(data.story)
        this.country = data.story;
        this.countryName = this.country.countryName
        this.loadForm();
        this.coreService.setDataForm(this.countryForm, this.countryFormFields, this.country);
    });   

  }

  save() {
    const form = this.countryForm.value;


    if (!this.apiTrigger()) {
      delete form.apiDetails;
    }
    console.log(form)


    const formData = new FormData();

    for (let input in form) {
      formData.append(input, form[input]);
    }
    
    this.countryService.saveCountry(formData)
      .then(c => {
        this.message = 'Country created!';
        this._router.navigate(["/edit-country", c["_id"]])
    })
     
  }

  apiTrigger() {
    return this.countryForm.value.apiTrigger;
  }
}
