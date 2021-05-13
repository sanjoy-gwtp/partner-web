import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TokenService } from 'core-component';
import { UtilityService } from '../../shared/services/utility.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {
  loginForm: FormGroup;
  hide = true;
  loading = false;

  constructor(private formBuilder: FormBuilder, private tokenService: TokenService, private utilityService: UtilityService,
    public dialogRef: MatDialogRef<LoginDialogComponent>, private router: Router,
    @Inject(MAT_DIALOG_DATA) public returnUrl: any) {
    // console.log(returnUrl);
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      mobileNumber: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  doLogin(e: any) {
    e.preventDefault();
    // console.log(this.loginForm.value);
    this.loading = true;
    if (this.loginForm.value) {
      const mobileNumber = this.loginForm.value.mobileNumber;
      const password = this.loginForm.value.password;
      try {
        this.tokenService.login(mobileNumber, password).subscribe(data => {
          // console.log(data)
          this.dialogRef.close(data);
          this.router.navigate([this.returnUrl]);
        });
      }
      catch (err) {
        this.loading = false;
        console.log(err)
      }
    }
  }

  redirectToMyAccount(e) {
    e.preventDefault();
    if (this.dialogRef) {
      this.dialogRef.close(null);
    }
    this.router.navigate(['/my-account']);
  }

  redirectForgotPassword(e) {
    e.preventDefault();
    if (this.dialogRef) {
      this.dialogRef.close(null);
    }
    // this.router.navigate(['/forgot-password']);
    this.utilityService.openForgotPasswordModal();
  }

  public close(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }


}
