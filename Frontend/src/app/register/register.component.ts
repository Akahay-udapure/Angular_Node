import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs'
import { ApiService } from '../services/api.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    successMessage: string = "";
    regForm!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private _apiService: ApiService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.regForm = this.fb.group({
            name: ['', [Validators.required]],
            mobile: ['', [Validators.required, Validators.min(1000000000), Validators.max(9999999999)]],
            email: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9]*@gmail.com")]],
            password: ['', [Validators.required]]
        })
    }

    register(regForm: any) {
        this._apiService.registerUser(regForm.value).subscribe(result => {
            if (result.status == 400) {
                alertify.error(result.message);
                regForm.reset();
            } else {
                localStorage.setItem('token', result.token);
                alertify.success(result.message);
                this.router.navigate(['/login']);
            }
        })
    }

}
