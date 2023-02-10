import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { FilmeLista } from 'src/app/Interfaces/FilmeLista';
import { Genre } from 'src/app/Interfaces/genre';
import { Results } from 'src/app/Interfaces/Results';
import { ApiFilmesService } from 'src/app/Services/api-filmes.service';
import { FavoritosService } from 'src/app/Services/favoritos.service';
import { NotificationService } from 'src/app/Services/notificacao.service';
import { SalvosService } from 'src/app/Services/salvos.service';

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
    private salvosService: SalvosService

  ) { }



  listaTopFilmes!: Results
  listaTopFilmesCompleta: FilmeLista[] = []
  listaPopulares!: Results
  listaPopularesCompleta: FilmeLista[] = []
  listaFavoritos: FilmeLista[] = []
  listaSalvos: FilmeLista[] = []
  listaGeneros!: Genre
  filtrados: FilmeLista[] = []
  listaFilmes!: Results
  verMaisMelhores: boolean = false
  verMaisPopulares: boolean = false

  filmeJaAdicionado: boolean = false
  filmeJaSalvo: boolean = false

  session: any = ''

  coracaoVazio: string = "../../../assets/coracaoVazio.png"
  coracaoCheio: string = "../../../assets/coracaoCheio.png"

  inicio = 0
  final = 6
  inicio2 = 0
  final2 = 6

  slidesContainer = document.getElementById("slides-container");
  slide = document.querySelector(".slide");
  prevButton = document.getElementById("slide-arrow-prev");
  nextButton = document.getElementById("slide-arrow-next");

  lowValue: number = 0;
  highValue: number = 18;

  ngOnInit(): void {
    this.session = localStorage.getItem('session')
    this.listarFavoritos()
    this.listarSalvos()
    this.listarMelhoresAvaliados()
    this.listarPopulares()
    this.listarGeneros()
    this.listarFilmes()
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

  public listarMelhoresAvaliados(): void {
    this.filmesService.listarMelhoresAvaliados(1).subscribe(
      (lista) => {
        this.listaTopFilmes = lista
        this.verificarFavoritos(lista)
        this.verificarSalvos(lista)
      }
    )
  }

  public listarTodosMelhoresAvaliados(): void {
    this.verMaisMelhores = true
    for (let index = 1; index < 5; index++) {
      this.filmesService.listarMelhoresAvaliados(index).subscribe(
        (lista) => {
          this.verificarFavoritos(lista)
          this.verificarSalvos(lista)
          lista.results.map(filme => {
            this.listaTopFilmesCompleta.push(filme)
          })
        })
    }
  }

  public voltarHome(): void {
    this.verMaisMelhores = false
    this.verMaisPopulares = false
  }

  public listarPopulares(): void {
    this.filmesService.listarFilmesPopulares(1).subscribe(
      (lista) => {
        this.listaPopulares = lista
        this.verificarFavoritos(lista)
        this.verificarSalvos(lista)
      }
    )
  }

  public listarTodosPopulares(): void {
    this.verMaisPopulares = true
    for (let index = 1; index < 5; index++) {
      this.filmesService.listarFilmesPopulares(index).subscribe(
        (lista) => {
          this.verificarFavoritos(lista)
          this.verificarSalvos(lista)
          lista.results.map(filme => {
            this.listaPopularesCompleta.push(filme)
          })
        })
    }
  }


  public listarGeneros(): void {
    this.filmesService.getGenres().subscribe((lista) => {
      this.listaGeneros = lista
    })
  }

  public listarFilmes(): void {
    for (let index = 1; index < 2; index++) {
      this.filmesService.discoverMovies(index).subscribe((lista) => {
        this.listaFilmes = lista

      })
    }
  }

  public filtrarGenero(genero: number): void {
    this.filtrados = []

    for (let index = 1; index < 40; index++) {
      this.filmesService.discoverMovies(index).subscribe((lista) => {
        this.verificarFavoritos(lista)
        this.verificarSalvos(lista)
        lista.results.filter(element => {
          if (element.genre_ids != undefined) {
            element.genre_ids.forEach(genre => {
              if (genre == genero) {
                this.filtrados.push(element)
              }
            })
          }
        })
      });
    }
  }

  public mudarCor(genero: any): void {
    this.listaGeneros.genres.map((genero) => {
      genero.ativo = false
    })
    genero.ativo = true

  }


  voltar() {
    if (this.inicio != 0 && this.final != 6) {
      this.inicio -= 6
      this.final -= 6
    }
  }

  avancar() {
    if (this.final < this.listaTopFilmes.results.length) {
      this.inicio += 6
      this.final += 6
      const slideWidth = this.slide?.clientWidth
      if(this.slidesContainer != null){
        this.slidesContainer.scrollLeft += slideWidth as number;
      }
    }
  }

  voltar2() {
    if (this.inicio2 != 0 && this.final2 != 6) {
      this.inicio2 -= 6
      this.final2 -= 6
    }
  }

  avancar2() {
    if (this.final2 < this.listaTopFilmes.results.length) {
      this.inicio2 += 6
      this.final2 += 6
    }
  }

  public getPaginatorData(event: PageEvent): PageEvent {
    this.lowValue = event.pageIndex * event.pageSize;
    this.highValue = this.lowValue + event.pageSize;
    return event;
  }

}

