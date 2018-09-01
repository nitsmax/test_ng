import { Component, OnInit, Inject, ViewChild} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {MatTableDataSource} from "@angular/material";
import { CategoryService } from '../../services/category.service';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categories = []

  displayedColumns = ['image','name','status','actions']


  constructor(
    public categoryService: CategoryService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private coreService: UtilsService
  ) { 
    

  }

  ngOnInit() {
    this.categoryService.getCategories().then(
      (result: Array<any>) => {
        this.categories = result
      }
    )
  }

  add() {
    this._router.navigate(["/create-category"])
  }

  edit(category) {
    this._router.navigate(["/edit-category", category._id])
  }

  delete(category) {
    if (confirm('Are u sure want to delete this story?')) {
      this.coreService.displayLoader(true);
      this.categoryService.delete_category(category._id).then((s: any) => {
        this.ngOnInit();
        this.coreService.displayLoader(false);
      });
    }
  }

}
