import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = formBuilder.group({
      email: [],
      password: []
    });
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });
  }
  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    if (!this.loginForm.valid) return;
    const user = this.loginForm.value;
    this.authService.login(user).subscribe((res: any) => {
      localStorage.setItem('auth_token', res.token);
      window.location.href = "https://xpensi-client.espinosakev24.vercel.app/boards";
      // this.route.navigate(['boards']);
    }, error => {
      alert(error.error);
    })
  }
}
