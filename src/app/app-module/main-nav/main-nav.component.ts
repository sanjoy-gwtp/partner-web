import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointState, Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { environment } from 'src/environments/environment';
import { TokenService } from 'core-component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  ngOnInit(): void {
  }

  title :String= 'Partner';
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
 
  constructor(private breakpointObserver: BreakpointObserver,
              private tokenService:TokenService,
              private router : Router) {}

  logout() {
    this.tokenService.logout().subscribe(data =>{
      this.router.navigate(['login']);
    });
  }

}
