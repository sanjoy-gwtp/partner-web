import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TimeOTPService } from 'src/app/components/shared/services/time.otp.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOtpComponent implements OnInit {
  otp: string;

  constructor(private timeOTPService: TimeOTPService, public dialogRef: MatDialogRef<VerifyOtpComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public secret: any) { }

  ngOnInit(): void {
    // console.log(this.secret);
  }

  verifyOpt() {
    this.timeOTPService.verifyOTP(this.otp, this.secret).then(otp => {
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
