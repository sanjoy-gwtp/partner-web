import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'core-component';

@Injectable({
    providedIn: 'root'
})
export class PasswordService {
    constructor(private httpClient: HttpClient, private apiService: ApiService) {
    }

    public getOTP(mobileNumber: string) {
        return new Promise(resolve => {
            this.apiService.getPartnerCall(`password/otp?mobileNumber=${mobileNumber}`)
                .subscribe(data => {
                    resolve(data);
                });
        });
    }

    public verifyForgotOTP(otp: string, secret: string): any {
        return new Promise(resolve => {
            this.apiService.getPartnerCall(`password/forgot?otp=${otp}&secret=${secret}`)
                .subscribe(data => {
                    resolve(data);
                });
        });
    }

}

