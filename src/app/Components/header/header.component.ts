import { Component, OnInit } from '@angular/core';
import { FilmeLista } from 'src/app/Interfaces/FilmeLista';
import { Results } from 'src/app/Interfaces/Results';
import { ApiFilmesService } from 'src/app/Services/api-filmes.service';
import { FavoritosService } from 'src/app/Services/favoritos.service';
import { NotificationService } from 'src/app/Services/notificacao.service';
import { SalvosService } from 'src/app/Services/salvos.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private filmeService: ApiFilmesService,
    private favoritosService: FavoritosService,
    private notificacao: NotificationService,
    private salvosService: SalvosService
  ) { }

  ngOnInit(): void {
  }

  listaPesquisa!: Results
  listaFavoritos: FilmeLista[] = []
  listaSalvos: FilmeLista[] = []
  pesquisa: boolean = false
  nomeFilme: string = ''
  filmeJaAdicionado: boolean = false
  filmeJaSalvo: boolean = false

  pesquisar(pesquisa: string){
    this.filmeService.filtrarFilmes(pesquisa).subscribe(
      (filmes) => {
        this.listaPesquisa = filmes
        this.pesquisa = true
        this.verificarFavoritos(filmes)
        this.verificarSalvos(filmes)
      }
    )
  }

  limparPesquisa(){
    this.listaPesquisa.results = []
    this.pesquisa = false
    this.nomeFilme = ''
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
        for (let filme of lista) {
          for (let listaFilme of listaFilmes.results) {
            if (filme.id === listaFilme.id) {
              listaFilme.isFavorite = true
            }
          }

        }
      })
  }

  public salvar(filmeSalvo: FilmeLista): void {
    filmeSalvo.isSave = true
    this.listaSalvos.forEach(filme => {
      if (filme.id == filmeSalvo.id) {
        this.filmeJaSalvo = true
      }
    })

    if (this.filmeJaSalvo) {
      this.notificacao.showmessage("Ops! Filme já consta na lista de assistir depois!")
    } else {
      this.salvosService.adicionarFilme(filmeSalvo).subscribe(
        (resposta) => {
          this.notificacao.showmessage("Filme inserido na lista!")
        }
      )
    }
  }

  public listarSalvos(): void {
    this.salvosService.listarFilmesSalvos().subscribe(
      (lista) => {
        this.listaSalvos = lista
      })
  }

  public verificarSalvos(listaFilmes: Results): void {
    this.salvosService.listarFilmesSalvos().subscribe(
      (lista) => {
        for (let filme of lista) {
          for (let listaFilme of listaFilmes.results) {
            if (filme.id === listaFilme.id) {
              listaFilme.isSave = true
            }
          }

        }
      })
  }

}
