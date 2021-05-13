import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToasterService, TokenService } from 'core-component';
import { PasswordService } from '../../shared/services/password.service';
import { ForgotPasswordOtpComponent } from './forgot-password-otp/forgot-password-otp.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private tokenService: TokenService,
    public dialogRef: MatDialogRef<ForgotPasswordComponent>, private toasterService: ToasterService,
    private router: Router, private passwordService: PasswordService, private dialog: MatDialog) {
    this.createForm();
  }

  ngOnInit(): void {
  }

  createForm() {
    this.forgotPasswordForm = this.formBuilder.group({
      mobileNumber: [null, Validators.required]
    });
  }

  doForgotPassword(e: any) {
    e.preventDefault();
    if (this.forgotPasswordForm.valid === false) return;
    const val = this.forgotPasswordForm.value;
    if (val) {
      this.passwordService.getOTP(val.mobileNumber).then((otp: any) => {
        // console.log(otp)
        this.close();
        if (otp && otp.secret) {
          this.openVerifyOTPDialog(otp.secret);
        }
      });
    }
  }

  public openVerifyOTPDialog(secret: any) {
    let dialogRef = this.dialog.open(ForgotPasswordOtpComponent, {
      data: secret,
      panelClass: 'product-dialog',
      disableClose: true,
      autoFocus: true
    });
    dialogRef.afterClosed().subscribe(status => {
      if (status) {
        this.toasterService.openSnackBar('Password have been reset successfully. The system is sent new password to your mobile.');
      }
    });
  }

  public close(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

}
