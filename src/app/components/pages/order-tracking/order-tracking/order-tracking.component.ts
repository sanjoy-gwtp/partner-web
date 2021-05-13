import { Component, OnInit } from '@angular/core';
import { TokenStoreService } from 'core-component';
import { OrderService } from 'src/app/components/shared/services/order.service';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { Order } from 'src/app/modals/order.model';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.css']
})
export class OrderTrackingComponent implements OnInit {
  orders: Order[];

  constructor(private tokenStoreService: TokenStoreService, private orderService: OrderService
    , public productsService: ProductService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    const mobile_number = this.tokenStoreService.token.user_name;
    if (mobile_number) { //'01777137055'
      this.orderService.getOrderByCustomer(mobile_number).then((data: any) => {
        console.log(data);
        if (data) {
          data.map((item: any) => {
            item.placeDateExt = new Date(item.placeDate)
          });
        }
        this.orders = data;
      });
    }
  }

}
