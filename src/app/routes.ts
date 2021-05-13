import { Routes } from "@angular/router";
import { MainNavComponent } from './app-module/main-nav/main-nav.component';
import { HomeComponent } from './app-module/home/home.component';
import { LoginComponent } from 'core-component';
import { MainComponent } from "./components/main/main.component";
import { HomeThreeComponent } from "./components/home-three/home-three.component";
import { AboutUsComponent } from "./components/pages/about-us/about-us.component";
import { CartComponent } from "./components/pages/cart/cart.component";
import { CheckoutComponent } from "./components/pages/checkout/checkout.component";
import { ContactComponent } from "./components/pages/contact/contact.component";
import { WishlistComponent } from "./components/pages/wishlist/wishlist.component";
import { CompareComponent } from "./components/pages/compare/compare.component";
import { ErrorPageComponent } from "./components/pages/error-page/error-page.component";
import { MyAccountComponent } from "./components/pages/my-account/my-account.component";
import { ProductDetailsComponent } from "./components/products/product-details/product-details.component";
import { ProductLeftSidebarComponent } from "./components/products/product-left-sidebar/product-left-sidebar.component";
import { AuthGuardService } from "./components/shared/services/auth.guard";
import { ForgotPasswordComponent } from "./components/pages/forgot-password/forgot-password.component";
import { ChangePasswordComponent } from "./components/pages/change-password/change-password.component";
import { PaymentMethodComponent } from "./components/pages/payment-method/payment-method.component";
import { OrderTrackingComponent } from "./components/pages/order-tracking/order-tracking/order-tracking.component";
import { PrivacyPolicyComponent } from "./components/pages/privacy-policy/privacy-policy.component";
import { ReturnPolicyComponent } from "./components/pages/return-policy/return-policy.component";
import { TermsConditionsComponent } from "./components/pages/terms-conditions/terms-conditions.component";


export const appRoutes: Routes = [
  {
    path: '', component: HomeThreeComponent
  },
  {
    path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuardService]
  },
  {
    path: 'order-tracking', component: OrderTrackingComponent, canActivate: [AuthGuardService]
  },
  {
    path: '',
    children: [
      { path: 'about', component: AboutUsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuardService] },
      // { path: 'forgot-password', component: ForgotPasswordComponent },
      // { path: 'faq', component: FaqComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'compare', component: CompareComponent },
      { path: 'my-account', component: MyAccountComponent },
      { path: 'error', component: ErrorPageComponent },
      { path: 'payment-method', component: PaymentMethodComponent },
      { path: 'privacy-policy', component: PrivacyPolicyComponent },
      { path: 'return-policy', component: ReturnPolicyComponent },
      { path: 'terms-conditions', component: TermsConditionsComponent },
    ]
  },
  {
    path: 'product',
    children: [
      { path: ':id', component: ProductDetailsComponent },
    ]
  },
  {
    path: 'products/cat',
    children: [
      { path: ':catId', component: ProductLeftSidebarComponent },
    ]
  },
  {
    path: 'products',
    children: [
      { path: ':catId', component: ProductLeftSidebarComponent },
    ]
  },
  // {
  //   path: '',
  //   canActivate: [AuthGuard],
  //   component: MainNavComponent,
  //   children: [
  //     { path: '', component: HomeComponent },
  //     { path: 'dashboard', component: HomeComponent }
  //   ]
  // }
];

// export const appRoutes : Routes =[
//   { path: 'login', component: LoginComponent },
//   { path: '',canActivate:[AuthGuard],component: MainNavComponent,
//     children: [  
//       {path:'',component:DashboardComponent},
//       {path:'dashboard',component:DashboardComponent},
//       {path:'user',component:UserComponent},
//       {path:'role',component:RoleComponent},
//       {path:'right',component:RightComponent},
//       {path:'usersession',component:UserSessionComponent},
//       {path:'bank',component:BankComponent},
//       {path:'branch',component:BranchComponent},
//       {path:'module',component:ModuleComponent},
//       {path:'password-policy',component:PasswordPolicyComponent},
//       {path:'chating',component:ChatingComponent},
//       {path : '**',component : NotFoundComponent},]}

// ];

