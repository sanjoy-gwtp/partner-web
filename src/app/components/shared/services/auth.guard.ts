import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SecurityService, TokenStoreService } from 'core-component';
import { Observable } from 'rxjs';
import { UtilityService } from './utility.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private utilityService: UtilityService,
    private router: Router,
    private tokenStoreService: TokenStoreService,
    private securityService: SecurityService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return new Observable(observable => {
      // console.log(state.url);
      this.securityService.initAuthentication().subscribe(data => {
        if (data) {
          observable.next(data);
          observable.complete();
        } else {
          this.utilityService.openLoginModal(state.url);
          // return this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
          return false;
        }
      });
    });
  }

}
