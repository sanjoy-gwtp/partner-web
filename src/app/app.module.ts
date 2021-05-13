import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreComponentModule } from 'core-component'
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { HttpClientModule } from '@angular/common/http';
import { EnvironmentService } from './services/environment.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './app-module/home/home.component';
import { MainNavComponent } from './app-module/main-nav/main-nav.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxImgZoomModule } from 'ngx-img-zoom';

import { ProductVerticalComponent } from './components/products/product-vertical/product-vertical.component';
import { ProductCarouselThreeComponent } from './components/products/product-carousel-three/product-carousel-three.component';


import { CategoriesComponent } from './components/widgets/categories/categories.component';
import { MainCarouselComponent } from './components/main-carousel/main-carousel.component';
import { HomeThreeComponent } from './components/home-three/home-three.component';
import { ProductDialogComponent } from './components/products/product-dialog/product-dialog.component';

import { SwiperModule } from 'ngx-swiper-wrapper';
import { SharedModule } from './components/shared/shared.module';

import { MainComponent } from './components/main/main.component';

import { PagesModule } from './components/pages/pages.module';
import { ProductDetailsComponent } from './components/products/product-details/product-details.component';
import { ProductZoomComponent } from './components/products/product-details/product-zoom/product-zoom.component';
import { ProductLeftSidebarComponent } from './components/products/product-left-sidebar/product-left-sidebar.component';
import { ProductComponent } from './components/products/product/product.component';
import { PriceComponent } from './components/products/price/price.component';
import { LoginDialogComponent } from './components/login/login-dialog/login-dialog.component';
import { LogoutDialogComponent } from './components/logout-dialog/logout-dialog.component';
import { AuthGuardService } from './components/shared/services/auth.guard';
// import { ChangePasswordComponent } from './components/pages/change-password/change-password.component';


@NgModule({
  declarations: [
    CategoriesComponent,
    ProductVerticalComponent,
    ProductCarouselThreeComponent,
    ProductZoomComponent,
    ProductDetailsComponent,
    ProductDialogComponent,
    ProductLeftSidebarComponent,
    ProductComponent,
    PriceComponent,
    HomeComponent,
    MainCarouselComponent,
    AppComponent,
    MainNavComponent,
    MainComponent,
    HomeThreeComponent,
    LoginDialogComponent,
    LogoutDialogComponent,
    // ChangePasswordComponent
  ],
  imports: [
    CoreComponentModule,
    NgxSpinnerModule,
    BrowserModule,
    SharedModule,
    SwiperModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatExpansionModule,
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTabsModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatTableModule,
    MatSelectModule,
    MatTooltipModule,
    ReactiveFormsModule,
    NgxImgZoomModule,
    PagesModule,
    NgxPaginationModule,
  ],
  exports: [
    // CommonModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatListModule,
    MatExpansionModule,
    MatMenuModule,
    MatTableModule,
    // MatSliderModule,
    // MatRadioModule,
    MatDialogModule,
    // MatChipsModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatSelectModule,
    MatTabsModule,
    // MatDividerModule,
    MatCardModule,
    // OrderByPipe,
    // HeaderComponent,
    // FooterComponent,
    // MenuComponent,
    // SidebarComponent,
    // BannersComponent,
    // FlexLayoutModule,
    // HeaderTwoComponent,
    // HeaderThreeComponent,
    // HeaderFourComponent,
    // ShoppingWidgetsComponent,
    // BannersFourComponent,
    // BlogSectionComponent,
    // BannerPromotionComponent,
    // CategoriesMenuComponent,
    // CategoriesSectionComponent,
    // FooterTwoComponent,
    // HeaderFiveComponent,
    // HeaderSixComponent,
    // ShoppingWidgetsThreeComponent,
    // HeaderSevenComponent
  ],
  providers: [
    AuthGuardService,
    { provide: 'environmentInterface', useClass: EnvironmentService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
