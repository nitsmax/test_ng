import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  
  fileToUpload: File = null;
  config_form =  this.fb.group({
    "confidence_threshold":[]
  });

  constructor(public fb: FormBuilder,private utilsService:UtilsService) { }

  code = `
  
  <script type="text/javascript">
  !function(win,doc){"use strict";var script_loader=()=>{try
  {var head=doc.head||doc.getElementsByTagName("head")[0],script=doc.createElement("script");script.setAttribute("type","text/javascript"),script.setAttribute("src",win.iky_base_url+"assets/widget/iky_widget.js"),head.appendChild(script)}
  catch(e){}};win.chat_context={"username":"John"},win.iky_base_url="http://localhost:8080/",script_loader()}(window,document);
  </script>
  `
  ngOnInit() {
    
  }

  threshold_value_changed(){
    this.save_config()
  }
  save_config(){
    console.log(this.config_form.value)
  }

  export(){
    //window.open(environment.ikyBackend+"intents/export","_blank")
  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

uploadFileToActivity() {
  this.utilsService.displayLoader(true)
}

}
