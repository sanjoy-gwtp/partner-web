import { Component, OnInit, Input } from '@angular/core';
import { SwiperConfigInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-main-carousel',
  templateUrl: './main-carousel.component.html',
  styleUrls: ['./main-carousel.component.sass']
})
export class MainCarouselComponent implements OnInit {

  @Input('slides') slides: Array<any> = [];

  public config: SwiperConfigInterface = {};

  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true
  };

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.config = {
      slidesPerView: 1,
      spaceBetween: 0,
      initialSlide: 0,
      keyboard: true,
      navigation: true,
      loop: false,
      observer: true,
      pagination: this.pagination,
      grabCursor: true,
      preloadImages: false,
      lazy: {
        loadPrevNext: true,
        loadPrevNextAmount: 1,
        loadOnTransitionStart: true
      },
      autoplay: {
        delay: 2000,
        disableOnInteraction: false
      },
      speed: 500,
      effect: "slide"
      // slidesPerView: 10,
      // spaceBetween: 0,
      // initialSlide: 5,
      // keyboard: true,
      // navigation: true,
      // pagination: this.pagination,
      // grabCursor: true,
      // loop: false,
      // preloadImages: false,
      // lazy: true,
      // autoplay: {
      //   delay: 6000,
      //   disableOnInteraction: false
      // },
      // speed: 500,
      // effect: "slide"
    }
  }




}
