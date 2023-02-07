import { Component, OnInit } from '@angular/core';
import { Results } from 'src/app/Interfaces/Results';
import { ApiFilmesService } from 'src/app/Services/api-filmes.service';

@Component({
  selector: 'app-carrossel',
  templateUrl: './carrossel.component.html',
  styleUrls: ['./carrossel.component.css']
})
export class CarrosselComponent implements OnInit {

  constructor(
    private filmesService: ApiFilmesService
  ) { }

  listaFilmes!: Results

  ngOnInit(): void {
    this.listarFilmes()
  }

  listarFilmes(): void {
    this.filmesService.listarFilmesNosCinemas().subscribe(lista => {
      this.listaFilmes = lista
    })
  }

}
