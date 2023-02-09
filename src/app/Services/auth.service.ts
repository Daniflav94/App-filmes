import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { catchError, EMPTY, from, map, Observable, tap } from 'rxjs';
import { GoogleAuthProvider, getAuth, updateProfile } from 'firebase/auth';
import { NotificationService } from './notificacao.service';
import { User } from '../Interfaces/user';
import { ApiFilmesService } from './api-filmes.service';
import { Token } from '../Interfaces/token';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Usuario } from '../Interfaces/usuario';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private firebaseAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private notification: NotificationService,
    private apiTMDB: ApiFilmesService,
    private router: Router
  ) { }


  public autenticarPeloGoogle(): Observable<any> {
    const provider = new GoogleAuthProvider()
    const promise = this.firebaseAuth.signInWithPopup(provider)
    const auth = getAuth();
    const user = auth.currentUser;
    if (user != null) {
      const usuario= {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uid: user.uid
      }
      let usuarioJaExiste: boolean = false
      this.listarUsuarios().subscribe(listaUsuarios => {
        listaUsuarios.map((usuario: User) => {
          if (usuario.email == user?.email) {
            usuarioJaExiste = true
          }
        })
        if (usuarioJaExiste == false) {
          this.salvarUsuario(usuario)
        }
      })
    }
    /*  if(this.token.request_token != ''){
       this.apiTMDB.createSession(this.token).subscribe(resposta => {
         localStorage.setItem('session', resposta.session_id)
         this.notification.showmessage("Bem vindo(a)!")   
       })
     }else{
       this.apiTMDB.autenticarUsuarioPorToken().subscribe(resposta => {
         this.token = resposta
         window.open('https://www.themoviedb.org/authenticate/' + this.token.request_token)
         localStorage.setItem('token', this.token.request_token)
         
       })
     } */

    return from(promise).pipe(
      catchError(error => {
        this.notification.showmessage("Erro ao autenticar com o Google!")
        console.error(error)
        return EMPTY
      })
    )
  }

  public salvarUsuario(usuario: Usuario): Observable<any> {
    const promise = this.firestore.collection('users').add({
      uidUser:localStorage.getItem('uidUser'),
        ...usuario
    })
    return from(promise).pipe(
      catchError(error => {
        console.error(error)
        this.notification.showmessage("Erro ao salvar usuário")
        return EMPTY
      })
    )
  }

  public listarUsuarios(): Observable<any> {
    const uidUser = localStorage.getItem('uidUser')
    const promise = this.firestore.collection('users').get()
    return from(promise).pipe(
      map(resposta => {
        return resposta.docs.map(doc => {
          const user: User = doc.data() as User
          user.uid = doc.id
          return user
        })
      }),
      catchError(error => {
        console.error(error)
        this.notification.showmessage("Erro ao listar usuários")
        return EMPTY
      })
    )
  }

  public getUser(uid: string): Observable<any>{
    const promise = this.firestore.collection('users').doc(uid).get()
    return from(promise).pipe(
      map(doc => {
        const user: User = doc.data() as User
        return user
      }),
      catchError(error => {
        this.notification.showmessage("Erro ao buscar dados de usuário")
        console.error(error)
        return EMPTY
      })
    )
  }

  public getCurrentUser() {
    return from(this.firebaseAuth.currentUser)
  }

  public editarUsuario(user: any){
    const promise = this.firestore.collection('users').doc(user.uid).update(user)
    return from(promise).pipe(
      catchError(() => {
        this.notification.showmessage("Erro ao editar.")
        return EMPTY;
      })
      )
  }

  public autenticarPorEmaileSenha(user: User): Observable<any> {
    const auth = getAuth();
    const user2 = auth.currentUser;
    if(user2 != null){
      const usuario= {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        uidUser: user2.uid
      }
      this.editarUsuario(usuario)
    }  
    const { email, senha, displayName } = user;
    const promise = this.firebaseAuth.signInWithEmailAndPassword(email, senha)

    /*  console.log(this.token)
     if(this.token.request_token != ''){
       this.apiTMDB.createSession(this.token).subscribe(resposta => {
         localStorage.setItem('session', resposta.session_id)
         this.notification.showmessage("Bem vindo(a)!")
         this.router.navigate(["/filmes"])     
       })
     }else{
       this.apiTMDB.autenticarUsuarioPorToken().subscribe(resposta => {
         this.token = resposta
         window.open('https://www.themoviedb.org/authenticate/' + this.token.request_token)
         localStorage.setItem('token', this.token.request_token)
         
       })
     } */

    return from(promise).pipe(
      catchError(error => {
        if (error.code == "auth/user-not-found") {
          this.notification.showmessage("Usuário não cadstrado!")
        } else if (error.code == "auth/wrong-password") {
          this.notification.showmessage("Senha incorreta!")
        } else {
          this.notification.showmessage("Erro ao autenticar!")
          console.error(error)
        }
        return EMPTY
      })
    )

  }

  public criarUsuarioEmaileSenha(user: any): Observable<any> {
    const { email, senha } = user;
    this.salvarUsuario(user)

    const promise = this.firebaseAuth.createUserWithEmailAndPassword(email, senha)
    return from(promise).pipe(
      catchError(error => {
        this.notification.showmessage("Erro ao cadastrar usuário!")
        console.error(error)
        return EMPTY
      })
    )
  }

  public logout() {
    const promise = this.firebaseAuth.signOut()
    localStorage.removeItem('uidUser');
    return from(promise)
  }

}

