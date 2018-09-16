import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray,Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UtilsService } from '../../services/utils.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: any;
  userForm: FormGroup;
  userFormFields: any;
  fileToUpload: File = null;
  @ViewChild('UserImage') UserImage;

  UserImageFile: File;

  message;

  constructor(
    public fb: FormBuilder,
    public coreService: UtilsService,
    public userService: UserService,
    private _activatedRoute: ActivatedRoute, private _router: Router) {
      
  }

  loadForm(){
    this.userFormFields = {
      '_id': [''],
      'firstName': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(1500)])],
      'lastName': ['', Validators.compose([Validators.required,Validators.minLength(3), Validators.maxLength(1500)])],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      'Image': [null]
    };

    this.userForm = this.fb.group({
      '_id': [''],
      'firstName': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(1500)])],
      'lastName': ['', Validators.compose([Validators.minLength(3), Validators.maxLength(1500)])],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      'Image': [null]
    });


  }

  ngOnInit() {
    this.loadForm()

    this._activatedRoute.params.subscribe((params: Params) => {
      console.log("active agent reached " + params['user_id'])
    });


    this._activatedRoute.data
      .subscribe((data:{story:any}) => {
        console.log("selected user =>>")
        console.log(data.story)
        this.user = data.story;
        this.loadForm();
        this.coreService.setDataForm(this.userForm, this.userFormFields, this.user);
    });   



  }

  onFileChange(event) {
    var reader:any,
    target:EventTarget;
    reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = (event:any) => {
       this.UserImageFile = event.target.result;
      };
    }
  }

  save() {
    const form = this.userForm.value;

    const Image = this.UserImage.nativeElement;
    if (Image.files && Image.files[0]) {
      this.UserImageFile = Image.files[0];
    }
    const ImageFile: File = this.UserImageFile;

    if (form._id && form._id.$oid) {
      form._id = form._id.$oid;
    }
    if (!this.apiTrigger()) {
      delete form.apiDetails;
    }

    const formData = new FormData();

    for (let input in form) {
      formData.append(input, form[input]);
    }
    formData.append('Image',ImageFile,ImageFile.name);

    this.userService.saveUser(formData)
      .then(c => {
        this.message = 'User created!';
        this._router.navigate(["/edit-user", c["_id"]])
      })
     
  }

  apiTrigger() {
    return this.userForm.value.apiTrigger;
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    
    this.userFormFields['image'] = [this.fileToUpload.name, this.fileToUpload]
    console.log(this.userFormFields);
    this.userForm = this.fb.group(this.userFormFields);
  }


}
