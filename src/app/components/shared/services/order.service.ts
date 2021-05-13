import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'core-component';
import { Partner } from 'src/app/modals/partner.model';
import { Order } from 'src/app/modals/order.model';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    constructor(private httpClient: HttpClient, private apiService: ApiService) {
    }

    public saveOrder(order: Order): any {
        return new Promise(resolve => {
            this.apiService.postPartnerCall("order", order).subscribe(
                data => {
                    resolve(data);
                });
        });
    }


    getOrderByCustomer(mobileNumber: string) {
        return new Promise(resolve => {
            this.apiService.getPartnerCall(`order/list/${mobileNumber}`).subscribe(
                data => {
                    resolve(data);
                });
        });
    }


}

