import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { IUserRegister } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  passwordMatching: boolean = true;
  registerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) {
    this.registerForm = formBuilder.group({
      first_name: [],
      last_name: [],
      email: [],
      password: [],
      confirm_password: []
    })
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', Validators.required]
    }, {
      validators: MustMatch('password', 'confirm_password')
    })
  }

  onSubmit() {
    if (!this.registerForm.valid) return;
    const formUser = this.registerForm.value;
    const newUser: IUserRegister = {
      first_name: formUser.first_name,
      last_name: formUser.last_name,
      email: formUser.email,
      password: formUser.password
    }
    this.auth.register(newUser).subscribe(res => {
      console.log('user registered!', res);
      window.location.href = `${environment.ClientURL}/authentication/login`;
    }, error => {
      alert(error.error);
    })
  }

}
// custom validator to check that two fields match
function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}