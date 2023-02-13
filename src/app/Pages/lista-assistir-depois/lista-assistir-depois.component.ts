import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { DialogVotoComponent } from 'src/app/Components/dialogs/dialog-voto/dialog-voto.component';
import { Filme } from 'src/app/Interfaces/Filme';
import { FilmeLista } from 'src/app/Interfaces/FilmeLista';
import { Results } from 'src/app/Interfaces/Results';
import { FavoritosService } from 'src/app/Services/favoritos.service';
import { NotificationService } from 'src/app/Services/notificacao.service';
import { SalvosService } from 'src/app/Services/salvos.service';

@Component({
  selector: 'app-lista-assistir-depois',
  templateUrl: './lista-assistir-depois.component.html',
  styleUrls: ['./lista-assistir-depois.component.css']
})
export class ListaAssistirDepoisComponent implements OnInit {

  constructor(
    private notificacao: NotificationService,
    public dialog: MatDialog,
    private salvosService: SalvosService,
    private favoritosService: FavoritosService
  ) { }

  ngOnInit(): void {
    this.listarFilmes()
    this.listarFavoritos()
  }

  listaAssistirDepois: FilmeLista[] = []
  listaAssistidos: FilmeLista[] = []
  verAssistidos: boolean = false
  listaFavoritos: FilmeLista[] = []
  lowValue: number = 0;
  highValue: number = 5;

  public listarFilmes(): void {
    this.salvosService.listarFilmesSalvos().subscribe(lista => {
      this.verificarFavoritos(lista)
      lista.forEach((filme: FilmeLista) => {
        if(filme.assistido == true){
          this.listaAssistidos.push(filme)
        }else{
          this.listaAssistirDepois.push(filme)         
        }
      });
    })
  }

  public marcarComoAssistido(filme: FilmeLista): void {
    const index = this.listaAssistirDepois.indexOf(filme)
    this.listaAssistirDepois.splice(index, 1)
    filme.assistido = true
    this.salvosService.editarFilmeSalvo(filme).subscribe()
    this.listaAssistidos.push(filme)
  }

  public deletarFilme(id: string, filme: FilmeLista): void{
    this.salvosService.deletarFilmeSalvo(id).subscribe(
      (resposta) => {
        this.notificacao.showmessage("Filme excluído da sua lista de favoritos!")
        const index = this.listaAssistirDepois.indexOf(filme)
      this.listaAssistirDepois.splice(index, 1)
        
      }
    )
  }

  public visualizarAssistidos(): void{
    this.verAssistidos = !this.verAssistidos
  }

  public openDialog(filme: FilmeLista) {
    this.dialog.open(DialogVotoComponent, {
      width: "500px",
      height: "280px",
      data: filme
    })
  }

  public favoritar(filmeFavorito: FilmeLista): void {
    filmeFavorito.isFavorite = true
    
      this.favoritosService.adicionarFavorito(filmeFavorito).subscribe(
        (resposta) => {
          this.notificacao.showmessage("Filme inserido na lista de favoritos!")       
        }
      )
      this.salvosService.editarFilmeSalvo(filmeFavorito).subscribe()
    }

    public listarFavoritos(): void {
      this.favoritosService.listarFavoritos().subscribe(
        (lista) => {
          this.listaFavoritos = lista
        })
    }

    public verificarFavoritos(listaFilmes: Results): void {
      this.favoritosService.listarFavoritos().subscribe(
        (lista) => {
          for(let filme of lista){
            for(let listaFilme of listaFilmes.results){
              if(filme.id === listaFilme.id){
                listaFilme.isFavorite = true
              }            
            }
            
          }
        })    
    }

    public getPaginatorData(event: PageEvent): PageEvent {
      this.lowValue = event.pageIndex * event.pageSize;
      this.highValue = this.lowValue + event.pageSize;
      return event;
    }

}
