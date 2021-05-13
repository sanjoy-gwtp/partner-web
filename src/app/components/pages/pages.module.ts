import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartComponent } from './cart/cart.component';
import { ContactComponent } from './contact/contact.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { CompareComponent } from './compare/compare.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyAccountComponent } from './my-account/my-account.component';
// import { FaqComponent } from './faq/faq.component';
import { AboutUsComponent } from './about-us/about-us.component';
// import { BlogModule } from '../blog/blog.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import { VerifyOtpComponent } from './my-account/verify-otp/verify-otp.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ConfirmationDialogComponent } from './my-account/confirmation-dialog/confirmation-dialog.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';
import { ForgotPasswordOtpComponent } from './forgot-password/forgot-password-otp/forgot-password-otp.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking/order-tracking.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ReturnPolicyComponent } from './return-policy/return-policy.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PagesRoutingModule,
  ],
  declarations: [
    CartComponent,
    ContactComponent,
    WishlistComponent,
    CompareComponent,
    CheckoutComponent,
    MyAccountComponent,
    VerifyOtpComponent,
    // FaqComponent,
    AboutUsComponent,
    ErrorPageComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
    ConfirmationDialogComponent,
    PaymentMethodComponent,
    ForgotPasswordOtpComponent,
    OrderTrackingComponent,
    PrivacyPolicyComponent,
    ReturnPolicyComponent,
    TermsConditionsComponent,
  ]
})
export class PagesModule { }
