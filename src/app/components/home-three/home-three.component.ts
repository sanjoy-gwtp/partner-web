import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { CartItem } from 'src/app/modals/cart-item';
import { ProductService } from '../shared/services/product.service';
import { CartService } from '../shared/services/cart.service';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-home-three',
  templateUrl: './home-three.component.html',
  styleUrls: ['./home-three.component.sass']
})
export class HomeThreeComponent implements OnInit {
  products: Product[];
  public banners = [];

  shoppingCartItems: CartItem[] = [];
  wishlistItems: Product[] = [];

  public featuredProducts: Array<Product>;
  public onSaleProducts: Array<Product>;
  public topRatedProducts: Array<Product>;
  public newArrivalsProducts: Array<Product>;

  public slides = [
    // { title: 'Huge sale', subtitle: 'Up to 70%', image: 'assets/images/carousel/banner1.jpg' },
    // { title: 'Biggest discount', subtitle: 'Check the promotion', image: 'assets/images/carousel/banner2.jpg' },
    // { title: 'Biggest sale', subtitle: 'Dont miss it', image: 'assets/images/carousel/banner3.jpg' },
    // { title: 'Our best products', subtitle: 'Special selection', image: 'assets/images/carousel/banner4.jpg' },
    // { title: 'Massive sale', subtitle: 'Only for today', image: 'assets/images/carousel/banner5.jpg' }
  ];

  // Collection banner
  public discount = [
    // {
    //   image: 'assets/images/product/tablet_bn.png',
    //   title: 'Tablets, Smartphones and more',
    //   subtitle: 'Sale up to 30%',
    // }, {
    //   image: 'assets/images/product/camera_bn.png',
    //   title: 'New Cameras Collection',
    //   subtitle: 'Sale up to 30%',
    // }
  ];

  base64StrSmall: string = '';
  base64StrBig: string = '';

  constructor(private productService: ProductService, private cartService: CartService) {
    // console.log(33);
  }

  ngOnInit() {
    this.cartService.getItems().subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
    this.productService.getProducts().then(data => {
      if (data) {
        this.makeSlidesForFiveProducts(data);

        this.makeDiscountProducts(data);

        const salesProduct = data.filter(item => item.sale === true);
        this.products = salesProduct.map(item => (
          {
            ...item,
            base64StrSmall: (item.pictures != null && item.pictures.length > 0) ? `data:${item.pictures[0].smallImageType};base64,${item.pictures[0].small}` : '',
            base64StrBig: (item.pictures != null && item.pictures.length > 0) ? `data:${item.pictures[0].bigImageType};base64,${item.pictures[0]?.big}` : ''
          }
        ));
      }
    });
  }

  makeSlidesForFiveProducts(data: any) {
    const newProduct = data.filter(item => item.newPro).slice(0, 5);
    this.slides = newProduct.map(item => (
      {
        id: item.id,
        title: item.name,
        subtitle: item.brand,
        image: (item.pictures != null && item.pictures.length > 0) ? `data:${item.pictures[0].bigImageType};base64,${item.pictures[0]?.big}` : ''
      }
    ));
    // console.log(this.slides);
  }

  makeDiscountProducts(data: any) {
    const newSalesProduct = data.filter(item => item.newPro === true && item.sale === true).slice(0, 2);
    this.discount = newSalesProduct.map(item => (
      {
        id: item.id,
        title: item.name,
        subtitle: item.brand,
        image: (item.pictures != null && item.pictures.length > 0) ? `data:${item.pictures[0].smallImageType};base64,${item.pictures[0].small}` : '',
      }
    ));
    // console.log(this.discount);
  }


}
