import { Injectable, ɵbypassSanitizationTrustResourceUrl } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginDialogComponent } from '../../login/login-dialog/login-dialog.component';
import { ForgotPasswordComponent } from '../../pages/forgot-password/forgot-password.component';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {
    constructor(private dialog: MatDialog) {
    }

    public openLoginModal(returnUrl: string = '/') {
        let dialogRef = this.dialog.open(LoginDialogComponent, {
            data: returnUrl,
            panelClass: 'product-dialog',
            height: '350px',
            width: '335px',
            disableClose: true,
            autoFocus: true
        });

        dialogRef.afterClosed().subscribe(status => {
            // console.log(status);
            if (status) {
            }
        });
    }

    public openForgotPasswordModal(returnUrl: string = '/') {
        let dialogRef = this.dialog.open(ForgotPasswordComponent, {
            data: returnUrl,
            panelClass: 'product-dialog',
            height: '200px',
            width: '400px',
            disableClose: true,
            autoFocus: true
        });

        dialogRef.afterClosed().subscribe(status => {
            // console.log(status);
            if (status) {
            }
        });
    }

}

