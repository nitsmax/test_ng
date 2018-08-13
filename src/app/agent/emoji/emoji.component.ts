import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray,Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UtilsService } from '../../services/utils.service';
import {EmojiService  } from '../../services/emoji.service';

@Component({
  selector: 'app-emoji',
  templateUrl: './emoji.component.html',
  styleUrls: ['./emoji.component.scss']
})
export class EmojiComponent implements OnInit {

  emoji: any;
  emojiForm: FormGroup;
  emojiFormFields: any;
  fileToUpload: File = null;
  @ViewChild('EmojiImage') EmojiImage;

  EmojiImageFile: File;

  emojiTypes;
  emojiTypesArray;
  paidFreeValues;
  paidFreeArray
  message;
  ImageUrl;

  constructor(
    public fb: FormBuilder,
    public coreService: UtilsService,
    public emojiService: EmojiService,
    private _activatedRoute: ActivatedRoute, private _router: Router) {


      this.emojiTypes = EmojiService.emojiTypes;
      this.emojiTypesArray = Object.keys(this.emojiTypes);
      this.paidFreeValues = EmojiService.paidFreeValues;
      this.paidFreeArray = Object.keys(this.paidFreeValues);

      
  }

  loadForm(){
    this.emojiFormFields = {
      '_id': [''],
      'name': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(1500)])],
      'category': ['', Validators.compose([Validators.required])],
      'tags': ['', Validators.compose([Validators.required])],
      'isPaid': ['', Validators.compose([Validators.required])],
      'Image': [null]
    };

    this.emojiForm = this.fb.group(this.emojiFormFields );
  }

  ngOnInit() {
    this.loadForm()

    this._activatedRoute.params.subscribe((params: Params) => {
      console.log("active agent reached " + params['emoji_id'])
    });


    this._activatedRoute.data
      .subscribe((data:{story:any}) => {
        console.log("selected emoji =>>")
        console.log(data.story)
        this.emoji = data.story;
        this.loadForm();
        this.coreService.setDataForm(this.emojiForm, this.emojiFormFields, this.emoji);
    });   

    if(this.emoji && this.emoji.image){
       this.ImageUrl = this.emoji.image;
    }



  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = (event) => {
       this.ImageUrl = event.target.result;
      };
    }
  }

  save() {
    const form = this.emojiForm.value;
    const Image = this.EmojiImage.nativeElement;
    if (Image.files && Image.files[0]) {
      this.EmojiImageFile = Image.files[0];
    }
    const ImageFile: File = this.EmojiImageFile;


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
    this.emojiService.saveEmoji(formData)
      .then(c => {
        this.message = 'Emoji created!';
        this._router.navigate(["/edit-emoji", c["_id"]])
    })
     
  }

  apiTrigger() {
    return this.emojiForm.value.apiTrigger;
  }
}
