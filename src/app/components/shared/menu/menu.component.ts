import { Component, OnInit } from '@angular/core';
import { TokenStoreService } from 'core-component';
import { EnvironmentService } from 'src/app/services/environment.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

  constructor(public tokenStoreService: TokenStoreService, private environmentService: EnvironmentService) {
    this.tokenStoreService.retrieve();
  }

  ngOnInit() {
  }

  openMegaMenu() {
    let pane = document.getElementsByClassName('cdk-overlay-pane');
    [].forEach.call(pane, function (el) {
      if (el.children.length > 0) {
        if (el.children[0].classList.contains('mega-menu')) {
          el.classList.add('mega-menu-pane');
        }
      }
    });
  }

  redirectToPartnerSite() {
    window.open('http://dsell3.com/profile/', '_blank');
  }
}
