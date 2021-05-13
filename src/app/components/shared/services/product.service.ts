import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscriber, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product, ProductCategory } from 'src/app/modals/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { ApiService } from 'core-component';
import { promise } from 'protractor';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { resourceLimits } from 'worker_threads';



// Get product from Localstorage
let products = JSON.parse(localStorage.getItem("compareItem")) || [];

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public currency: string = 'Tk ';
  public catalogMode: boolean = false;

  private _url: string = "assets/data/";
  public url = "assets/data/banners.json";

  public compareProducts: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  public observer: Subscriber<{}>;

  constructor(private httpClient: HttpClient, private apiService: ApiService, public snackBar: MatSnackBar) {
    this.compareProducts.subscribe(products => products = products)
  }

  searchProduct(name: any): any {
    // console.log(name.length);
    if (name && name.length > 0) {
      return this.apiService.getPartnerCall(`product/search/${name}`);
    }
    else {
      return of();
    }
  }

  private products(): any {
    return new Promise(resolve => {
      this.apiService.getPartnerCall("product", { params: [] }).subscribe((response) => {
        // console.log('response', response);
        if (response) {
          resolve(response);
        }
      });
    });
    // return this.httpClient.get<Product[]>('assets/data/products2.json');
  }

  public banners(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.url);
  }

  // Get Banners
  public getBanners() {
    return this.banners();
  }

  // Get Banners
  public async getProducts(): Promise<Product[]> {
    const products = await this.products();
    return products;
  }


  // Get Products By Id
  public async getProduct(id: any): Promise<any> {
    return new Promise(resolve => {
      this.apiService.getPartnerCall(`product/${id}`).subscribe((response) => {
        // console.log('response', response);
        if (response) {
          resolve(response);
        }
      });

      // this.getProducts().then((prods: any) => {
      //   const prod = prods.find(f => f.id == id);
      //   if (prod) {
      //     resolve(prod);
      //   }
      // });
    });
  }


  /*
---------------------------------------------
----------  Compare Product  ----------------
---------------------------------------------
*/

  // Get Compare Products
  public getComapreProducts(): Observable<Product[]> {
    const itemsStream = new Observable(observer => {
      observer.next(products);
      observer.complete();
    });
    return <Observable<Product[]>>itemsStream;
  }

  // If item is aleready added In compare
  public hasProduct(product: Product): boolean {
    const item = products.find(item => item.id === product.id);
    return item !== undefined;
  }

  // Add to compare
  public addToCompare(product: Product): Product | boolean {
    let message, status;
    var item: Product | boolean = false;
    if (this.hasProduct(product)) {
      item = products.filter(item => item.id === product.id)[0];
      const index = products.indexOf(item);
      this.snackBar.open('The product  ' + product.name + ' already added to comparison list.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });

    } else {
      if (products.length < 4)
        products.push(product);
      message = 'The product ' + product.name + ' has been added to comparison list.';
      status = 'success';
      this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });

    }
    localStorage.setItem("compareItem", JSON.stringify(products));
    return item;
  }

  // Removed Product
  public removeFromCompare(product: Product) {
    if (product === undefined) { return; }
    const index = products.indexOf(product);
    products.splice(index, 1);
    localStorage.setItem("compareItem", JSON.stringify(products));
  }

  // Get Products By category
  public async getProductByCategory(categoryId: any): Promise<Product[]> {
    const products = await this.products();
    return new Promise(resolve => {
      const filtered_items = products.filter((item: Product) => {
        if (categoryId === '0')
          return item;
        else
          return item.category?.id == categoryId;
      })
      resolve(filtered_items);
    });
  }

}