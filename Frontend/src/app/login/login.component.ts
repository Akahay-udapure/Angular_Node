import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import * as alertify from 'alertifyjs'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup; 

  constructor(
    private fb: FormBuilder,
    private _apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['',[Validators.required, Validators.pattern("[A-Za-z0-9]*@gmail.com")]],
      password:['',[Validators.required,Validators.pattern("[A-Za-z0-9@!_]{6,}")]]
    })
  }

  login(loginForm:any){
      this._apiService.loginUser(loginForm.value).subscribe(result =>{
          if (result.status == 400) {
            this.router.navigate(['/login']);
            alertify.error(result.message);
            loginForm.reset();
          } else {
            localStorage.setItem('token',  result.token);
            alertify.success(result.message);
            this.router.navigate(['/product']);
          }
      })
  }

}
