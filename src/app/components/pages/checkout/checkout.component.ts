import { Component, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { Observable, of } from 'rxjs';
import { CartItem } from 'src/app/modals/cart-item';
import { ProductService } from '../../shared/services/product.service';
import { PartnerService } from '../../shared/services/partner.service';
import { ToasterService, TokenStoreService } from 'core-component';
import { OrderService } from '../../shared/services/order.service';
import { DeliveryAddress, Order } from 'src/app/modals/order.model';
import { Product } from 'src/app/modals/product.model';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.sass']
})
export class CheckoutComponent implements OnInit {

  public cartItems: Observable<CartItem[]> = of([]);
  public buyProducts: CartItem[] = [];

  deliveryAddress: DeliveryAddress = {
    id: null, address: null, city: null, company: null, country: null,
    email: null, firstName: null, lastName: null, phoneNumber: null, postalCode: null
  };

  amount: number;
  billingAreaType: any[] = [
    { id: 1, name: 'Inside Dhaka & Narayanganj' },
    { id: 2, name: 'Outside Dhaka & Narayanganj' }
  ];
  DEFAULT_INSIDE_DHAKA_RPICE: number = 80;
  DEFAULT_OUTSIDE_DHAKA_RPICE: number = 130;
  billingPrice: number = this.DEFAULT_INSIDE_DHAKA_RPICE;

  payments: string[] = ['Create an Account?', 'Flat Rate'];
  paymantWay: string[] = ['Direct Bank Transfer', 'PayPal'];
  checkOutForm: FormGroup;

  constructor(private cartService: CartService, public productService: ProductService,
    private partnerService: PartnerService, private orderService: OrderService,
    private tokenStoreService: TokenStoreService, private toasterService: ToasterService,
    private router: Router, private formBuilder: FormBuilder) {
    this.createForm();
  }


  createForm() {
    this.checkOutForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: ['', [Validators.required]],
      address: [null, Validators.required],
      country: [null, Validators.required],
      postalCode: [null, Validators.required],
      phoneNumber: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.cartItems = this.cartService.getItems();
    this.cartItems.subscribe(products => this.buyProducts = products);
    this.getSubTotal().subscribe(amount => this.amount = amount);
  }

  public getSubTotal(): Observable<number> {
    return this.cartService.getTotalAmount();
  }

  public getTotal(): number {
    return this.amount + this.billingPrice;
  }

  saveOrder(partnerData: any) {
    // console.log(this.getTotal())
    const accountBalance = partnerData.accountBalance;
    const purchaseBalance = partnerData.purchaseBalance;
    if ((accountBalance + purchaseBalance) >= this.getTotal()) {
      // if (true) {
      const order = new Order();
      order.customer = partnerData.mobileNumber;
      order.salesPrice = this.getTotal();
      order.deliveryAddress = this.deliveryAddress;
      this.cartItems.subscribe((products: any) => {
        // console.log(products);
        if (products && products.length > 0) {
          products.forEach(product => {
            order.items.push({
              "productId": product.product.id,
              "productName": product.product.name,
              "quantity": product.quantity,
              "price": product.product.price
            });
          });
        }
      });
      // console.log(order);
      if (order && order.items && order.items.length === 0) {
        this.toasterService.openSnackBar('Please select item(s) to purchase.');
        return;
      }
      this.orderService.saveOrder(order).then((orderStatus: any) => {
        // console.log('Account Balance is available', orderStatus);
        this.buyProducts.length = 0;
        this.cartService.removeAllFromCart();
        this.toasterService.openSnackBar('Order is submitted successfully.');
        this.router.navigate(['/']);
      });
    }
    else {
      // console.log('Account Balance is not sufficient');
      this.toasterService.openSnackBar('Balance is not sufficient.');
    }
  }

  doPlaceOrder(e: any) {
    e.preventDefault();
    const mobile_number = this.tokenStoreService.token.user_name;
    this.partnerService.getPartnerByMobileNumber(mobile_number).then((partnerData: any) => {
      // console.log(partnerData);
      if (partnerData) {
        this.saveOrder(partnerData);
      }
    });
  }

  billingTypeChange(e: any) {
    if (e.value === 1) {
      this.billingPrice = this.DEFAULT_INSIDE_DHAKA_RPICE;
    }
    else {
      this.billingPrice = this.DEFAULT_OUTSIDE_DHAKA_RPICE;
    }
  }

}
