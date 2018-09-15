import { Component, OnInit, AfterViewInit, Inject, ViewChild} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { FormGroup, FormBuilder, FormArray,Validators } from '@angular/forms';
import {debounceTime, distinctUntilChanged, startWith, tap, delay} from 'rxjs/operators';
import {merge} from "rxjs/observable/merge";
import { VoucherService } from '../../services/voucher.service';
import { UtilsService } from '../../services/utils.service';
import {Voucher} from '../../model/voucher';
import {VouchersDataSource} from '../../services/vouchers.datasource';

@Component({
  selector: 'app-vouchers',
  templateUrl: './vouchers.component.html',
  styleUrls: ['./vouchers.component.scss']
})
export class VouchersComponent implements OnInit, AfterViewInit {

  categories = []
  voucherForm: FormGroup;
  voucherFormFields: any;

  dataSource: VouchersDataSource;

  displayedColumns = ['name','code','discount','uselimit','usedNum','membershipPlan','expireDate','date_created','actions']

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public fb: FormBuilder,
    public voucherService: VoucherService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private coreService: UtilsService
  ) { 
    

  }

   loadForm(){
    this.voucherFormFields = {
      'voucherName': [''],
      'voucherCode': ['']
    };

    this.voucherForm = this.fb.group(this.voucherFormFields);
  }

  ngOnInit() {
    this.loadForm()

    this.dataSource = new VouchersDataSource(this.voucherService);

    this.dataSource.loadVouchers('', '', 'asc', 0, 3);

  }

  ngAfterViewInit() { 

      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

      merge(this.sort.sortChange, this.paginator.page)
      .pipe(
          tap(() => this.loadVouchersPage())
      )
      .subscribe();
  }

  filterS() { 
    this.paginator.pageIndex = 0;
    this.loadVouchersPage()
  }

  loadVouchersPage() { 
    const form = this.voucherForm.value;
    this.dataSource.loadVouchers(
        form.voucherName,
        form.voucherCode,
        this.sort.direction,
        this.paginator.pageIndex,
        this.paginator.pageSize);
  }


  add() {
    this._router.navigate(["/create-voucher"])
  }

  edit(voucher) {
    this._router.navigate(["/edit-voucher", voucher._id])
  }

  delete(voucher) {
    if (confirm('Are u sure want to delete this story?')) {
      this.coreService.displayLoader(true);
      this.voucherService.delete_voucher(voucher._id).then((s: any) => {
        this.ngOnInit();
        this.coreService.displayLoader(false);
      });
    }
  }

}
