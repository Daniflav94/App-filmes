import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FilmeLista } from '../Interfaces/FilmeLista';
import { NotificationService } from './notificacao.service';
import { from, Observable, EMPTY } from 'rxjs';
import { catchError, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class SalvosService {

  constructor(
    private firestore: AngularFirestore,
    private notificacao: NotificationService
  ) { }

  public adicionarFilme(filme: FilmeLista): Observable<any>{
    const promise = this.firestore.collection("assistirDepois").add({
      uidUser:localStorage.getItem('uidUser'),
        ...filme
      })
    return from(promise).pipe(
      catchError(error => {
        this.notificacao.showmessage("Erro ao salvar")
        console.error(error)
        return EMPTY
      })
    )
  }

  public listarFilmesSalvos(): Observable<any>{
    const uidUser = localStorage.getItem('uidUser')
    const promise = this.firestore.collection("assistirDepois",ref => ref.where('uidUser', '==', uidUser)).get()
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

  public editarFilmeSalvo(filme: FilmeLista): Observable<any>{
    const promise = this.firestore.collection("assistirDepois").doc(filme.idBanco).update(filme)
    return from(promise).pipe(
      catchError(error => {       
        this.notificacao.showmessage("Erro ao editar filme")
        console.error(error)
        return EMPTY
      })
    )
  }

  public deletarFilmeSalvo(id: string){
    const promise = this.firestore.collection("assistirDepois").doc(id).delete()
    return from(promise).pipe(
      catchError(error => {
        this.notificacao.showmessage("Erro ao excluir")
        console.error(error)
        return EMPTY
      })
    )
  }

}
