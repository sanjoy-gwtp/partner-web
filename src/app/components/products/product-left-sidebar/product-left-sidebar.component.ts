import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/components/shared/services/product.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Product, ColorFilter } from 'src/app/modals/product.model';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-product-left-sidebar',
  templateUrl: './product-left-sidebar.component.html',
  styleUrls: ['./product-left-sidebar.component.sass']
})
export class ProductLeftSidebarComponent implements OnInit {
  public sidenavOpen: boolean = true;
  public animation: any;   // Animation
  public sortByOrder: string = '';   // sorting
  public page: any;
  public tagsFilters: any[] = [];
  public viewType: string = 'grid';
  public viewCol: number = 25;
  public filterForm: FormGroup;
  public colorFilters: ColorFilter[] = [];

  public items: Product[] = [];
  public allItems: Product[] = [];
  public products: Product[] = [];
  public tags: any[] = [];
  public colors: any[] = [];

  searchText: string;

  constructor(private productService: ProductService
    , private route: ActivatedRoute
    , private spinner: NgxSpinnerService) {
    this.route.params.subscribe(
      (params: Params) => {
        this.spinner.show();
        const categoryId = params['catId'];
        this.productService.getProductByCategory(categoryId).then(products => {
          // console.log(products);
          this.allItems = products;
          this.products = products.slice(0.8);
          this.getTags(products);
          this.getColors(products);
          this.spinner.hide();
        })
      }
    )
  }

  // Get current product tags
  public getTags(products: any) {
    var uniqueBrands = []
    var itemBrand = Array();
    products.map((product, index) => {
      if (product.tags) {
        product.tags.map((tag) => {
          const index = uniqueBrands.indexOf(tag);
          if (index === -1) uniqueBrands.push(tag);
        })
      }
    });
    for (var i = 0; i < uniqueBrands.length; i++) {
      itemBrand.push({ brand: uniqueBrands[i] })
    }
    this.tags = itemBrand
  }

  // Get current product colors
  public getColors(products: any) {
    var uniqueColors = []
    var itemColor = Array();
    products.map((product, index) => {
      if (product.colors) {
        product.colors.map((color) => {
          const index = uniqueColors.indexOf(color);
          if (index === -1) uniqueColors.push(color);
        })
      }
    });
    for (var i = 0; i < uniqueColors.length; i++) {
      itemColor.push({ color: uniqueColors[i] })
    }
    this.colors = itemColor
  }

  ngOnInit() {

  }

  public changeViewType(viewType: any, viewCol: any) {
    this.viewType = viewType;
    this.viewCol = viewCol;
  }

  // Animation Effect fadeIn
  public fadeIn() {
    this.animation = 'fadeIn';
  }

  // Animation Effect fadeOut
  public fadeOut() {
    this.animation = 'fadeOut';
  }

  // Update tags filter
  public updateTagFilters(tags: any[]) {
    this.tagsFilters = tags;
    this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
  }

  // sorting type ASC / DESC / A-Z / Z-A etc.
  public onChangeSorting(val) {
    this.sortByOrder = val;
    this.animation == 'fadeOut' ? this.fadeIn() : this.fadeOut(); // animation
  }

  // Initialize filetr Items
  public filterItems(): Product[] {
    return null;
    // return this.items.filter((item: Product) => {
    //   const Colors: boolean = this.colorFilters.reduce((prev, curr) => { // Match Color
    //     if (item.colors) {
    //       if (item.colors.includes(curr.color)) {
    //         return prev && true;
    //       }
    //     }
    //   }, true);
    //   const Tags: boolean = this.tagsFilters.reduce((prev, curr) => { // Match Tags
    //     if (item.tags) {
    //       if (item.tags.includes(curr)) {
    //         return prev && true;
    //       }
    //     }
    //   }, true);
    //   return Colors && Tags; // return true
    // });
  }

  searchProduct() {
    // console.log(this.searchText);
    // console.log(this.products);
    this.allItems = this.products.filter((item: Product) => {
      // console.log(item);
      return item.name.toLocaleLowerCase().startsWith(this.searchText.toLocaleLowerCase());
    });
  }

  public onPageChanged(event: any) {
    this.page = event;
    this.allItems;
    window.scrollTo(0, 0);
  }

  // Update price filter
  public updatePriceFilters(price: any) {
    // console.log(price);
    // console.log(this.products);

    this.allItems = this.products.filter((item: Product) => {
      return item.price >= price.priceFrom && item.price <= price.priceTo
    });
    // console.log(this.products);
  }

  onBrendsChanged(newBrend: any) {
    // console.log(newBrend);
    this.allItems = newBrend === 'all' ? this.products : this.products.filter(
      item => item.brand === newBrend
    )
    // console.log(this.allItems);
  }

}
