import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { CommonService } from '../../../services/common.service';
// import 'ngx-toastr/toastr.css';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginForm!:FormGroup;
  isSubmitted = false;
  returnUrl = '';
  constructor(private formBuilder: FormBuilder
    , private userService:UserService,
     private activatedRoute:ActivatedRoute,
     private router:Router,
     private commonService: CommonService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required,Validators.email]],
      password:['', Validators.required]
    });

    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;
  }

  get fc(){
    return this.loginForm.controls;
  }

  submit(){
    this.isSubmitted = true;
    if(this.loginForm.invalid) return;

    this.userService.login({email:this.fc.email.value,
       password: this.fc.password.value}).subscribe((data) => {
         this.commonService.showToast({
          severity: 'success',
          summary: 'Login Successful',
          detail: `welcome ${data.name}`
         })
         this.router.navigateByUrl(this.returnUrl);
       },(error)=>{
          this.commonService.showToast({
            severity: 'error',
            summary: 'Login Failed',
            detail: error.error.message
          })
       });
  }

}
