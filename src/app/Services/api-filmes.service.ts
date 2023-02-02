import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Account } from '../Interfaces/account';
import { Filme } from '../Interfaces/Filme';
import { FilmeLista } from '../Interfaces/FilmeLista';
import { Rating } from '../Interfaces/rating';
import { RatingResponse } from '../Interfaces/rating-response';
import { Results } from '../Interfaces/Results';
import { Session } from '../Interfaces/session';
import { Token } from '../Interfaces/token';

@Injectable({
  providedIn: 'root'
})
export class ApiFilmesService {

  private readonly filtroURL: string = 'https://api.themoviedb.org/3/search/movie?api_key=d0d17cbea03e1e751061b001e857b4fb&language=pt-BR&query='
  private readonly baseURL = 'https://api.themoviedb.org/3/movie/'
  private readonly apiKey = 'api_key=818306944e112ccf75d496086ac6c42e&language=pt-BR/'

  constructor(
    private http: HttpClient
  ) { }



  listarFilmesPopulares() {
    return this.http.get<Results>(this.baseURL + 'popular?' + this.apiKey + '&page=1')
  }

  listarMelhoresAvaliados() {
    return this.http.get<Results>(this.baseURL + 'top_rated?' + this.apiKey + '&page=1')
  }

  filtrarFilmes(nomeFilme: string) {
    return this.http.get<Results>(this.filtroURL + nomeFilme)
  }

  getFilmeById(idFilme: number) {
    return this.http.get<Filme>(this.baseURL + idFilme + '?' + this.apiKey)
  }

  getCreditsFilme(idFilme: number) {
    return this.http.get<Filme>(this.baseURL + idFilme + '/credits?' + this.apiKey)
  }

  avaliarFilme(idFilme: number, session: string, value: Rating): Observable<any> {
    
    const headers= new HttpHeaders()
    .set('Content-Type', 'default: application/json;charset=utf-8')
    
    
    
      return this.http.post<RatingResponse>(this.baseURL + idFilme + '/rating?api_key=818306944e112ccf75d496086ac6c42e&language=pt-BR&session_id=' + session, value, {'headers':headers}).pipe(
      catchError(error => {
        console.error(error)
        return EMPTY
      })
    )
  }

  autenticarUsuarioPorToken() {
    return this.http.get<Token>('https://api.themoviedb.org/3/authentication/token/new?' + this.apiKey)
  }

  createSession(token: Token) {
    return this.http.post<Session>('https://api.themoviedb.org/3/authentication/session/new?' + this.apiKey, token)
  }

  accountStates(idFilme: number, session: string) {
    return this.http.get<Account>(this.baseURL + idFilme + '/account_states?api_key=818306944e112ccf75d496086ac6c42e&language=pt-BR&session_id=' + session)
  }


}

