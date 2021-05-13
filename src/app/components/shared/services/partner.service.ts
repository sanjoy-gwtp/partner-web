import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'core-component';
import { Partner } from 'src/app/modals/partner.model';
import { rejects } from 'assert';



@Injectable({
    providedIn: 'root'
})
export class PartnerService {
    constructor(private httpClient: HttpClient, private apiService: ApiService) {
    }

    public savePartner(partner: Partner): any {
        return new Promise(resolve => {
            this.apiService.postPartnerCall("partner", partner).subscribe(
                data => {
                    resolve(data);
                });
        });
    }

    public getPartnerByMobileNumber(mobileNumber: any): any {
        return new Promise((resolve, reject) => {
            this.apiService.getPartnerCall(`partner/mobile?mobileNumber=${mobileNumber}`)
                .subscribe(data => {
                    if (data === null) {
                        data = {};
                        data.mobileNumber = mobileNumber;
                    }
                    resolve(data);
                }, err => {
                    console.log(err);
                    reject(err);
                },
                    () => {
                        // console.log('completed');
                    });
        });
    }

    public referenceExists(mobileNumber: any): any {
        return new Promise((resolve, reject) => {
            this.apiService.getPartnerCall(`reference-exist?mobileNumber=${mobileNumber}`)
                .subscribe(data => {
                    console.log(data);
                    if (data === null) {
                        data = {};
                        data.mobileNumber = mobileNumber;
                    }
                    resolve(data);
                }, err => {
                    console.log(err);
                    reject(err);
                },
                    () => {
                        // console.log('completed');
                    });
        });
    }


}

