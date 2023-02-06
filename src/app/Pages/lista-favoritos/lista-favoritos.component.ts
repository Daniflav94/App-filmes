import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogVotoComponent } from 'src/app/Components/dialogs/dialog-voto/dialog-voto.component';
import { Filme } from 'src/app/Interfaces/Filme';
import { FilmeLista } from 'src/app/Interfaces/FilmeLista';
import { FavoritosService } from 'src/app/Services/favoritos.service';
import { NotificationService } from 'src/app/Services/notificacao.service';


@Component({
  selector: 'app-lista-favoritos',
  templateUrl: './lista-favoritos.component.html',
  styleUrls: ['./lista-favoritos.component.css']
})
export class ListaFavoritosComponent implements OnInit {

  constructor(
    private favoritosService: FavoritosService,
    private notificacao: NotificationService,
    public dialog: MatDialog
  ) { }

  listaFavoritos: FilmeLista[] = []
  listaTop5: FilmeLista[] = []

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

  public openDialog(filme: FilmeLista) {
    this.dialog.open(DialogVotoComponent, {
      width: "500px",
      height: "280px",
      data: filme
    })
  }


}



