import { Injectable } from '@angular/core';
import { from, Observable, EMPTY } from 'rxjs';
import { FilmeLista } from '../Interfaces/FilmeLista';
import { Results } from '../Interfaces/Results';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { NotificationService } from './notificacao.service';
import { catchError, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  constructor(
    private firestore: AngularFirestore,
    private notificacao: NotificationService
  ) { }


  public adicionarFavorito(filme: FilmeLista): Observable<any>{
    const promise = this.firestore.collection("filmesFavoritos").add({
      uidUser:localStorage.getItem('uidUser'),
        ...filme
      })
    return from(promise).pipe(
      catchError(error => {
        this.notificacao.showmessage("Erro ao favoritar")
        console.error(error)
        return EMPTY
      })
    )
  }

  public listarFavoritos(): Observable<any>{
    const uidUser = localStorage.getItem('uidUser')
    const promise = this.firestore.collection("filmesFavoritos",ref => ref.where('uidUser', '==', uidUser)).get()
    return from(promise).pipe(
      map(resposta => {
        return resposta.docs.map(doc => {
          const filme: FilmeLista = doc.data() as FilmeLista
          filme.idBanco = doc.id
          return filme
          
        })
      }),
      catchError(error => {
        this.notificacao.showmessage("Erro ao listar")
        console.error(error)
        return EMPTY
      })
    )
  }

  public editarFilmeFavorito(filme: FilmeLista): Observable<any>{
    const promise = this.firestore.collection("filmesFavoritos").doc(filme.idBanco).update(filme)
    return from(promise).pipe(
      catchError(error => {       
        this.notificacao.showmessage("Erro ao editar filme")
        console.error(error)
        return EMPTY
      })
    )
  }

  public deletarFilmeFavorito(id: string){
    const promise = this.firestore.collection("filmesFavoritos").doc(id).delete()
    return from(promise).pipe(
      catchError(error => {
        this.notificacao.showmessage("Erro ao excluir")
        console.error(error)
        return EMPTY
      })
    )
  }
}
