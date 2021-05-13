import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCarouselThreeComponent } from './product-carousel-three.component';

describe('ProductCarouselThreeComponent', () => {
  let component: ProductCarouselThreeComponent;
  let fixture: ComponentFixture<ProductCarouselThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCarouselThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCarouselThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
