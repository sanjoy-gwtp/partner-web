import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'core-component';

@Injectable({
    providedIn: 'root'
})
export class TimeOTPService {
    constructor(private httpClient: HttpClient, private apiService: ApiService) {
    }

    public getOTP(mobileNumber: string) {
        return new Promise(resolve => {
            this.apiService.getPartnerCall(`twofa/pass?mobileNumber=${mobileNumber}`)
                .subscribe(data => {
                    resolve(data);
                });
        });
    }

    public verifyOTP(otp: string, secret: string): any {
        return new Promise(resolve => {
            this.apiService.getPartnerCall(`twofa/verify?otp=${otp}&secret=${secret}`)
                .subscribe(data => {
                    resolve(data);
                });
        });
    }

}

