import { Component, OnInit, AfterViewInit, Inject, ViewChild} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import { FormGroup, FormBuilder, FormArray,Validators } from '@angular/forms';
import {debounceTime, distinctUntilChanged, startWith, tap, delay} from 'rxjs/operators';
import {merge} from "rxjs/observable/merge";
import { EmojiService } from '../../services/emoji.service';
import { UtilsService } from '../../services/utils.service';
import {Emoji} from '../../model/emoji';
import {EmojisDataSource} from '../../services/emojis.datasource';

@Component({
  selector: 'app-emojis',
  templateUrl: './emojis.component.html',
  styleUrls: ['./emojis.component.scss']
})
export class EmojisComponent implements OnInit, AfterViewInit {

  emojiTypes;
  emojiTypesArray;
  emojiForm: FormGroup;
  emojiFormFields: any;

  dataSource: EmojisDataSource;

  displayedColumns = ['image','name','tags','category','isPaid','actions']

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public fb: FormBuilder,
    public emojiService: EmojiService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private coreService: UtilsService
  ) { 
    this.emojiTypes = EmojiService.emojiTypes;
    this.emojiTypesArray = Object.keys(this.emojiTypes);

  }

   loadForm(){
    this.emojiFormFields = {
      'q': [''],
      'name': [''],
      'category': ['']
    };

    this.emojiForm = this.fb.group(this.emojiFormFields);
  }

  ngOnInit() {
    this.loadForm()

    this.dataSource = new EmojisDataSource(this.emojiService);

    this.dataSource.loadEmojis('','', '', 'asc', 0, 3);
  }

  ngAfterViewInit() { 

      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

      merge(this.sort.sortChange, this.paginator.page)
      .pipe(
          tap(() => this.loadEmojisPage())
      )
      .subscribe();
  }

  filterS() { 
    this.paginator.pageIndex = 0;
    this.loadEmojisPage()
  }

  loadEmojisPage() { 
    const form = this.emojiForm.value;
    this.dataSource.loadEmojis(
        form.q,
        form.name,
        form.category,
        this.sort.direction,
        this.paginator.pageIndex,
        this.paginator.pageSize);
  }


  add() {
    this._router.navigate(["/create-emoji"])
  }

  edit(emoji) {
    this._router.navigate(["/edit-emoji", emoji._id])
  }

  delete(emoji) {
    if (confirm('Are u sure want to delete this story?')) {
      this.coreService.displayLoader(true);
      this.emojiService.delete_emoji(emoji._id).then((s: any) => {
        this.ngOnInit();
        this.coreService.displayLoader(false);
      });
    }
  }

}
