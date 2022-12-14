import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Filme } from 'src/app/Interfaces/Filme';
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
    }

}

