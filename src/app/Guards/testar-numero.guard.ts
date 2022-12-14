import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestarNumeroGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     //saber se o id informado é um num ou nao, se for pode seguir
    

     const idProduto = route.paramMap.get('idProduto') //recuperar o parametro que guarda o valor do id
      
     if(isNaN(Number(idProduto))){
       return false
     }else {
       return true
     }
  }
  
}