import { Component, Input, OnInit } from '@angular/core';
import { Filme } from 'src/app/Interfaces/Filme';
import { FilmeLista } from 'src/app/Interfaces/FilmeLista';
import { Results } from 'src/app/Interfaces/Results';
import { ApiFilmesService } from 'src/app/Services/api-filmes.service';
import { FavoritosService } from 'src/app/Services/favoritos.service';
import { NotificationService } from 'src/app/Services/notificacao.service';
import { ListaFilmesComponent } from '../lista-filmes/lista-filmes.component';

@Component({
  selector: 'app-lista-favoritos',
  templateUrl: './lista-favoritos.component.html',
  styleUrls: ['./lista-favoritos.component.css']
})
export class ListaFavoritosComponent implements OnInit {

  constructor(
    private favoritosService: FavoritosService,
    private notificacao: NotificationService
  ) { }

  listaFavoritos!: FilmeLista[]
  lista: boolean = false

  ngOnInit(): void {
    this.listarFavoritos()
  }
  
  private listarFavoritos(): void{
    this.favoritosService.listarFavoritos().subscribe(
      (filmes) => {
        this.listaFavoritos = filmes
        console.log(this.listaFavoritos)
      }
    )
  }

  public deletarFilmeFavorito(id: string): void{
    this.favoritosService.deletarFilmeFavorito(id).subscribe(
      (resposta) => {
        this.notificacao.showmessage("Filme excluído da sua lista de favoritos!")
        this.listarFavoritos()
      }
    )
  }
}



