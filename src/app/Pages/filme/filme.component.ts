import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Filme } from 'src/app/Interfaces/Filme';
import { Provider } from 'src/app/Interfaces/provider';
import { ApiFilmesService } from 'src/app/Services/api-filmes.service';

@Component({
  selector: 'app-filme',
  templateUrl: './filme.component.html',
  styleUrls: ['./filme.component.css']
})
export class FilmeComponent implements OnInit {

  constructor(
    private rota: ActivatedRoute,
    private filmesService: ApiFilmesService,
    private snackbar: MatSnackBar
  ) { }

  filme!: Filme
  creditos!: Filme
  diretor!: string
  ondeAssistir: Provider = {
    id: 0,
    results: {
      BR:  {
        flatrate: [{
          logo_path: '',
          provider_name: ''
        }],
        rent: [{
          logo_path: '',
          provider_name: ''
        }]
      }
    }
  }


  ngOnInit(): void {
    const idFilme = this.rota.snapshot.paramMap.get('idFilme') as string
    this.filmesService.getFilmeById(parseInt(idFilme)).subscribe(
      (filme) => {
        this.filme = filme

      },
      (erro) => {
        this.snackbar.open("Erro ao encontrar filme", 'ok')
      }
    )

    this.filmesService.getCreditsFilme(parseInt(idFilme)).subscribe(
      (credits) => {
        this.creditos = credits
        credits.crew?.forEach(element => {
          if(element.job == "Director"){
            this.diretor = element.name
          }
        });
      }
    )

    this.filmesService.getProviders(parseInt(idFilme)).subscribe(
      (provedores) => {
        this.ondeAssistir = provedores
      }
    )
  }


}

