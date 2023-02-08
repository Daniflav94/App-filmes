import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { FilmeLista } from 'src/app/Interfaces/FilmeLista';
import { Results } from 'src/app/Interfaces/Results';
import { ApiFilmesService } from 'src/app/Services/api-filmes.service';

@Component({
  selector: 'app-carrossel',
  templateUrl: './carrossel.component.html',
  styleUrls: ['./carrossel.component.css']
})
export class CarrosselComponent implements OnInit, OnDestroy {

  constructor(
    private filmesService: ApiFilmesService
  ) { }

  listaFilmes: FilmeLista[] = []
  imagens: string[] = []
   // Guarda a referência do temporizador.
  // Assim conseguimos interromper o temporizador
  // a qualquer momento
  timerSubs!: Subscription;
  private _indexImagemAtiva: number = 0;

  get indexImagemAtiva() {
    return this._indexImagemAtiva;
  }

  set indexImagemAtiva(value: number) {
    this._indexImagemAtiva =
      value < this.imagens.length ? value : 0;
  }

  ngOnInit(): void {
    this.listarFilmes()
    this.iniciarTimer();
   
  }

  ngOnDestroy(): void {
    this.pararTimer();
  }

  listarFilmes(): void {
    this.filmesService.listarFilmesNosCinemas().subscribe(lista => {
      lista.results.map((filme: FilmeLista) => {
        if(filme.overview != ''){
          this.listaFilmes.push(filme)   
            this.imagens.push('https://image.tmdb.org/t/p/original/' + filme.backdrop_path)
        }
      })
      
    })
  }

  iniciarTimer(): void {
    this.timerSubs = timer(6000).subscribe(() => {
      this.ativarImagem(
        this.indexImagemAtiva + 1
      );
    });
  }

  pararTimer(): void {
    this.timerSubs?.unsubscribe();
  }

  ativarImagem(index: number): void {
    this.indexImagemAtiva = index;
    this.iniciarTimer();
  }


}
