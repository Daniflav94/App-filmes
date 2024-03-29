import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Filme } from '../Interfaces/Filme';
import { FilmeLista } from '../Interfaces/FilmeLista';
import { Genre } from '../Interfaces/genre';
import { Provider } from '../Interfaces/provider';
import { Results } from '../Interfaces/Results';
import { Session } from '../Interfaces/session';
import { Token } from '../Interfaces/token';

@Injectable({
  providedIn: 'root'
})
export class ApiFilmesService {

  private readonly filtroURL: string = 'https://api.themoviedb.org/3/search/movie?api_key=d0d17cbea03e1e751061b001e857b4fb&language=pt-BR&query='
  private readonly baseURL = 'https://api.themoviedb.org/3/movie/'
  private readonly apiKey = 'api_key=818306944e112ccf75d496086ac6c42e&language=pt-BR'

  constructor(
    private http: HttpClient
  ) { }



  listarFilmesPopulares(page: number) {
    return this.http.get<Results>(this.baseURL + 'popular?' + this.apiKey + '&page=' + page)
  }

  listarMelhoresAvaliados(page: number) {
    return this.http.get<Results>(this.baseURL + 'top_rated?' + this.apiKey + '&page=' + page)
  }

  listarFilmesNosCinemas() {
    return this.http.get<Results>(this.baseURL + 'now_playing?' + this.apiKey + '&page=1&region=BR')
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

  getProviders(idFilme: number) {
    return this.http.get<Provider>(this.baseURL + idFilme + '/watch/providers?' + this.apiKey)
  }

  getGenres() {
    return this.http.get<Genre>('https://api.themoviedb.org/3/genre/movie/list?' + this.apiKey)
  }

  discoverMovies(page: number) {
    return this.http.get<Results>('https://api.themoviedb.org/3/discover/movie?' + this.apiKey + '&include_adult=false&sort_by=vote_count.desc&page=' + page)
  }

  autenticarUsuarioPorToken() {
    return this.http.get<Token>('https://api.themoviedb.org/3/authentication/token/new?' + this.apiKey)
  }

  createSession(token: Token) {
    return this.http.post<Session>('https://api.themoviedb.org/3/authentication/session/new?' + this.apiKey, token)
  }


}

