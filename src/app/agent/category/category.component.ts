import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray,Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UtilsService } from '../../services/utils.service';
import {CategoryService  } from '../../services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  category: any;
  categoryForm: FormGroup;
  categoryFormFields: any;
  fileToUpload: File = null;
  @ViewChild('CategoryImage') CategoryImage;

  CategoryImageFile: File;

  categories = []
  status;
  statusArray;
  message;
  ImageUrl;

  constructor(
    public fb: FormBuilder,
    public coreService: UtilsService,
    public categoryService: CategoryService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {

      this.status = CategoryService.status;
      this.statusArray = Object.keys(this.status);

      
  }

  loadForm(){
    this.categoryFormFields = {
      '_id': [''],
      'name': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(1500)])],
      'status': ['', Validators.compose([Validators.required])],
      'Image': [null]
    };

    this.categoryForm = this.fb.group(this.categoryFormFields );
  }

  ngOnInit() {
    this.loadForm()

    this._activatedRoute.params.subscribe((params: Params) => {
      console.log("active agent reached " + params['category_id'])
    });


    this._activatedRoute.data
      .subscribe((data:{story:any}) => {
        console.log("selected category =>>")
        console.log(data.story)
        this.category = data.story;
        this.loadForm();
        this.coreService.setDataForm(this.categoryForm, this.categoryFormFields, this.category);
    });   

    if(this.category && this.category.image){
       this.ImageUrl = this.category.image;
    }

  }

  onFileChange(event) {
    var reader:any,
    target:EventTarget;
    reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = (event:any) => {
       this.ImageUrl = event.target.result;
      };
    }
  }

  save() {
    const form = this.categoryForm.value;
    const Image = this.CategoryImage.nativeElement;
    if (Image.files && Image.files[0]) {
      this.CategoryImageFile = Image.files[0];
    }
    const ImageFile: File = this.CategoryImageFile;


    if (!this.apiTrigger()) {
      delete form.apiDetails;
    }
    console.log(form)


    const formData = new FormData();

    for (let input in form) {
      formData.append(input, form[input]);
    }

    if(ImageFile){
      formData.append('Image',ImageFile,ImageFile.name);
    }
    this.categoryService.saveCategory(formData)
      .then(c => {
        this.message = 'Category created!';
        this._router.navigate(["/edit-category", c["_id"]])
    })
     
  }

  apiTrigger() {
    return this.categoryForm.value.apiTrigger;
  }
}
