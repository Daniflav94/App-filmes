import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { catchError, EMPTY, from, Observable } from 'rxjs';
import { GoogleAuthProvider} from 'firebase/auth';
import { NotificationService } from './notificacao.service';
import { User } from '../Interfaces/user';
import { ApiFilmesService } from './api-filmes.service';
import { Token } from '../Interfaces/token';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private firebaseAuth: AngularFireAuth,
    private notification: NotificationService,
    private apiTMDB: ApiFilmesService,
    private router: Router
  ) { }

  token!: Token

  public autenticarPeloGoogle(): Observable<any>{
    const provider = new GoogleAuthProvider()
    const promise = this.firebaseAuth.signInWithPopup(provider)
    return from(promise).pipe(
      catchError(error => {
        this.notification.showmessage("Erro ao autenticar com o Google!")
        console.error(error)
        return EMPTY
      })
    )
  }

  public autenticarPorEmaileSenha(user: User): Observable<any>{
    const { email, senha } = user;
    const promise = this.firebaseAuth.signInWithEmailAndPassword(email, senha)
    
    this.apiTMDB.autenticarUsuarioPorToken().subscribe(resposta => {
      this.token = resposta
      this.router.navigateByUrl('https://www.themoviedb.org/authenticate/' + this.token)
    })
    this.apiTMDB.createSession(this.token).subscribe(resposta => {
      this.notification.showmessage("Bem vindo!!")
    })
    
    return from(promise).pipe(
      catchError(error => {
        if(error.code == "auth/user-not-found"){
          this.notification.showmessage("Usuário não cadstrado!")
        }else if(error.code == "auth/wrong-password"){
          this.notification.showmessage("Senha incorreta!")
        }else{
          this.notification.showmessage("Erro ao autenticar!")
          console.error(error)
        }
        return EMPTY        
      })
    )
  }

  public criarUsuarioEmaileSenha(user: User): Observable<any>{
    const { email, senha } = user;
    const promise = this.firebaseAuth.createUserWithEmailAndPassword(email, senha)
    return from(promise).pipe(
      catchError(error => {
        this.notification.showmessage("Erro ao cadastrar usuário!")
        console.error(error)
        return EMPTY
      })
    )
  }

  public logout(){
    const promise = this.firebaseAuth.signOut()
    return from(promise)
  }

}
