import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'core-component';
import { Partner } from 'src/app/modals/partner.model';
import { PartnerService } from '../../shared/services/partner.service';
import { TimeOTPService } from '../../shared/services/time.otp.service';
import { UtilityService } from '../../shared/services/utility.service';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';

export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
  if (formGroup.get('password').value === formGroup.get('confirmPassword').value)
    return null;
  else
    return { passwordMismatch: true };
};

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.sass']
})
export class MyAccountComponent implements OnInit {
  partner: Partner = new Partner();
  id: string;
  protected addingNew: boolean = false;
  createAccountForm: FormGroup;
  hide = true;
  hide_confirm = true;
  isDisable: boolean = false;

  constructor(public partnerService: PartnerService, private timeOTPService: TimeOTPService, private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute, private dialog: MatDialog, public snackBar: MatSnackBar,
    private utilityService: UtilityService, private router: Router) {
    this.createForm();
  }

  createForm() {
    this.createAccountForm = this.formBuilder.group({
      mobileNumber: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      password: [null, Validators.required],
      confirmPassword: ['', [Validators.required]],
      customerName: [null, Validators.required],
      dealerArea: [null, Validators.required],
      dealerCode: [null, Validators.required],
      email: [null, Validators.required],
      referenceNumber: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    }, { validator: passwordMatchValidator });
  }

  onInput(value: any) {
    if (this.createAccountForm.hasError('passwordMismatch')) { // or some other test of the value
      this.createAccountForm.get('confirmPassword').setErrors([{ 'passwordMismatch': true }]);
    } else {
      this.createAccountForm.get('confirmPassword').setErrors(null);
    }
  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
    }
    else {
      this.addingNew = true;
    }
  }

  registerPartner(partner: Partner) {
    // console.log(this.createAccountForm.valid);
    if (this.createAccountForm.valid === false) return;
    const checkMobileNo = this.partnerService.getPartnerByMobileNumber(partner.mobileNumber);
    const checkRefMobileNo = this.partnerService.getPartnerByMobileNumber(partner.referenceNumber);
    Promise.all([checkMobileNo, checkRefMobileNo])
      .then((result: any) => {
        let status: boolean = true;
        const filterByMobNo = result.find(item => item.mobileNumber === partner.mobileNumber);
        if (filterByMobNo && filterByMobNo.partnerStatus != undefined) {
          status = status && false;
          this.createAccountForm.controls['mobileNumber'].setErrors({ 'alreadyExists': true });
        }
        const filterByRefNo = result.find(item => item.mobileNumber === partner.referenceNumber);
        if (filterByRefNo && filterByRefNo.partnerStatus === undefined) {
          status = status && false;
          this.createAccountForm.controls['referenceNumber'].setErrors({ 'refNumberNoExists': true });
        }
        else if (filterByRefNo && filterByRefNo.partnerStatus === "INACTIVE") {
          status = status && false;
          this.createAccountForm.controls['referenceNumber'].setErrors({ 'refNumberInactive': true });
        }
        if (status) {
          this.timeOTPService.getOTP(partner.mobileNumber).then((otp: any) => {
            if (otp && otp.secret) {
              this.openVerifyOTPDialog(otp.secret);
            }
          });
        }
      }).catch(er => {
        console.log(er);
      });
  }

  savePartner(partner: Partner) {
    // console.log(this.productForm.valid);
    if (this.addingNew) {
      partner.id = 0;
    }
    // console.log(partner);
    partner.partnerStatus = "INACTIVE";
    this.partnerService.savePartner(partner).then(data => {
      // console.log(data);
      this.openConfirmationDialog(data);
    });
  }

  openConfirmationDialog(data: any) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: data,
      panelClass: 'product-dialog',
      disableClose: true,
      autoFocus: true
    });
    dialogRef.afterClosed().subscribe(status => {
      if (status && status === 'Yes') {
        this.utilityService.openLoginModal();
      }
      else {
        this.router.navigate(['/']);
      }
    });
  }

  public openVerifyOTPDialog(secret: any) {
    let dialogRef = this.dialog.open(VerifyOtpComponent, {
      data: secret,
      panelClass: 'product-dialog',
      disableClose: true,
      autoFocus: true
    });
    dialogRef.afterClosed().subscribe(status => {
      if (status) {
        this.savePartner(this.partner);
      }
    });
  }

}
