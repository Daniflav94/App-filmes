import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { DialogVotoComponent } from 'src/app/Components/dialogs/dialog-voto/dialog-voto.component';
import { Filme } from 'src/app/Interfaces/Filme';
import { FilmeLista } from 'src/app/Interfaces/FilmeLista';
import { FavoritosService } from 'src/app/Services/favoritos.service';
import { NotificationService } from 'src/app/Services/notificacao.service';
import { SalvosService } from 'src/app/Services/salvos.service';


@Component({
  selector: 'app-lista-favoritos',
  templateUrl: './lista-favoritos.component.html',
  styleUrls: ['./lista-favoritos.component.css']
})
export class ListaFavoritosComponent implements OnInit {

  constructor(
    private favoritosService: FavoritosService,
    private notificacao: NotificationService,
    public dialog: MatDialog,
    private salvosService: SalvosService
  ) { }

  listaFavoritos: FilmeLista[] = []
  listaTop5: FilmeLista[] = []
  lowValue: number = 0;
  highValue: number = 5;

  ngOnInit(): void {
    this.listarFavoritos()
  }

  private listarFavoritos(): void{
    this.favoritosService.listarFavoritos().subscribe(
      (filmes) => {
        this.listaFavoritos = filmes
      }
    )
  }

  public deletarFilmeFavorito(id: string, filme: FilmeLista): void{
    this.favoritosService.deletarFilmeFavorito(id).subscribe(
      (resposta) => {
        this.notificacao.showmessage("Filme excluído da sua lista de favoritos!")
        this.listarFavoritos()
        this.salvosService.listarFilmesSalvos().subscribe(lista => {
          lista.map((film: FilmeLista) => {
            if(film.id == filme.id){
              film.isFavorite = false
              this.salvosService.editarFilmeSalvo(film).subscribe()
            }
          })
        })
      }
    )
  }

  public openDialog(filme: FilmeLista) {


    this.dialog.open(DialogVotoComponent, {
      width: "520px",
      height: "320px",
      data: filme
    })
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }
}



