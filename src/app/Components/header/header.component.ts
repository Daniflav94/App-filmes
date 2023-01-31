import { Component, OnInit } from '@angular/core';
import { FilmeLista } from 'src/app/Interfaces/FilmeLista';
import { Results } from 'src/app/Interfaces/Results';
import { ApiFilmesService } from 'src/app/Services/api-filmes.service';
import { FavoritosService } from 'src/app/Services/favoritos.service';
import { NotificationService } from 'src/app/Services/notificacao.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private filmeService: ApiFilmesService,
    private favoritosService: FavoritosService,
    private notificacao: NotificationService
  ) { }

  ngOnInit(): void {
  }

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
