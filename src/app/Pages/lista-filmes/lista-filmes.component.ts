import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogVotoComponent } from 'src/app/Components/dialogs/dialog-voto/dialog-voto.component';
import { Account } from 'src/app/Interfaces/account';
import { FilmeLista } from 'src/app/Interfaces/FilmeLista';
import { Results } from 'src/app/Interfaces/Results';
import { ApiFilmesService } from 'src/app/Services/api-filmes.service';
import { FavoritosService } from 'src/app/Services/favoritos.service';
import { NotificationService } from 'src/app/Services/notificacao.service';

@Component({
  selector: 'app-lista-filmes',
  templateUrl: './lista-filmes.component.html',
  styleUrls: ['./lista-filmes.component.css']
})
export class ListaFilmesComponent implements OnInit {

  constructor(
    private filmesService: ApiFilmesService,
    private favoritosService: FavoritosService,
    private notificacao: NotificationService,

  ) { }

  listaTopFilmes!: Results
  listaPopulares!: Results
  listaFavoritos: FilmeLista[] = []

  filmeJaAdicionado: boolean = false

  session: any = ''

  coracaoVazio: string = "../../../assets/coracaoVazio.png"
  coracaoCheio: string = "../../../assets/coracaoCheio.png"

  inicio = 0
  final = 6
  inicio2 = 0
  final2 = 6

  ngOnInit(): void {
    this.session = localStorage.getItem('session')
    this.listarFavoritos()
    this.listarMelhoresAvaliados()
    this.listarPopulares()

  }

  public favoritar(filmeFavorito: FilmeLista): void {
    filmeFavorito.isFavorite = true
    this.listaFavoritos.forEach(filme => {
      if (filme.id == filmeFavorito.id) {
        this.filmeJaAdicionado = true
      }
    })

    if (this.filmeJaAdicionado) {
      this.notificacao.showmessage("Ops! Filme já consta na lista de favoritos!")
    } else {
      this.favoritosService.adicionarFavorito(filmeFavorito).subscribe(
        (resposta) => {
          this.notificacao.showmessage("Filme inserido na lista de favoritos!")       
        }
      )
    }

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
        this.listaFavoritos = lista
        for(let filme of lista){
          for(let listaFilme of listaFilmes.results){
            if(filme.id === listaFilme.id){
              listaFilme.isFavorite = true
            }            
          }
          
        }
      })    
  }

  public listarMelhoresAvaliados(): void { 
    this.filmesService.listarMelhoresAvaliados().subscribe(
      (lista) => {        
        this.listaTopFilmes = lista
        this.verificarFavoritos(lista)
      }
    )
  }

  public listarPopulares(): void {
    this.filmesService.listarFilmesPopulares().subscribe(
      (lista) => {
        this.listaPopulares = lista
        this.verificarFavoritos(lista)
      }
    )
  }

  voltar() {
    if (this.inicio != 0 && this.final != 6) {
      this.inicio -= 6
      this.final -= 6
    }
  }

  avancar() {
    this.inicio += 6
    this.final += 6
  }

  voltar2() {
    if (this.inicio2 != 0 && this.final2 != 6) {
      this.inicio2 -= 6
      this.final2 -= 6
    }
  }

  avancar2() {
    this.inicio2 += 6
    this.final2 += 6
  }

}

