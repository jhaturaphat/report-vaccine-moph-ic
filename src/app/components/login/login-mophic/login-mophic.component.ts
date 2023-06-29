import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { LoginMophicService } from 'src/app/services/login-mophic.service';

@Component({
  selector: 'app-login-mophic',
  templateUrl: './login-mophic.component.html',
  styleUrls: ['./login-mophic.component.css']
})
export class LoginMophicComponent {

  loginForm:FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private loginService:LoginMophicService
    ) {
    this.loginForm = this.formBuilder.group({
     username:['', Validators.required],
     password:['', Validators.required]
    });
  }
  
  public onSubmit(){
    this.loginService.login(this.loginForm.value.username, this.loginForm.value.password)
    .subscribe(result=>{
      console.log(result.error);      
    })
  }

  

}
