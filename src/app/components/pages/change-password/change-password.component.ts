import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService, TokenService, TokenStoreService } from 'core-component';

export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  if (formGroup.get('newPassword').value === formGroup.get('newConfirmPassword').value)
    return null;
  else
    return { passwordMismatch: true };
};

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup;
  user_name: string;

  constructor(private formBuilder: FormBuilder, private tokenService: TokenService,
    private router: Router, private tokenStoreService: TokenStoreService, private toasterService: ToasterService) {
    this.createForm();
  }

  ngOnInit(): void {
    this.tokenStoreService.retrieve();
    this.user_name = this.tokenStoreService.token.user_name;
  }

  onInput(value: any) {
    if (this.changePasswordForm.hasError('passwordMismatch')) { // or some other test of the value
      this.changePasswordForm.get('newConfirmPassword').setErrors([{ 'passwordMismatch': true }]);
    } else {
      this.changePasswordForm.get('newConfirmPassword').setErrors(null);
    }
  }

  createForm() {
    this.changePasswordForm = this.formBuilder.group({
      // mobileNumber: [null, Validators.required],
      currentPassword: [null, Validators.required],
      newPassword: [null, Validators.required],
      newConfirmPassword: [null, Validators.required],
    }, { validator: passwordMatchValidator });
  }

  doChangePassword(e: any) {
    e.preventDefault();
    // console.log(this.changePasswordForm.value);
    if (this.changePasswordForm.value) {
      const data = {
        "username": this.user_name,
        "device": "web",
        "newValue": this.changePasswordForm.value.newPassword,
        "confirmNewValue": this.changePasswordForm.value.newConfirmPassword,
        "value": this.changePasswordForm.value.currentPassword
      };
      // console.log(data);
      this.tokenService.changePassword(data).subscribe((result) => {
        this.toasterService.openSnackBar(`Pasword changed successfully.`);
      });
    }
  }
}
