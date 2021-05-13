import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TokenService, TokenStoreService } from 'core-component';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.css']
})
export class LogoutDialogComponent implements OnInit {
  loggedInUserName: string;
  @Output() onNotifyLogout = new EventEmitter<any>();

  constructor(private tokenStoreService: TokenStoreService, private tokenService: TokenService) {
    this.tokenStoreService.retrieve();
    this.loggedInUserName = this.tokenStoreService.token.firstName;

  }

  ngOnInit(): void {
  }

  doLogout() {
    this.tokenService.logout().subscribe(data => {
      // console.log(data);
      this.onNotifyLogout.emit(true);
    });
  }

}
