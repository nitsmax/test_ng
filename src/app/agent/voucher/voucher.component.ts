import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray,Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UtilsService } from '../../services/utils.service';
import {VoucherService  } from '../../services/voucher.service';
import {CountryService  } from '../../services/country.service';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss']
})
export class VoucherComponent implements OnInit {

  voucher: any;
  voucherForm: FormGroup;
  voucherFormFields: any;
  fileToUpload: File = null;
  

  countries = []
  paidFreeValues;
  paidFreeArray
  message;
  ImageUrl;
  voucherName;

  constructor(
    public fb: FormBuilder,
    public coreService: UtilsService,
    public voucherService: VoucherService,
    public countryService: CountryService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {
      
  }

  loadForm(){
    this.voucherFormFields = {
      '_id': [''],
      'name': ['', Validators.compose([Validators.required])],
      'code': ['', Validators.compose([Validators.required])],
      'discount': ['', Validators.compose([Validators.required])],
      'uselimit': ['', Validators.compose([Validators.required])],
      'membershipPlan': ['', Validators.compose([Validators.required])],
      'expireDate': ['', Validators.compose([Validators.required])]
    };

    this.voucherForm = this.fb.group(this.voucherFormFields );
  }

  ngOnInit() {
    this.loadForm()

    this._activatedRoute.params.subscribe((params: Params) => {
      console.log("active agent reached " + params['voucher_id'])
    });


    this._activatedRoute.data
      .subscribe((data:{story:any}) => {
        console.log("selected voucher =>>")
        console.log(data.story)
        this.voucher = data.story;
        this.loadForm();
        this.coreService.setDataForm(this.voucherForm, this.voucherFormFields, this.voucher);
    });

    this.countryService.getCountries().then(
      (result: Array<any>) => {
        this.countries = result
      }
    )   

  }

  save() {
    const form = this.voucherForm.value;


    if (!this.apiTrigger()) {
      delete form.apiDetails;
    }
    console.log(form)


    const formData = new FormData();

    for (let input in form) {
      formData.append(input, form[input]);
    }
    
    this.voucherService.saveVoucher(formData)
      .then(c => {
        this.message = 'Voucher created!';
        this._router.navigate(["/edit-voucher", c["_id"]])
    })
     
  }

  apiTrigger() {
    return this.voucherForm.value.apiTrigger;
  }
}
