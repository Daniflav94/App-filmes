import { Component } from '@angular/core';
import { Results } from './Interfaces/Results';
import { ApiFilmesService } from './Services/api-filmes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tmdb-filmes';

  constructor(
    private filmeService: ApiFilmesService,
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
}
