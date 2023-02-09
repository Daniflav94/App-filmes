import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { NotificationService } from '../Services/notificacao.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private autenticacao: AngularFireAuth,
    private notificacao: NotificationService,
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.autenticacao.authState.pipe(
      map(user => {
        if(user){
          return true
        }else{
          this.notificacao.showmessage("Não foi possível acessar essa página, login necessário!")
          this.router.navigate(["/login"])
          return false
        }
      })
    );
  }
  
}
