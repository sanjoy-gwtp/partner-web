import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PasswordService } from 'src/app/components/shared/services/password.service';

@Component({
  selector: 'app-forgot-password-otp',
  templateUrl: './forgot-password-otp.component.html',
  styleUrls: ['./forgot-password-otp.component.css']
})
export class ForgotPasswordOtpComponent implements OnInit {
  otp: string;

  constructor(private passwordService: PasswordService, public dialogRef: MatDialogRef<ForgotPasswordOtpComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public secret: any) { }

  ngOnInit(): void {
  }

  verifyOpt() {
    this.passwordService.verifyForgotOTP(this.otp, this.secret).then(otp => {
      if (otp && otp.status) {
        this.dialogRef.close(otp.status);
      }
    });
  }

  public close(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

}
