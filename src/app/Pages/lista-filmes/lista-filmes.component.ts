import { Component, OnInit } from '@angular/core';
import { Results } from 'src/app/Interfaces/Results';
import { ApiFilmesService } from 'src/app/Services/api-filmes.service';

@Component({
  selector: 'app-lista-filmes',
  templateUrl: './lista-filmes.component.html',
  styleUrls: ['./lista-filmes.component.css']
})
export class ListaFilmesComponent implements OnInit {

  constructor(
    private filmesService: ApiFilmesService
  ) { }

  listaTopFilmes!: Results
  listaPopulares!: Results

  inicio = 0 
  final = 6
  inicio2 = 0 
  final2 = 6

  voltar(){
    if(this.inicio != 0 && this.final != 6){
      this.inicio--
      this.final--
    }
  }

  avancar(){
    this.inicio++
    this.final++
  }

  voltar2(){
    if(this.inicio2 != 0 && this.final2 != 6){
      this.inicio2--
      this.final2--
    }
  }

  avancar2(){
    this.inicio2++
    this.final2++
  }

  ngOnInit(): void {
    this.filmesService.listarMelhoresAvaliados().subscribe(
      (lista) => {
        this.listaTopFilmes = lista
      }
    )

    this.filmesService.listarFilmesPopulares().subscribe(
      (lista) => {
        this.listaPopulares = lista
      }
    )
  }

}
