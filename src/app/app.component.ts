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
  private filmeService: ApiFilmesService
){}

nomeFilme: string = ''
listaPesquisa!: Results
pesquisa: boolean = false

pesquisar(pesquisa: string){
  this.filmeService.filtrarFilmes(pesquisa).subscribe(
    (filmes) => {
      this.listaPesquisa = filmes
      this.pesquisa = true
    }
  )
}

}
