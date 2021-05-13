import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'core-component';
import { ProductCategory } from 'src/app/modals/product.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.sass']
})
export class CategoriesComponent implements OnInit {

  categories: ProductCategory[];

  constructor(private router: Router,
    private apiService: ApiService) { }

  ngOnInit() {
    this.loadAllProductCategory();
  }

  loadAllProductCategory(): void {
    this.apiService.getPartnerCall("category", { params: [] }).subscribe((response: any) => {
      // console.log('response', response);
      this.categories = response;
    });
  }

}
