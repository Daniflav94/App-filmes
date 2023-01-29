import { Component } from '@angular/core';
import { FilmeLista } from './Interfaces/FilmeLista';
import { Results } from './Interfaces/Results';
import { ApiFilmesService } from './Services/api-filmes.service';
import { FavoritosService } from './Services/favoritos.service';
import { NotificationService } from './Services/notificacao.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tmdb-filmes';

  constructor(
    private filmeService: ApiFilmesService,
    private favoritosService: FavoritosService,
    private notificacao: NotificationService
  ) { }

  listaPesquisa!: Results
  pesquisa: boolean = false
  nomeFilme: string = ''
  coracaoVazio: string = "../../../assets/coracaoVazio.png"
  coracaoCheio: string = "../../../assets/coracaoCheio.png"

  pesquisar(pesquisa: string){
    this.filmeService.filtrarFilmes(pesquisa).subscribe(
      (filmes) => {
        this.listaPesquisa = filmes
        this.pesquisa = true
      }
    )
  }

  limparPesquisa(){
    this.listaPesquisa.results = []
    this.pesquisa = false
    this.nomeFilme = ''
  }

  favoritar(filme: FilmeLista): void{
    this.favoritosService.adicionarFavorito(filme).subscribe(
     (resposta) => {
       this.notificacao.showmessage("Filme inserido na lista de favoritos!")
     }
    )
   }
}
